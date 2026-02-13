"use client"

import { useInView } from "react-intersection-observer"

export default function PaperSubmissionGuidelines() {
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Camera-Ready Paper Submissions</h2>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-xl shadow-md mb-8">
              <p className="font-semibold text-gray-900 mb-2">📌 Historical Information</p>
              <p className="text-gray-700">
                This page contains archival information about the submission guidelines for ResGenXAI 2025.
                The conference has concluded and proceedings are now available on IEEE Xplore.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md my-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900">Final Submission Deadline:</h4>
                  <p>
                    The final camera-ready manuscript was required by June 30, 2025.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">IEEE Copyright Form:</h4>
                  <p>
                    A signed IEEE Copyright Form was required for each accepted paper. The ResGenXAI 2025 conference used the IEEE Electronic
                    Copyright (eCF) service for this process.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">Publication Requirements:</h4>
                  <p>
                    An accepted paper will be published in the conference proceedings and included in IEEE Xplore only
                    if:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>The final camera-ready version is submitted.</li>
                    <li>The corresponding IEEE Copyright Form is completed.</li>
                    <li>At least one author registers for the conference at the full member or non-member rate.</li>
                    <li>The paper is presented at the conference.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
