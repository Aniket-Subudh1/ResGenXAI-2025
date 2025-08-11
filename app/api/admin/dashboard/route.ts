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

    if (!allRegistrations || allRegistrations.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          totalRegistrations: 0,
          completedPayments: 0,
          totalAmount: 0,
          categoryBreakdown: {},
          ieeeBreakdown: { 'Non-IEEE Members': 0, 'IEEE Members': 0 },
          recentRegistrations: [],
          allRegistrations: [],
        }
      })
    }

    const totalRegistrations = allRegistrations.length
    const completedPayments = allRegistrations.filter(reg => 
      reg.paymentStatus === 'completed'
    ).length
    
    const totalAmount = allRegistrations
      .filter(reg => reg.paymentStatus === 'completed')
      .reduce((sum, reg) => {
        const fee = typeof reg.calculatedFee === 'number' ? reg.calculatedFee : parseFloat(reg.calculatedFee) || 0
        return sum + fee
      }, 0)

    const categoryBreakdown = allRegistrations.reduce((acc, reg) => {
      const category = reg.category || 'unknown'
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // IEEE breakdown
    const ieeeBreakdown = allRegistrations.reduce((acc, reg) => {
      const key = (reg.ieeeStatus === 'yes') ? 'IEEE Members' : 'Non-IEEE Members'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Nationality breakdown
    const nationalityBreakdown = allRegistrations.reduce((acc, reg) => {
      const nationality = reg.nationality || 'unknown'
      acc[nationality] = (acc[nationality] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Payment status breakdown
    const paymentStatusBreakdown = allRegistrations.reduce((acc, reg) => {
      const status = reg.paymentStatus || 'unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Country breakdown (top countries)
    const countryBreakdown = allRegistrations.reduce((acc, reg) => {
      const country = reg.country || 'Unknown'
      acc[country] = (acc[country] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Presentation mode breakdown
    const presentationModeBreakdown = allRegistrations.reduce((acc, reg) => {
      const mode = reg.presentationMode || 'unknown'
      acc[mode] = (acc[mode] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const recentRegistrations = allRegistrations
      .filter(reg => reg.registrationDate) 
      .sort((a, b) => {
        const dateA = new Date(a.registrationDate).getTime()
        const dateB = new Date(b.registrationDate).getTime()
        return dateB - dateA 
      })
      .slice(0, 10)

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const dailyRegistrations = allRegistrations
      .filter(reg => {
        if (!reg.registrationDate) return false
        const regDate = new Date(reg.registrationDate)
        return regDate >= thirtyDaysAgo
      })
      .reduce((acc, reg) => {
        const date = new Date(reg.registrationDate).toISOString().split('T')[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {} as Record<string, number>)

    const analyticsData = {
      revenueByCategory: Object.keys(categoryBreakdown).reduce((acc, category) => {
        const categoryRevenue = allRegistrations
          .filter(reg => reg.category === category && reg.paymentStatus === 'completed')
          .reduce((sum, reg) => {
            const fee = typeof reg.calculatedFee === 'number' ? reg.calculatedFee : parseFloat(reg.calculatedFee) || 0
            return sum + fee
          }, 0)
        acc[category] = categoryRevenue
        return acc
      }, {} as Record<string, number>),

      averageRegistrationFee: completedPayments > 0 ? Math.round(totalAmount / completedPayments) : 0,

      // Completion rate
      completionRate: totalRegistrations > 0 ? Math.round((completedPayments / totalRegistrations) * 100) : 0,

      missingIeeeProofs: allRegistrations.filter(reg => 
        reg.ieeeStatus === 'yes' && !reg.ieeeProofUrl
      ).length,

      // Copyright agreement status
      copyrightAgreementBreakdown: allRegistrations.reduce((acc, reg) => {
        const status = reg.copyrightAgreement || 'unknown'
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }

    // Clean up the registration data before sending
    const cleanedRegistrations = allRegistrations.map(reg => ({
      ...reg,
      _id: reg._id.toString(), 
      calculatedFee: typeof reg.calculatedFee === 'number' ? reg.calculatedFee : parseFloat(reg.calculatedFee) || 0,
      registrationDate: reg.registrationDate || new Date().toISOString()
    }))

    const responseData = {
      totalRegistrations,
      completedPayments,
      totalAmount: Math.round(totalAmount), 
      categoryBreakdown,
      ieeeBreakdown,
      nationalityBreakdown,
      paymentStatusBreakdown,
      countryBreakdown,
      presentationModeBreakdown,
      recentRegistrations: recentRegistrations.map(reg => ({
        ...reg,
        _id: reg._id.toString()
      })),
      allRegistrations: cleanedRegistrations,
      dailyRegistrations,
      analytics: analyticsData
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    return NextResponse.json({ 
      error: 'Failed to fetch dashboard data',
      details: isDevelopment ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}