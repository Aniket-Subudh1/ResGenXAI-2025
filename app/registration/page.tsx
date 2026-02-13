"use client"
import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle } from "lucide-react"

export default function InterestFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    interest: "",
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast({
        title: "Interest Registered",
        description: "Thank you for your interest!",
      })
    }, 1000)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto text-center shadow-2xl border-2 border-green-200">
            <CardContent className="pt-12 pb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-4">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-xl text-gray-600 mb-6">
                We&apos;ll revert back once we are back with the 2nd edition of ResGenXAI.
              </p>
              <p className="text-sm text-gray-500">
                You&apos;ll be among the first to know about ResGenXAI 2026!
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center text-primary">Interest Form</CardTitle>
            <CardDescription className="text-center text-lg text-gray-700">
              Register your interest for future editions of ResGenXAI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization/Institution</Label>
                <Input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Enter your organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Area of Interest (Optional)</Label>
                <Textarea
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder="Tell us about your areas of interest in AI research"
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Interest"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  )
}
