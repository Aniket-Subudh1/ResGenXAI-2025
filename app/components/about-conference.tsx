"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

export default function AboutConference() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 order-2 md:order-1 transition-all duration-1000 transform ${
              inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <span className="text-primary font-medium tracking-wider">ABOUT THE CONFERENCE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About ResGenXAI-2025</h2>
            <p className="text-gray-600 leading-relaxed">
              The "International Conference on Responsible, Generative and Explainable AI (ResGenXAI-2025)" is a newly
              initiated conference which focuses on high quality research articles that are quality checked through
              peer-review process and published in IEEE Xplore.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The scope of the conference is multidisciplinary in the domain focusing on recent advancements in
              artificial intelligence. The scope of the conference includes:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-600">
              <li>Human-Centered AI</li>
              <li>Internet of Things (IoT) and AI</li>
              <li>Image Processing and AI</li>
              <li>Signal Processing and AI</li>
            </ul>
           
          </div>
          <div
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2 transition-all duration-1000 delay-300 transform ${
              inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <Image
              src="cp2.png"
              alt="Centurion University Campus"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Floating badges */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-float">
              <span className="text-primary font-medium">IEEE Xplore Indexed</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-float animation-delay-1000">
              <span className="text-primary font-medium">Held September 10-12, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
    </section>
  )
}
