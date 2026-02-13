"use client"

import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { MapPin, Sun, Building, Mountain } from "lucide-react"

export default function TouristAttractions() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const attractions = [
    {
      title: "Konark Sun Temple",
      description:
        "A 13th-century UNESCO World Heritage site, famous for its architectural grandeur and intricate stone carvings depicting various aspects of life, culture, and mythology.",
      icon: Sun,
      image: "/knk.jpeg",
    },
    {
      title: "Jagannath Temple, Puri",
      description:
        "One of the Char Dham pilgrimage sites for Hindus, this 12th-century temple is dedicated to Lord Jagannath, a form of Vishnu, and is famous for its annual Rath Yatra (chariot festival).",
      icon: Building,
      image: "/puri.jpeg",
    },
    {
      title: "Udayagiri and Khandagiri Caves",
      description:
        "These ancient Jain rock-cut caves date back to the 1st-2nd century BCE and feature intricate carvings and inscriptions that provide insights into early Indian art and architecture.",
      icon: Mountain,
      image: "/knd.jpg",
    },
  ]

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Must-Visit Attractions</h2>
            <p className="text-lg text-gray-600 mt-4">
              Odisha offers a perfect blend of ancient heritage, spiritual significance, and natural beauty
            </p>
          </div>

          <div className="space-y-12">
            {attractions.map((attraction, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl overflow-hidden shadow-lg border border-primary/10 pattachitra-border transition-all duration-500 transform ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={attraction.image || "/placeholder.svg"}
                      alt={attraction.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <attraction.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{attraction.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{attraction.description}</p>
                    <div className="flex items-center text-primary">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">View on map</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 italic">
              The conference organized guided tours to these attractions for participants during ResGenXAI 2025.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
