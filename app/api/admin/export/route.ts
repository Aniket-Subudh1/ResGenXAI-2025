import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json()

    if (pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db('conference')
    const registrations = db.collection('registrations')

    const allRegistrations = await registrations.find({}).toArray()

    const exportData = allRegistrations.map(reg => ({
      'Registration ID': reg.registrationId,
      'Name': reg.participantName,
      'Email': reg.email,
      'Mobile': reg.mobileNumber,
      'WhatsApp': reg.whatsappNumber,
      'Country': reg.country,
      'Category': reg.category,
      'IEEE Member': reg.ieeeStatus,
      'Nationality': reg.nationality,
      'Paper ID': reg.paperId,
      'Copyright Agreement': reg.copyrightAgreement,
      'Presentation Mode': reg.presentationMode,
      'Base Fee': reg.baseFee || reg.calculatedFee,
      'GST Amount': reg.gstAmount || 0,
      'Total Registration Fee': reg.calculatedFee,
      'Currency': reg.currency,
      'GST Applicable': reg.gstAmount > 0 ? 'Yes' : 'No',
      'Payment Status': reg.paymentStatus,
      'Payment ID': reg.paymentId,
      'Order ID': reg.orderId,
      'Registration Date': new Date(reg.registrationDate).toISOString(),
      'Payment Proof URL': reg.paymentProofUrl || '',
      'IEEE Proof URL': reg.ieeeProofUrl || ''
    }))

    return NextResponse.json({
      success: true,
      data: exportData
    })

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 })
  }
}