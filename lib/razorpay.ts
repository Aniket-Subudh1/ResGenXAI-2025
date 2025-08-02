import Razorpay from 'razorpay'

if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error('RAZORPAY_KEY_ID environment variable is required')
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('RAZORPAY_KEY_SECRET environment variable is required')
}

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const createOrder = async (amount: number, currency: string, receipt: string) => {
  try {
    console.log('Creating Razorpay order with:', {
      amount: amount * 100, 
      currency,
      receipt,
      timestamp: new Date().toISOString()
    })

    const options = {
      amount: Math.round(amount * 100), 
      currency: currency.toUpperCase(),
      receipt: receipt,
      payment_capture: 1, 
      notes: {
        created_at: new Date().toISOString(),
        source: 'resgenxai-2025'
      }
    }

    const order = await razorpayInstance.orders.create(options)
    
    console.log('Razorpay order created:', {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status
    })

    return order
    
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    
    if (error && typeof error === 'object') {
      const errorObj = error as any;
      console.error('Error breakdown:', {
        statusCode: errorObj.statusCode || 'Unknown',
        error: errorObj.error || 'Unknown error',
        message: errorObj.message || 'No message',
        stack: errorObj.stack || 'No stack trace'
      })
    }
    
    throw error
  }
}

export const testRazorpayConnection = async () => {
  try {
    const orders = await razorpayInstance.orders.all({
      count: 1
    })
    console.log('Razorpay connection test successful')
    return true
  } catch (error) {
    console.error('Razorpay connection test failed:', error)
    return false
  }
}