import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { razorpayInstance } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const { pin, paymentId, registrationId, reason } = await request.json()

    if (pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    if (!paymentId || !registrationId) {
      return NextResponse.json({ 
        error: 'Payment ID and Registration ID are required' 
      }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('conference')
    const registrations = db.collection('registrations')

    // Find the registration
    const registration = await registrations.findOne({ 
      registrationId,
      paymentId 
    })

    if (!registration) {
      return NextResponse.json({ 
        error: 'Registration not found' 
      }, { status: 404 })
    }

    if (registration.paymentStatus !== 'completed') {
      return NextResponse.json({ 
        error: 'Cannot refund non-completed payment' 
      }, { status: 400 })
    }

    try {
      // Create refund through Razorpay
      const refund = await razorpayInstance.payments.refund(paymentId, {
        amount: registration.calculatedFee * 100, 
        notes: {
          registration_id: registrationId,
          reason: reason || 'Duplicate registration',
          refunded_by: 'admin',
          refund_date: new Date().toISOString()
        }
      })

      // Update registration status
      await registrations.updateOne(
        { registrationId },
        { 
          $set: { 
            paymentStatus: 'refunded',
            refundId: refund.id,
            refundDate: new Date(),
            refundReason: reason || 'Duplicate registration',
            refundAmount: refund.amount ? refund.amount / 100 : 0 
          }
        }
      )

      console.log('Refund processed successfully:', {
        registrationId,
        paymentId,
        refundId: refund.id,
        amount: refund.amount ? refund.amount / 100 : 0
      })

      return NextResponse.json({
        success: true,
        refundId: refund.id,
        amount: refund.amount ? refund.amount / 100 : 0,
        message: 'Refund processed successfully'
      })

    } catch (refundError) {
      console.error('Razorpay refund error:', refundError)
      
      // Still update the database to mark as refund requested
      await registrations.updateOne(
        { registrationId },
        { 
          $set: { 
            paymentStatus: 'refund_requested',
            refundDate: new Date(),
            refundReason: reason || 'Duplicate registration',
            refundError: refundError instanceof Error ? refundError.message : 'Unknown error'
          }
        }
      )

      return NextResponse.json({ 
        error: 'Failed to process refund through payment gateway',
        details: refundError instanceof Error ? refundError.message : 'Unknown error'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Refund API error:', error)
    return NextResponse.json({ 
      error: 'Failed to process refund request' 
    }, { status: 500 })
  }
}