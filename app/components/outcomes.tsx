"use client"

import { useInView } from "react-intersection-observer"
import { Globe, Award, TrendingUp } from "lucide-react"

export default function Outcomes() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <span className="text-primary font-medium tracking-wider text-sm">INAUGURAL CONFERENCE SUCCESS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              OUTCOMES OF ResGenXAI 2025
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              This being our inaugural conference, we are absolutely thrilled with the results. To share some of our
              excitement with you:
            </p>

            <div className="space-y-6">
              {/* Global Reach */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We received a staggering <strong className="text-primary">671 submissions from 8 different countries</strong>, 
                    an incredible feat for a first-time event with such a specialized, narrow scope.
                  </p>
                </div>
              </div>

              {/* Academic Rigor */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Academic Rigor</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Staying true to the high standards we promised in our application, we maintained a strict{" "}
                    <strong className="text-primary">10% acceptance rate</strong>, selecting only{" "}
                    <strong className="text-primary">67 high-quality articles</strong> for publication.
                  </p>
                </div>
              </div>

              {/* Quality Excellence */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Excellence</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The quality of the{" "}
                    <a
                      href="https://ieeexplore.ieee.org/xpl/conhome/11343984/proceeding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-700 underline font-semibold"
                    >
                      final proceedings on IEEE Xplore
                    </a>{" "}
                    has exceeded our wildest expectations. This success would not have been possible without the backend
                    support and diligence of the IEEE teams.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">671</div>
                <p className="text-gray-600">Submissions Received</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">8</div>
                <p className="text-gray-600">Countries Represented</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">67</div>
                <p className="text-gray-600">Papers Published</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
    </section>
  )
}
