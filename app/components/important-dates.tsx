"use client"

import { useInView } from "react-intersection-observer"
import { FileCheck, Bell, Calendar, Users } from "lucide-react"

export default function ImportantDates() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const dates = [
    {
      date: "20th July, 2025 (Hard Deadline)",
      title: "Final Submission of manuscripts for review",
      description: "(Full Paper)",
      icon: FileCheck,
    },
    {
      date: "11th August, 2025",
      title: "Acceptance Notification",
      description: "",
      icon: Bell,
    },
    {
      date: "20th August, 2025",
      title: "Camera ready paper submission",
      description: "",
      icon: Calendar,
    },
    {
      date: "25th August, 2025",
      title: "Last Date of Registration",
      description: "",
      icon: Users,
    },
  ]

  return (
    <section className="py-24 bg-blue-50 relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>

      {/* Odisha art-inspired pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-primary font-medium tracking-wider">MARK YOUR CALENDAR</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">Important Dates</h2>
          <p className="text-gray-600">
            Make sure to note these critical deadlines for your participation in ResGenXAI 2025
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-300 to-indigo-500 rounded-full"></div>

          {dates.map((item, index) => (
            <div
              key={index}
              className={`relative z-10 mb-16 last:mb-0 transition-all duration-1000 transform ${
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-primary shadow-lg"></div>

                {/* Content card */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-blue-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">{item.date}</h3>
                      <p className="text-gray-800 font-medium">{item.title}</p>
                      {item.description && <p className="text-gray-600 text-sm mt-1">{item.description}</p>}
                    </div>
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
