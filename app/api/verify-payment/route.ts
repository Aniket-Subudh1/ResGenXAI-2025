import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import clientPromise from '@/lib/mongodb'
import { sendConfirmationEmail } from '@/lib/email'

interface RegistrationData {
  participantName: string
  email: string
  mobileNumber: string
  whatsappNumber: string
  country: string
  category: string
  ieeeStatus: string
  nationality: string
  paperId: string
  copyrightAgreement: string
  presentationMode: string
  baseFee: number
  gstAmount: number
  calculatedFee: number
  currency: string
  paymentProofUrl?: string
  ieeeProofUrl?: string
}

const generateRegistrationId = (): string => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `REG${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationData,
    } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ 
        error: 'Missing payment verification data' 
      }, { status: 400 })
    }

    if (!registrationData || !registrationData.participantName || !registrationData.email) {
      return NextResponse.json({ 
        error: 'Invalid registration data' 
      }, { status: 400 })
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ 
        error: 'Invalid payment signature' 
      }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('conference')
    const registrations = db.collection('registrations')

    const existingRegistration = await registrations.findOne({
      $or: [
        { email: registrationData.email },
        { paymentId: razorpay_payment_id }
      ]
    })

    if (existingRegistration) {
      return NextResponse.json({ 
        error: 'Registration already exists for this email or payment ID' 
      }, { status: 409 })
    }

    const registrationId = generateRegistrationId()

    const registrationRecord = {
      participantName: registrationData.participantName.trim(),
      email: registrationData.email.toLowerCase().trim(),
      mobileNumber: registrationData.mobileNumber.trim(),
      whatsappNumber: registrationData.whatsappNumber.trim(),
      country: registrationData.country.trim(),
      
      category: registrationData.category,
      ieeeStatus: registrationData.ieeeStatus,
      nationality: registrationData.nationality,
      
      paperId: registrationData.paperId.trim(),
      copyrightAgreement: registrationData.copyrightAgreement,
      presentationMode: registrationData.presentationMode,
      
      baseFee: registrationData.baseFee || 0,
      gstAmount: registrationData.gstAmount || 0,
      calculatedFee: registrationData.calculatedFee,
      currency: registrationData.currency,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: 'completed',
      
      paymentProofUrl: registrationData.paymentProofUrl || null,
      ieeeProofUrl: registrationData.ieeeProofUrl || null,
      
      registrationId,
      registrationDate: new Date(),
      
      metadata: {
        userAgent: request.headers.get('user-agent') || 'unknown',
        ipAddress: request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown',
        paymentTimestamp: new Date().toISOString(),
        source: 'web',
        gstApplicable: registrationData.gstAmount > 0
      }
    }

    const insertResult = await registrations.insertOne(registrationRecord)
    
    if (!insertResult.acknowledged) {
      throw new Error('Failed to save registration to database')
    }

    console.log('Registration saved successfully:', {
      registrationId,
      participantName: registrationData.participantName,
      email: registrationData.email,
      paymentId: razorpay_payment_id,
      baseFee: registrationData.baseFee,
      gstAmount: registrationData.gstAmount,
      totalAmount: registrationData.calculatedFee
    })

    try {
      await sendConfirmationEmail(registrationRecord)
      console.log('Confirmation email sent to:', registrationData.email)
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)

    }

    return NextResponse.json({ 
      success: true, 
      registrationId: registrationRecord.registrationId,
      message: 'Registration completed successfully',
      participantName: registrationData.participantName,
      email: registrationData.email,
      paymentId: razorpay_payment_id,
      amount: `${registrationData.calculatedFee} ${registrationData.currency}`,
      gstAmount: registrationData.gstAmount,
      baseFee: registrationData.baseFee
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    
    // Log detailed error for debugging
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ 
      error: 'Payment verification failed',
      details: 'Please contact support if the problem persists.'
    }, { status: 500 })
  }
}