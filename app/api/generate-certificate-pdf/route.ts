import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { jsPDF } from 'jspdf'

const RESGENXAI_LOGO = "/rs.png"

export async function POST(request: NextRequest) {
  try {
    const { registrationId } = await request.json()

    if (!registrationId) {
      return NextResponse.json({ 
        error: 'Registration ID is required' 
      }, { status: 400 })
    }

    // Fetch registration details from database
    const client = await clientPromise
    const db = client.db('conference')
    const registrations = db.collection('registrations')

    const registration = await registrations.findOne({ 
      registrationId: registrationId 
    })

    if (!registration) {
      return NextResponse.json({ 
        error: 'Registration not found' 
      }, { status: 404 })
    }

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Set colors
    const primaryColor = [230, 81, 0] // #E65100
    const secondaryColor = [255, 152, 0] // #FF9800
    const textColor = [33, 33, 33]
    const grayColor = [102, 102, 102]

    // Add background gradient effect
    pdf.setFillColor(248, 249, 250)
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')

    // Header with gradient background
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.rect(0, 0, pageWidth, 60, 'F')

    // Add logo (if you have one, replace the placeholder)
    try {
      pdf.addImage(RESGENXAI_LOGO, 'PNG', 20, 10, 30, 30)
    } catch (error) {
      console.log('Logo not added:', error)
    }

    // Conference Title
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('ResGenXAI 2025', pageWidth / 2, 25, { align: 'center' })

    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    pdf.text('International Conference on Responsible,', pageWidth / 2, 35, { align: 'center' })
    pdf.text('Generative and Explainable AI', pageWidth / 2, 42, { align: 'center' })

    pdf.setFontSize(12)
    pdf.text('Registration Confirmation', pageWidth / 2, 52, { align: 'center' })

    // Main content area
    let yPos = 80

    // Registration Confirmed badge
    pdf.setFillColor(34, 197, 94) // Green
    pdf.roundedRect(pageWidth / 2 - 40, yPos, 80, 12, 6, 6, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('✓ REGISTRATION CONFIRMED', pageWidth / 2, yPos + 8, { align: 'center' })

    yPos += 25

    // Participant Details Section
    pdf.setTextColor(textColor[0], textColor[1], textColor[2])
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Registration Details', 20, yPos)

    // Decorative line
    pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.setLineWidth(0.5)
    pdf.line(20, yPos + 3, 80, yPos + 3)

    yPos += 15

    // Registration details in a structured format
    const details = [
      { label: 'Registration ID', value: registration.registrationId },
      { label: 'Full Name', value: registration.participantName },
      { label: 'Email Address', value: registration.email },
      { label: 'Mobile Number', value: registration.mobileNumber },
      { label: 'Country', value: registration.country },
      { label: 'Category', value: registration.category.replace('-', ' ').toUpperCase() },
      { label: 'IEEE Member', value: registration.ieeeStatus === 'yes' ? 'Yes' : 'No' },
      { label: 'Nationality', value: registration.nationality.toUpperCase() },
      { label: 'Paper ID', value: registration.paperId },
      { label: 'Presentation Mode', value: registration.presentationMode.toUpperCase() }
    ]

    pdf.setFontSize(10)
    const leftColumnX = 20
    const rightColumnX = pageWidth / 2 + 10
    let leftY = yPos
    let rightY = yPos

    details.forEach((detail, index) => {
      const isLeftColumn = index % 2 === 0
      const xPos = isLeftColumn ? leftColumnX : rightColumnX
      const currentY = isLeftColumn ? leftY : rightY

      // Label
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2])
      pdf.text(`${detail.label}:`, xPos, currentY)

      // Value
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(textColor[0], textColor[1], textColor[2])
      pdf.text(detail.value, xPos, currentY + 6)

      if (isLeftColumn) {
        leftY += 16
      } else {
        rightY += 16
      }
    })

    yPos = Math.max(leftY, rightY) + 10

    // Payment Information Section
    pdf.setFillColor(240, 248, 255) // Light blue background
    pdf.rect(15, yPos, pageWidth - 30, 35, 'F')

    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Payment Information', 20, yPos + 10)

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(textColor[0], textColor[1], textColor[2])

    const paymentDetails = [
      `Amount Paid: ${registration.calculatedFee} ${registration.currency}`,
      `Payment Status: ${registration.paymentStatus.toUpperCase()}`,
      `Payment ID: ${registration.paymentId}`,
      `Order ID: ${registration.orderId}`,
      `Registration Date: ${new Date(registration.registrationDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`
    ]

    paymentDetails.forEach((detail, index) => {
      pdf.text(detail, 20, yPos + 18 + (index * 4))
    })

    yPos += 50

    // Conference Information Section
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Conference Information', 20, yPos)

    pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.line(20, yPos + 3, 90, yPos + 3)

    yPos += 15

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(textColor[0], textColor[1], textColor[2])

    const conferenceInfo = [
      'Dates: September 10-12, 2025',
      'Venue: Centurion University of Technology and Management',
      'Location: Bhubaneswar, Odisha, India',
      'Contact: saneev.das@cutm.ac.in | +91 7978029866',
      'Website: www.resgenxai.co.in'
    ]

    conferenceInfo.forEach((info, index) => {
      pdf.text(info, 20, yPos + (index * 6))
    })

    yPos += 40

    // Important Notes
    pdf.setFillColor(255, 243, 205) // Light yellow background
    pdf.rect(15, yPos, pageWidth - 30, 25, 'F')

    pdf.setTextColor(133, 100, 4) // Dark yellow
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Important Notes:', 20, yPos + 8)

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text('• Please keep this confirmation document safe for conference check-in', 20, yPos + 15)
    pdf.text('• Bring a valid photo ID along with this registration confirmation', 20, yPos + 19)

    // Footer
    yPos = pageHeight - 30

    pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.setLineWidth(0.3)
    pdf.line(20, yPos, pageWidth - 20, yPos)

    pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2])
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text('ResGenXAI 2025 - Centurion University of Technology and Management', pageWidth / 2, yPos + 8, { align: 'center' })
    pdf.text('This is a computer-generated document and does not require a signature.', pageWidth / 2, yPos + 14, { align: 'center' })
    pdf.text(`Generated on: ${new Date().toLocaleDateString('en-US')} at ${new Date().toLocaleTimeString('en-US')}`, pageWidth / 2, yPos + 20, { align: 'center' })

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ResGenXAI-2025-Registration-${registrationId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate PDF certificate',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}