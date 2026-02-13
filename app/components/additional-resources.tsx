"use client"

import { useInView } from "react-intersection-observer"
import { ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function AdditionalResources() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Additional Resources</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              The{" "}
              <a href="https://ieeeauthorcenter.ieee.org/" className="text-primary hover:text-primary/80">
                IEEE Author Center
              </a>{" "}
              offers guidance and best practices for authors involved in IEEE conferences. This resource covers topics
              such as ethics, paper structure, peer review, and publication essentials.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Published Proceedings</h3>
              <p>
                ResGenXAI 2025 successfully used Microsoft CMT service for managing the peer-reviewing process.
                All accepted papers are now published and available on IEEE Xplore. View our high-quality proceedings
                featuring 67 papers selected from 671 submissions across 8 countries.
              </p>

              <div className="mt-6 flex justify-center">
                <Link href="https://ieeexplore.ieee.org/xpl/conhome/11343984/proceeding">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full flex items-center gap-2">
                  View Proceedings
                  <ExternalLink className="w-4 h-4" />
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
