"use client"

import { useInView } from "react-intersection-observer"
import { Newspaper } from "lucide-react"

export default function Local() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

const committeeMembers = [
  { "name": "Dr. Nagesh Kolagani", "affiliation": "CUTM, A.P." },
  { "name": "Dr. Amrutanshu Panigrahi", "affiliation": "SoA University, Bhubaneswar" },
  { "name": "Dr. Abhilash Pati", "affiliation": "SoA University, Bhubaneswar" },
  { "name": "Dr. Mihir Narayan Mohanty", "affiliation": "SoA University, Bhubaneswar" },
  { "name": "Dr. Deepak Kumar Panda", "affiliation": "Galgotias University, Greater Noida"},
  { "name": "Dr. Soumya Snigdha Mohapatra", "affiliation": "Pillai College of Engineering, Navi Mumbai"},
  { "name": "Dr. Sasmita Kumari Nayak", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. Sunil Kumar Mohapatra", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. Dhawaleswar Rao Ch.", "affiliation": "CUTM, Parlakhemundi" },
  { "name": "Dr. Debendra Kumar Sahoo", "affiliation": "CUTM, Parlakhemundi" },
  { "name": "Dr. Prafulla Kumar Panda", "affiliation": "CUTM, Parlakhemundi" },
  { "name": "Dr. P.A. Sunny Dayal", "affiliation": "CUTM, A.P." },
  { "name": "Dr. Ashok Mishra", "affiliation": "CUTM, Parlakhemundi" },
  { "name": "Dr. Kamal Kumar Barik", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. Sunita Routray", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Prof. Debasish Swapnesh Kumar Nayak", "affiliation": "Centurion University of Technology and Management, Bhubaneswar, Odisha, India" },
  { "name": "Dr. Biranchi Narayan Mishra", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. Amit Kumar Sahoo", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. Jyoti Prakash Giri", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. Manas Ranjan Padhi", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. Rakesh Kumar Behera", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Prof. Satyananda Swain", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Prof. Swarupa Pattnaik", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Dr. N.V.S. Shankar", "affiliation": "CUTM, A.P." },
  { "name": "Prof. Saroj Kumar Sahoo", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Prof. Rasmi Ranjan Swain", "affiliation": "CUTM, Bhubaneswar" },
  { "name": "Prof. P. Anuradha", "affiliation": "CUTM, A.P." }
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
                Local Organizing Committee
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
