"use client"

import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Registration() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-serif">Registration</h2>
          
          <div className="bg-white rounded-xl p-8 shadow-lg border border-primary/10 pattachitra-border">
            <h3 className="text-2xl font-bold text-primary mb-6">ResGenXAI 2025 Successfully Concluded</h3>
            <p className="text-gray-600 mb-6">
              Thank you to all reviewers who participated in ResGenXAI 2025. Register your interest for future editions to continue being part of our AI research community.
            </p>
            
            {/* Registration Button */}
            <div className="mb-6">
              <a 
                href="https://forms.zohopublic.in/saneevdas061995gm1/form/ReviewerRequestForm/formperma/mJGeeXTvBB656ZOOzWxFvXH4kLheJXg6rDNAI6myrsQ?zf_rszfm=1" 
                className="inline-block bg-primary hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 group"
              >
                Be a Reviewer
                <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="text-gray-500 mb-6">OR</div>
            
            {/* QR Code Space */}
            <div className="flex justify-center">
              <div className="bg-white p-2 border-2 border-gray-200 rounded-md w-48 h-48 relative">
                <Image
                  src="/reg.png"
                  alt="Registration QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Scan this QR code to register on your mobile device
            </p>
          </div>
          
          <div className="mt-8 text-gray-600 text-sm">
            <p>
              For registration assistance, contact <a href="mailto:saneev.das@cutm.ac.in" className="text-primary hover:underline">saneev.das@cutm.ac.in</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}