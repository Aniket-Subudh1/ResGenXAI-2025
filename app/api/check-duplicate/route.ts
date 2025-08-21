import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, paperId } = await request.json()

    if (!email) {
      return NextResponse.json({ 
        error: 'Email is required' 
      }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('conference')
    const registrations = db.collection('registrations')

    // Check for existing registration with same email
    const existingRegistration = await registrations.findOne({
      email: email.toLowerCase().trim()
    })

    if (existingRegistration) {
      return NextResponse.json({ 
        isDuplicate: true,
        message: 'An account with this email is already registered for the conference.',
        registrationId: existingRegistration.registrationId,
        paymentStatus: existingRegistration.paymentStatus
      })
    }

    // Check for duplicate paper ID if provided
    if (paperId) {
      const existingPaper = await registrations.findOne({
        paperId: paperId.trim()
      })

      if (existingPaper) {
        return NextResponse.json({ 
          isDuplicate: true,
          message: 'This Paper ID is already registered for the conference.',
          field: 'paperId'
        })
      }
    }

    return NextResponse.json({ 
      isDuplicate: false,
      message: 'No duplicate registration found'
    })

  } catch (error) {
    console.error('Duplicate check error:', error)
    return NextResponse.json({ 
      error: 'Failed to check for duplicate registration' 
    }, { status: 500 })
  }
}