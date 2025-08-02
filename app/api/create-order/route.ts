import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, receipt, registrationData } = await request.json()

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials:', {
        hasKeyId: !!process.env.RAZORPAY_KEY_ID,
        hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET
      })
      return NextResponse.json({ 
        error: 'Payment gateway configuration error. Please contact support.' 
      }, { status: 500 })
    }

    if (!amount || !currency || !receipt) {
      return NextResponse.json({ 
        error: 'Missing required payment parameters' 
      }, { status: 400 })
    }


    const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json({ 
        error: 'Invalid amount provided' 
      }, { status: 400 })
    }

    console.log('Creating Razorpay order:', {
      amount: numericAmount,
      currency,
      receipt,
      participantName: registrationData?.participantName
    })

    const order = await createOrder(numericAmount, currency, receipt)
    
    console.log('Razorpay order created successfully:', {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    })

    return NextResponse.json(order)
    
  } catch (error) {
    console.error('Order creation failed:', error)
    
    if (error && typeof error === 'object') {
      console.error('Error details:', {
        message: (error as any).message || 'Unknown error',
        statusCode: (error as any).statusCode,
        errorData: (error as any).error || error,
        stack: (error as any).stack
      })
    }

    let errorMessage = 'Failed to create payment order'
    let statusCode = 500

    if (error && typeof error === 'object') {
      if ((error as any).statusCode === 401) {
        errorMessage = 'Payment gateway authentication failed'
        statusCode = 500
      } else if ((error as any).statusCode === 400) {
        errorMessage = 'Invalid payment parameters'
        statusCode = 400
      } else if ((error as any).error && (error as any).error.description) {
        errorMessage = `Payment gateway error: ${(error as any).error.description}`
      }
    }

    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? (error as any).message : undefined
    }, { status: statusCode })
  }
}