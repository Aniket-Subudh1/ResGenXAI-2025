"use client"

import { useInView } from "react-intersection-observer"
import { FileText } from "lucide-react"

export default function IEEEPDFExpress() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">IEEE PDF eXpress</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              All final manuscripts must be generated using the IEEE PDF eXpress tool to ensure compatibility with IEEE
              Xplore. To create your IEEE Xplore-compatible PDF file:
            </p>

            <div className="bg-white p-6 rounded-xl shadow-md my-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900">Create an IEEE PDF eXpress Account:</h4>
                  <a href="https://ieee-pdf-express.org/account/login?ReturnUrl=%2F" className="text-primary hover:text-primary/80">
                    IEEE PDF eXpress
                  </a>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">Conference ID:</h4>
                  <p>64788X</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Register as a new user if accessing for the first time.</li>
                    <li>Upload the source file of your paper.</li>
                    <li>Receive the IEEE Xplore-compatible PDF via email.</li>
                    <li>
                      Upload the received PDF to the conference system without any changes to the file or filename.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
