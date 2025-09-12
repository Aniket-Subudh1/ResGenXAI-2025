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

    // Verify payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ 
        error: 'Invalid payment signature',
        code: 'PAYMENT_VERIFICATION_FAILED'
      }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('conference')
    const registrations = db.collection('registrations')

    // Final duplicate check before saving (race condition protection)
    const existingRegistration = await registrations.findOne({
      $or: [
        { email: registrationData.email.toLowerCase().trim() },
        { paymentId: razorpay_payment_id },
        { orderId: razorpay_order_id }
      ]
    })

    if (existingRegistration) {
      // If this exact payment already exists, return success (duplicate webhook)
      if (existingRegistration.paymentId === razorpay_payment_id) {
        return NextResponse.json({ 
          success: true, 
          registrationId: existingRegistration.registrationId,
          message: 'Registration already completed',
          isDuplicate: true,
          participantName: existingRegistration.participantName,
          email: existingRegistration.email,
          paymentId: razorpay_payment_id,
          amount: `${existingRegistration.calculatedFee} ${existingRegistration.currency}`
        })
      }

      // Email already registered
      if (existingRegistration.email === registrationData.email.toLowerCase().trim()) {
        return NextResponse.json({ 
          error: 'This email is already registered for the conference',
          code: 'EMAIL_ALREADY_REGISTERED',
          existingRegistrationId: existingRegistration.registrationId
        }, { status: 409 })
      }

      // Order ID already used (shouldn't happen but safety check)
      if (existingRegistration.orderId === razorpay_order_id) {
        return NextResponse.json({ 
          error: 'This order has already been processed',
          code: 'ORDER_ALREADY_PROCESSED'
        }, { status: 409 })
      }
    }

    // Check for duplicate paper ID
    const existingPaper = await registrations.findOne({
      paperId: registrationData.paperId.trim()
    })

    if (existingPaper) {
      return NextResponse.json({ 
        error: 'This Paper ID is already registered',
        code: 'PAPER_ID_DUPLICATE'
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

    // Use upsert to handle any race conditions
    const insertResult = await registrations.replaceOne(
      { paymentId: razorpay_payment_id },
      registrationRecord,
      { upsert: true }
    )
    
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

    // Send confirmation email (don't fail registration if email fails)
    try {
      await sendConfirmationEmail(registrationRecord)
      console.log('Confirmation email sent to:', registrationData.email)
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Continue with success response even if email fails
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
      code: 'VERIFICATION_ERROR',
      details: 'Please contact support if the problem persists.'
    }, { status: 500 })
  }
}