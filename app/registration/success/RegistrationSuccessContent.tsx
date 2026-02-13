"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail, Calendar, Loader2, FileText, Users, CreditCard, MapPin, Phone, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface RegistrationDetails {
  registrationId: string
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
  calculatedFee: number
  currency: string
  paymentStatus: string
  paymentId: string
  orderId: string
  registrationDate: string
}

export default function RegistrationSuccessContent() {
  const [loading, setLoading] = useState(true)
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    fetchRegistrationDetails()
  }, [searchParams])

  const fetchRegistrationDetails = async () => {
    try {
      const registrationId = searchParams.get('registrationId')
      
      if (!registrationId) {
        setError("No registration ID provided")
        setLoading(false)
        return
      }

      // Fetch registration details from API
      const response = await fetch(`/api/registration/${registrationId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch registration details')
      }

      const data = await response.json()
      
      if (data.success && data.registration) {
        setRegistrationDetails(data.registration)
      } else {
        setError("Registration not found")
      }
    } catch (error) {
      console.error('Error fetching registration:', error)
      setError("Failed to load registration details")
    } finally {
      setLoading(false)
    }
  }

  const generatePDFConfirmation = async () => {
    if (!registrationDetails) return

    try {
      const response = await fetch('/api/generate-certificate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: registrationDetails.registrationId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Get the PDF as blob
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ResGenXAI-2025-Registration-${registrationDetails.registrationId}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: "Registration certificate downloaded successfully"
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "Error",
        description: "Failed to generate PDF certificate",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
        <Header />
        
        <section className="pb-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <Loader2 className="w-24 h-24 animate-spin text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Loading Registration Details...
                </h1>
                <p className="text-lg text-gray-600">
                  Please wait while we fetch your registration information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  if (error || !registrationDetails) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
        <Header />
        
        <section className="pb-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Registration Not Found
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {error || "We couldn't find your registration details."}
                </p>
                <Link href="/registration">
                  <Button size="lg">
                    Go to Registration
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <Header />
      
      <section className="pb-20 pt-10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Success Animation */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Registration Successful! 🎉
              </h1>
              <p className="text-lg text-gray-600">
                Thank you, {registrationDetails.participantName}, for registering for ResGenXAI 2025.
              </p>
              <div className="mt-4 p-3 bg-green-50 rounded-lg inline-block">
                <p className="text-green-800 font-semibold">
                  Registration ID: {registrationDetails.registrationId}
                </p>
              </div>
            </div>

            {/* Registration Summary Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Registration Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Participant Details</h3>
                        <p className="text-gray-600">{registrationDetails.participantName}</p>
                        <p className="text-gray-600 text-sm">{registrationDetails.email}</p>
                        <p className="text-gray-600 text-sm">{registrationDetails.mobileNumber}</p>
                        <p className="text-gray-600 text-sm">{registrationDetails.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Registration Date</h3>
                        <p className="text-gray-600">
                          {new Date(registrationDetails.registrationDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Payment Details</h3>
                        <p className="text-2xl font-bold text-green-600">
                          {registrationDetails.calculatedFee} {registrationDetails.currency}
                        </p>
                        <p className="text-sm text-green-700 capitalize">
                          Status: {registrationDetails.paymentStatus}
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          Payment ID: {registrationDetails.paymentId}
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          Order ID: {registrationDetails.orderId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Conference Details</h3>
                        <p className="text-gray-600 capitalize">
                          Category: {registrationDetails.category.replace('-', ' ')}
                        </p>
                        <p className="text-gray-600">
                          IEEE Member: {registrationDetails.ieeeStatus === 'yes' ? 'Yes' : 'No'}
                        </p>
                        <p className="text-gray-600">
                          Paper ID: {registrationDetails.paperId}
                        </p>
                        <p className="text-gray-600 capitalize">
                          Presentation: {registrationDetails.presentationMode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-green-600">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 text-left">
                  <Mail className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Check Your Email</h3>
                    <p className="text-gray-600 text-sm">
                      A detailed confirmation email has been sent to <strong>{registrationDetails.email}</strong>. 
                      Please check your inbox and spam folder for the complete registration details and conference information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <Calendar className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Conference Dates</h3>
                    <p className="text-gray-600 text-sm">
                      ResGenXAI 2025 was held on <strong>September 10-12, 2025</strong> at 
                      Centurion University of Technology and Management, Bhubaneswar, Odisha, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <FileText className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Presentation Mode</h3>
                    <p className="text-gray-600 text-sm">
                      Your paper was registered for <strong>{registrationDetails.presentationMode}</strong> mode presentation 
                      at ResGenXAI 2025.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <Download className="w-5 h-5 text-indigo-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Certificate & Proceedings</h3>
                    <p className="text-gray-600 text-sm">
                      Conference proceedings are now published on IEEE Xplore. Participation certificates 
                      were distributed to all registered attendees.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conference Details Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Conference Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Conference Dates</h4>
                        <p className="text-gray-600">September 10-12, 2025</p>
                        <p className="text-sm text-gray-500">Successfully concluded with 671 submissions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Venue</h4>
                        <p className="text-gray-600">
                          Centurion University of Technology and Management<br />
                          Bhubaneswar, Odisha, India
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Contact Information</h4>
                        <p className="text-gray-600">
                          <a href="mailto:saneev.das@cutm.ac.in" className="text-blue-600 hover:underline">
                            saneev.das@cutm.ac.in
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">
                          <a href="tel:+917978029866" className="text-blue-600 hover:underline">
                            +91 7978029866
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" onClick={generatePDFConfirmation} className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Download PDF Certificate
              </Button>
              
              <Link href="/sight-seeing">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <MapPin className="w-4 h-4 mr-2" />
                  Explore Odisha
                </Button>
              </Link>
            </div>

            {/* Important Notice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Registration Record</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Your registration ID ({registrationDetails.registrationId}) serves as confirmation 
                      of your participation in ResGenXAI 2025.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-900">Future Editions</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Interested in future editions of ResGenXAI? Register your interest through our 
                      Interest Form to be notified about upcoming conferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}