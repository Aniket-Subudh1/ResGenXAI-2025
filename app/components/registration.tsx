"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { 
  Users, 
  GraduationCap, 
  Building2, 
  UserCheck, 
  Calendar, 
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Clock,
  FileText,
  Download
} from "lucide-react"

export default function Registration() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const registrationCategories = [
    {
      id: "student",
      title: "Student / Research Scholar",
      icon: GraduationCap,
      description: "For undergraduate, graduate students and research scholars",
      pricing: {
        ieee: { national: "₹6,500", international: "$250" },
        nonIeee: { national: "₹7,500", international: "$300" },
        attendee: { national: "₹1,000", international: "$100" }
      },
      features: [
        "Access to all technical sessions",
        "Conference proceedings",
        "Certificate of participation",
        "Networking opportunities",
        "Student workshop access"
      ],
      popular: true
    },
    {
      id: "academician",
      title: "Academician",
      icon: Users,
      description: "For faculty members and academic researchers",
      pricing: {
        ieee: { national: "₹7,500", international: "$350" },
        nonIeee: { national: "₹8,500", international: "$400" },
        attendee: { national: "₹1,500", international: "$120" }
      },
      features: [
        "Access to all technical sessions",
        "Conference proceedings",
        "Certificate of participation",
        "Networking opportunities",
        "Academic networking sessions"
      ]
    },
    {
      id: "industry",
      title: "Industry Professional",
      icon: Building2,
      description: "For industry professionals and corporate researchers",
      pricing: {
        ieee: { national: "₹8,500", international: "$450" },
        nonIeee: { national: "₹9,500", international: "$550" },
        attendee: { national: "₹1,500", international: "$150" }
      },
      features: [
        "Access to all technical sessions",
        "Conference proceedings",
        "Certificate of participation",
        "Industry networking sessions",
        "Technology showcase access"
      ]
    }
  ]

  const registrationProcess = [
    {
      step: 1,
      title: "Choose Category",
      description: "Select your registration category and IEEE membership status",
      icon: UserCheck
    },
    {
      step: 2,
      title: "Fill Details",
      description: "Complete the registration form with your information",
      icon: FileText
    },
    {
      step: 3,
      title: "Make Payment",
      description: "Secure online payment through Razorpay gateway",
      icon: CreditCard
    },
    {
      step: 4,
      title: "Confirmation",
      description: "Receive confirmation email and certificate",
      icon: CheckCircle
    }
  ]

  const handleBrochureDownload = () => {
    const link = document.createElement('a')
    link.href = '/brochure.pdf'
    link.rel = 'noopener noreferrer'
    
    link.download = 'ResGenXAI-2025-Brochure.pdf'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setTimeout(() => {
      try {
        window.open('/brochure.pdf')
      } catch (error) {
        console.error('Failed to open brochure:', error)
        alert('Brochure download failed. Please contact support.')
      }
    }, 100)
  }

  return (
    <section id="registration" className="py-24 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 transform ${
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <span className="text-primary font-medium tracking-wider">REGISTRATION</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
            Conference Registration
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Join leading researchers, academicians, and industry professionals in exploring 
            the future of Responsible, Generative, and Explainable AI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Global Participation</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span>IEEE Discounts Available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>

        {/* Registration Categories */}
        <div className={`mb-16 transition-all duration-1000 delay-300 transform ${
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <h3 className="text-2xl font-bold text-center mb-12">Registration Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {registrationCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card 
                  key={category.id} 
                  className={`relative transition-all duration-300 hover:shadow-lg ${
                    category.popular ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'
                  }`}
                >
                  {category.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Pricing Table */}
                    <div className="space-y-4 mb-6">
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-3">Registration Fees</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">IEEE Members</span>
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">{category.pricing.ieee.national}</div>
                            <div className="text-xs text-gray-600">{category.pricing.ieee.international}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Non-IEEE</span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{category.pricing.nonIeee.national}</div>
                            <div className="text-xs text-gray-600">{category.pricing.nonIeee.international}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium">Attendee Only</span>
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600">{category.pricing.attendee.national}</div>
                            <div className="text-xs text-gray-600">{category.pricing.attendee.international}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 text-center">
                        National (INR) / International (USD) <br />
                        *GST applicable for Indian participants
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Registration Process */}
        <div className={`mb-16 transition-all duration-1000 delay-500 transform ${
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <h3 className="text-2xl font-bold text-center mb-12">How to Register</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {registrationProcess.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    {index < registrationProcess.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full">
                        <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Important Information */}
        <div className={`bg-blue-50 rounded-xl p-8 mb-12 transition-all duration-1000 delay-700 transform ${
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <h3 className="text-xl font-bold text-blue-900 mb-4">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">Registration Includes:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Access to all technical sessions</li>
                <li>• Conference proceedings (digital)</li>
                <li>• Certificate of participation</li>
                <li>• Networking lunch and coffee breaks</li>
                <li>• Conference kit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Important Deadlines:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Early Bird Registration: June 30, 2025</li>
                <li>• Regular Registration: August 15, 2025</li>
                <li>• Late Registration: September 1, 2025</li>
                <li>• On-site Registration: Available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-900 transform ${
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Registration Now Open</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Secure Your Spot Today
            </h3>
            <p className="text-gray-600 mb-6">
              Don't miss out on this premier conference. Register now and join the global AI community 
              in Bhubaneswar for three days of cutting-edge research and networking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registration">
                <Button size="lg" className="bg-primary hover:bg-primary-600 text-white px-8">
                  Register Now
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={handleBrochureDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}