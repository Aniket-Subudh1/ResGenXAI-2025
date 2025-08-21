"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/header"
import Footer from "../components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Users, CreditCard, CheckCircle, Loader2, AlertCircle, XCircle, UserCheck } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RegistrationFormData {
  // Personal Information
  participantName: string
  mobileNumber: string
  whatsappNumber: string
  country: string
  email: string
  
  // Paper Information
  paperId: string
  copyrightAgreement: string
  presentationMode: string
  
  // Registration Details
  registrationFee: string
  category: string
  ieeeStatus: string
  nationality: string
  
  // File Uploads
  paymentProof?: File
  ieeeProof?: File
}

interface DuplicateCheckResult {
  isDuplicate: boolean
  message: string
  registrationId?: string
  paymentStatus?: string
  field?: string
}

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
  "Cambodia", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Dominican Republic", "Ecuador", "Egypt", "Estonia", "Ethiopia", "Finland", "France",
  "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait",
  "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Mexico", "Morocco", "Netherlands",
  "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "Slovakia", "Slovenia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam"
]

const PRICING = {
  student: {
    ieee: { national: 6500, international: 250 },
    nonIeee: { national: 7500, international: 300 },
    attendee: { national: 1000, international: 100 }
  },
  academician: {
    ieee: { national: 7500, international: 350 },
    nonIeee: { national: 8500, international: 400 },
    attendee: { national: 1500, international: 120 }
  },
  industry: {
    ieee: { national: 8500, international: 450 },
    nonIeee: { national: 9500, international: 550 },
    attendee: { national: 1500, international: 150 }
  }
}

const GST_RATE = 0.18 

export default function RegistrationPage() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    participantName: "",
    mobileNumber: "",
    whatsappNumber: "",
    country: "",
    email: "",
    paperId: "",
    copyrightAgreement: "",
    presentationMode: "",
    registrationFee: "",
    category: "",
    ieeeStatus: "",
    nationality: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [duplicateChecking, setDuplicateChecking] = useState(false)
  const [baseFee, setBaseFee] = useState(0)
  const [gstAmount, setGstAmount] = useState(0)
  const [calculatedFee, setCalculatedFee] = useState(0)
  const [currency, setCurrency] = useState("INR")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false)
  const [duplicateInfo, setDuplicateInfo] = useState<DuplicateCheckResult | null>(null)
  
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => setRazorpayLoaded(true)
    script.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load payment gateway. Please refresh the page.",
        variant: "destructive"
      })
    }
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (formData.category && formData.ieeeStatus && formData.nationality) {
      try {
        const categoryKey = formData.category.toLowerCase().replace(/^attendee-/, '') as keyof typeof PRICING
        const ieeeKey = formData.ieeeStatus === "yes" ? "ieee" : "nonIeee"
        const nationalityKey = formData.nationality === "national" ? "national" : "international"
        
        let fee = 0
        
        if (formData.category.toLowerCase().includes("attendee")) {
          fee = PRICING[categoryKey].attendee[nationalityKey]
        } else {
          fee = PRICING[categoryKey][ieeeKey][nationalityKey]
        }
        
        setBaseFee(fee)
        
        // Calculate GST only for national (Indian) participants
        if (nationalityKey === "national") {
          const gst = fee * GST_RATE
          setGstAmount(gst)
          setCalculatedFee(fee + gst)
          setCurrency("INR")
        } else {
          // No GST for international participants
          setGstAmount(0)
          setCalculatedFee(fee)
          setCurrency("USD")
        }
        
      } catch (error) {
        console.error("Fee calculation error:", error)
        toast({
          title: "Error",
          description: "Failed to calculate registration fee. Please try again.",
          variant: "destructive"
        })
      }
    }
  }, [formData.category, formData.ieeeStatus, formData.nationality])

  const checkForDuplicates = async (email: string, paperId?: string) => {
    if (!email) return { isDuplicate: false, message: '' }

    setDuplicateChecking(true)
    try {
      const response = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.toLowerCase().trim(),
          paperId: paperId?.trim() 
        })
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Duplicate check error:', error)
      return { isDuplicate: false, message: 'Failed to check duplicates' }
    } finally {
      setDuplicateChecking(false)
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleEmailBlur = async () => {
    if (formData.email && validateEmail(formData.email)) {
      const duplicateResult = await checkForDuplicates(formData.email)
      if (duplicateResult.isDuplicate) {
        setDuplicateInfo(duplicateResult)
        setDuplicateDialogOpen(true)
      }
    }
  }

  const handlePaperIdBlur = async () => {
    if (formData.paperId && formData.email && validateEmail(formData.email)) {
      const duplicateResult = await checkForDuplicates(formData.email, formData.paperId)
      if (duplicateResult.isDuplicate && duplicateResult.field === 'paperId') {
        setErrors(prev => ({ ...prev, paperId: duplicateResult.message }))
      }
    }
  }

  const handleFileChange = (name: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive"
      })
      return
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Only JPG, PNG, and PDF files are allowed",
        variant: "destructive"
      })
      return
    }

    setFormData(prev => ({ ...prev, [name]: file }))
  }

  const uploadToS3 = async (file: File, fileName: string) => {
    setUploadLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileName', fileName)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      setUploadLoading(false)
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.participantName.trim()) newErrors.participantName = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format"
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required"
        else if (!validatePhone(formData.mobileNumber)) newErrors.mobileNumber = "Invalid mobile number"
        if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = "WhatsApp number is required"
        else if (!validatePhone(formData.whatsappNumber)) newErrors.whatsappNumber = "Invalid WhatsApp number"
        if (!formData.country.trim()) newErrors.country = "Country is required"
        break
      case 2:
        if (!formData.category) newErrors.category = "Category is required"
        if (!formData.ieeeStatus) newErrors.ieeeStatus = "IEEE status is required"
        if (!formData.nationality) newErrors.nationality = "Nationality is required"
        if (formData.ieeeStatus === "yes" && !formData.ieeeProof) {
          newErrors.ieeeProof = "IEEE membership proof is required"
        }
        break
      case 3:
        if (!formData.paperId.trim()) newErrors.paperId = "Paper ID is required"
        if (!formData.copyrightAgreement) newErrors.copyrightAgreement = "Copyright agreement status is required"
        if (!formData.presentationMode) newErrors.presentationMode = "Presentation mode is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive"
      })
      return
    }

    // Check for duplicates before proceeding to payment
    if (currentStep === 3) {
      const duplicateResult = await checkForDuplicates(formData.email, formData.paperId)
      if (duplicateResult.isDuplicate) {
        setDuplicateInfo(duplicateResult)
        setDuplicateDialogOpen(true)
        return
      }
    }

    setCurrentStep(prev => prev + 1)
  }

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast({
        title: "Error",
        description: "Payment gateway is still loading. Please wait a moment.",
        variant: "destructive"
      })
      return
    }

    if (!validateStep(3)) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields",
        variant: "destructive"
      })
      return
    }

    // Final duplicate check before payment
    const duplicateResult = await checkForDuplicates(formData.email, formData.paperId)
    if (duplicateResult.isDuplicate) {
      setDuplicateInfo(duplicateResult)
      setDuplicateDialogOpen(true)
      return
    }

    setPaymentLoading(true)
    
    try {
      let paymentProofUrl = ""
      let ieeeProofUrl = ""

      if (formData.paymentProof) {
        const paymentResult = await uploadToS3(
          formData.paymentProof, 
          `payment-${Date.now()}-${formData.participantName.replace(/\s+/g, '-')}`
        )
        paymentProofUrl = paymentResult.url
      }

      if (formData.ieeeProof) {
        const ieeeResult = await uploadToS3(
          formData.ieeeProof, 
          `ieee-${Date.now()}-${formData.participantName.replace(/\s+/g, '-')}`
        )
        ieeeProofUrl = ieeeResult.url
      }

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(calculatedFee),
          currency,
          receipt: `reg_${Date.now()}`,
          registrationData: {
            ...formData,
            paymentProofUrl,
            ieeeProofUrl,
            baseFee,
            gstAmount,
            calculatedFee: Math.round(calculatedFee),
            currency
          }
        })
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ResGenXAI 2025",
        description: `Conference Registration${gstAmount > 0 ? ' (Including 18% GST)' : ''}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          setPaymentLoading(true)
          
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationData: {
                  ...formData,
                  paymentProofUrl,
                  ieeeProofUrl,
                  baseFee,
                  gstAmount,
                  calculatedFee: Math.round(calculatedFee),
                  currency
                }
              })
            })

            const verifyData = await verifyResponse.json()

            if (verifyResponse.ok) {
              toast({
                title: "Success!",
                description: verifyData.isDuplicate 
                  ? "Payment confirmed! Registration was already completed." 
                  : "Registration completed successfully. Redirecting..."
              })
              
              setTimeout(() => {
                router.push(`/registration/success?registrationId=${verifyData.registrationId}`)
              }, 1500)
            } else {
              // Handle specific error codes
              if (verifyData.code === 'EMAIL_ALREADY_REGISTERED') {
                toast({
                  title: "Registration Already Exists",
                  description: `This email is already registered with ID: ${verifyData.existingRegistrationId}. Your payment will be refunded.`,
                  variant: "destructive"
                })
              } else if (verifyData.code === 'PAPER_ID_DUPLICATE') {
                toast({
                  title: "Paper ID Already Used",
                  description: "This Paper ID is already registered. Your payment will be refunded.",
                  variant: "destructive"
                })
              } else {
                throw new Error(verifyData.error || 'Payment verification failed')
              }
              
              setPaymentLoading(false)
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            setPaymentLoading(false)
            toast({
              title: "Error",
              description: "Payment verification failed. Please contact support with your payment ID: " + response.razorpay_payment_id,
              variant: "destructive"
            })
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false)
          }
        },
        prefill: {
          name: formData.participantName,
          email: formData.email,
          contact: formData.mobileNumber.replace(/\D/g, '')
        },
        theme: {
          color: "#E65100"
        },
        notes: {
          base_fee: baseFee.toString(),
          gst_amount: gstAmount.toString(),
          total_amount: Math.round(calculatedFee).toString(),
          nationality: formData.nationality
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response: any) {
        setPaymentLoading(false)
        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment was unsuccessful. Please try again.",
          variant: "destructive"
        })
      })
      
      razorpay.open()

    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive"
      })
    } finally {
      if (!paymentLoading) {
        setPaymentLoading(false)
      }
    }
  }

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm mx-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
        <p className="text-gray-600">
          Please wait while we process your registration and payment. Do not close this window.
        </p>
      </div>
    </div>
  )

  // Duplicate Registration Dialog
  const DuplicateDialog = () => (
    <Dialog open={duplicateDialogOpen} onOpenChange={setDuplicateDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Registration Already Exists
          </DialogTitle>
          <DialogDescription>
            {duplicateInfo?.message}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {duplicateInfo?.registrationId && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Existing Registration ID: {duplicateInfo.registrationId}
              </p>
              <p className="text-sm text-blue-700">
                Payment Status: {duplicateInfo.paymentStatus === 'completed' ? 'Completed' : 'Pending'}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button 
              onClick={() => setDuplicateDialogOpen(false)}
              variant="outline"
            >
              Edit Registration Details
            </Button>
            {duplicateInfo?.registrationId && (
              <Button 
                onClick={() => router.push(`/registration/success?registrationId=${duplicateInfo.registrationId}`)}
                className="w-full"
              >
                View Existing Registration
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Please provide your basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="participantName">Name of the Participant *</Label>
                <Input
                  id="participantName"
                  value={formData.participantName}
                  onChange={(e) => handleInputChange("participantName", e.target.value)}
                  placeholder="Your full name"
                  className={errors.participantName ? "border-red-500" : ""}
                />
                {errors.participantName && (
                  <p className="text-sm text-red-500">{errors.participantName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder="your.email@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {duplicateChecking && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                    placeholder="+91 1234567890"
                    className={errors.mobileNumber ? "border-red-500" : ""}
                  />
                  {errors.mobileNumber && (
                    <p className="text-sm text-red-500">{errors.mobileNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
                  <Input
                    id="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                    placeholder="+91 1234567890"
                    className={errors.whatsappNumber ? "border-red-500" : ""}
                  />
                  {errors.whatsappNumber && (
                    <p className="text-sm text-red-500">{errors.whatsappNumber}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Your Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-sm text-red-500">{errors.country}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Registration Category
              </CardTitle>
              <CardDescription>Select your category and membership status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Category *</Label>
                <RadioGroup
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                  className={errors.category ? "border border-red-500 p-3 rounded" : ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student / Research Scholar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="academician" id="academician" />
                    <Label htmlFor="academician">Academician</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="industry" id="industry" />
                    <Label htmlFor="industry">Industry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attendee-student" id="attendee-student" />
                    <Label htmlFor="attendee-student">Attendee - Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attendee-academician" id="attendee-academician" />
                    <Label htmlFor="attendee-academician">Attendee - Academician</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attendee-industry" id="attendee-industry" />
                    <Label htmlFor="attendee-industry">Attendee - Industry</Label>
                  </div>
                </RadioGroup>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Are you an IEEE Member? *</Label>
                <RadioGroup
                  value={formData.ieeeStatus}
                  onValueChange={(value) => handleInputChange("ieeeStatus", value)}
                  className={errors.ieeeStatus ? "border border-red-500 p-3 rounded" : ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="ieee-yes" />
                    <Label htmlFor="ieee-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="ieee-no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
                {errors.ieeeStatus && (
                  <p className="text-sm text-red-500">{errors.ieeeStatus}</p>
                )}
              </div>

              {formData.ieeeStatus === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="ieeeProof">IEEE Membership Proof *</Label>
                  <div className={`border-2 border-dashed rounded-lg p-4 ${errors.ieeeProof ? "border-red-500" : "border-gray-300"}`}>
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="ieeeProof" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload IEEE Membership Certificate
                          </span>
                          <span className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
                          <input
                            id="ieeeProof"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => e.target.files?.[0] && handleFileChange("ieeeProof", e.target.files[0])}
                          />
                        </label>
                        {formData.ieeeProof && (
                          <p className="text-sm text-green-600 mt-2">
                            ✓ {formData.ieeeProof.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.ieeeProof && (
                    <p className="text-sm text-red-500">{errors.ieeeProof}</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <Label>Nationality *</Label>
                <RadioGroup
                  value={formData.nationality}
                  onValueChange={(value) => handleInputChange("nationality", value)}
                  className={errors.nationality ? "border border-red-500 p-3 rounded" : ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="national" id="national" />
                    <Label htmlFor="national">National (India)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="international" id="international" />
                    <Label htmlFor="international">International</Label>
                  </div>
                </RadioGroup>
                {errors.nationality && (
                  <p className="text-sm text-red-500">{errors.nationality}</p>
                )}
              </div>

              {calculatedFee > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Registration Fee Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Fee:</span>
                      <span className="font-medium">{baseFee} {currency}</span>
                    </div>
                    {gstAmount > 0 && (
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span className="font-medium">{Math.round(gstAmount)} {currency}</span>
                      </div>
                    )}
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-2xl font-bold text-primary">
                          {Math.round(calculatedFee)} {currency}
                        </span>
                      </div>
                    </div>
                  </div>
                  {gstAmount === 0 && formData.nationality === "international" && (
                    <p className="text-sm text-gray-600 mt-2">
                      * No GST applicable for international participants
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Paper Information
              </CardTitle>
              <CardDescription>Provide details about your paper submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paperId">Paper ID *</Label>
                <Input
                  id="paperId"
                  value={formData.paperId}
                  onChange={(e) => handleInputChange("paperId", e.target.value)}
                  onBlur={handlePaperIdBlur}
                  placeholder="e.g., PID001"
                  className={errors.paperId ? "border-red-500" : ""}
                />
                {errors.paperId && (
                  <p className="text-sm text-red-500">{errors.paperId}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Have you filled the Copyright Agreement? *</Label>
                <RadioGroup
                  value={formData.copyrightAgreement}
                  onValueChange={(value) => handleInputChange("copyrightAgreement", value)}
                  className={errors.copyrightAgreement ? "border border-red-500 p-3 rounded" : ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="copyright-yes" />
                    <Label htmlFor="copyright-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="copyright-no" />
                    <Label htmlFor="copyright-no">No</Label>
                  </div>
                </RadioGroup>
                {errors.copyrightAgreement && (
                  <p className="text-sm text-red-500">{errors.copyrightAgreement}</p>
                )}
              </div>

             <div className="space-y-3">
                <Label>Mode of Paper Presentation *</Label>
                <RadioGroup
                  value={formData.presentationMode}
                  onValueChange={(value) => handleInputChange("presentationMode", value)}
                  className={errors.presentationMode ? "border border-red-500 p-3 rounded" : ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="physical" id="physical" />
                    <Label htmlFor="physical">Physical Mode</Label>
                  </div>
                </RadioGroup>
                {errors.presentationMode && (
                  <p className="text-sm text-red-500">{errors.presentationMode}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Payment & Confirmation
              </CardTitle>
              <CardDescription>Review your details and proceed to payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Registration Summary</h3>
                <p><strong>Name:</strong> {formData.participantName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Country:</strong> {formData.country}</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>IEEE Member:</strong> {formData.ieeeStatus === 'yes' ? 'Yes' : 'No'}</p>
                <p><strong>Nationality:</strong> {formData.nationality}</p>
                <p><strong>Paper ID:</strong> {formData.paperId}</p>
                <p><strong>Presentation Mode:</strong> {formData.presentationMode}</p>
              </div>

              {/* Enhanced Fee Breakdown */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-lg mb-3">Payment Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Registration Fee:</span>
                    <span className="font-medium">{baseFee} {currency}</span>
                  </div>
                  {gstAmount > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>GST (18%):</span>
                        <span className="font-medium">+{Math.round(gstAmount)} {currency}</span>
                      </div>
                      <div className="border-t border-blue-200 pt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total Amount (Incl. GST):</span>
                          <span className="text-xl font-bold text-primary">
                            {Math.round(calculatedFee)} {currency}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {gstAmount === 0 && (
                    <div className="border-t border-blue-200 pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-xl font-bold text-primary">
                          {Math.round(calculatedFee)} {currency}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        * No GST applicable for international participants
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {!razorpayLoaded && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Loading payment gateway... Please wait.
                  </AlertDescription>
                </Alert>
              )}

              {uploadLoading && (
                <Alert>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <AlertDescription>
                    Uploading files... Please don't close this window.
                  </AlertDescription>
                </Alert>
              )}

              {duplicateChecking && (
                <Alert>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <AlertDescription>
                    Checking for duplicate registrations... Please wait.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <Header />
      
      {paymentLoading && <LoadingOverlay />}
      <DuplicateDialog />
      
      <section className="pb-20 pt-10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-12 h-1 mx-2 ${
                          currentStep > step ? "bg-primary" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Conference Registration - Step {currentStep} of 4
                </h2>
              </div>
            </div>

            {/* Form Content */}
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 max-w-2xl mx-auto">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1 || loading || paymentLoading || duplicateChecking}
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button 
                  onClick={handleNextStep}
                  disabled={loading || paymentLoading || duplicateChecking}
                >
                  {duplicateChecking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Checking...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Next"
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={handlePayment} 
                  disabled={loading || paymentLoading || !razorpayLoaded || duplicateChecking}
                  className="min-w-[200px]"
                >
                  {paymentLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : duplicateChecking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Checking...
                    </>
                  ) : !razorpayLoaded ? (
                    "Loading Payment..."
                  ) : (
                    `Pay ${Math.round(calculatedFee)} ${currency}${gstAmount > 0 ? ' (Incl. GST)' : ''}`
                  )}
                </Button>
              )}
            </div>

            {/* Important Notes */}
            <div className="mt-8 max-w-2xl mx-auto">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Please ensure all information is correct before proceeding to payment. 
                  We check for duplicate registrations to prevent multiple payments.
                  {gstAmount > 0 && (
                    <span className="block mt-1">
                      * GST of 18% is applicable for Indian participants as per government regulations.
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}