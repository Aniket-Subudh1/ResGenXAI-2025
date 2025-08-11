"use client"

import { useInView } from "react-intersection-observer"
import { Newspaper } from "lucide-react"

export default function Publication() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

const committeeMembers = [
  {"name": "Dr. Srinivas Bhaskar Karanki", "affiliation": "IIT, Bhubaneswar, Odisha, India"},
  { "name": "Dr. Chinmoy Kumar Panigrahi", "affiliation": "KIIT Deemed to be University, Bhubaneswar, Odisha, India" },
  { "name": "Dr. Satyasis Mishra", "affiliation": "Centurion University of Technology and Management, Bhubaneswar, Odisha, India" },
  { "name": "Dr. Tanmoy Roy Choudhury", "affiliation": "NIT, Rourkela, Odisha, India" },
  { "name": "Dr. Manoj Debanath", "affiliation": "SoA University, Bhubaneswar, Odisha, India" },
  { "name": "Dr. Manohar Mishra", "affiliation": "SoA University, Bhubaneswar, Odisha, India" },
  { "name": "Sujit Bebortta", "affiliation": "Ravenshaw University, Cuttack, Odisha, India" },
  { "name": "Saneev Kumar Das", "affiliation": "Centurion University of Technology and Management, Bhubaneswar, Odisha, India" },
  { "name": "Prof. Debasish Swapnesh Kumar Nayak", "affiliation": "Centurion University of Technology and Management, Bhubaneswar, Odisha, India" },
];


  return (
    <section className="py-16 bg-orange-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-orange-50 px-6 text-2xl font-bold text-primary flex items-center">
                <Newspaper className="w-6 h-6 mr-2" />
                Publication Commitee
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-8">
            {committeeMembers.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-primary/10 pattachitra-border ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{member.affiliation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
