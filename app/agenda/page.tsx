"use client"

import { useInView } from "react-intersection-observer"
import { Calendar, Clock } from "lucide-react"
import AttendHero from "../components/attend-hero"
import Header from "../components/header"

export default function Agenda() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Full agenda data taken from Meeting Agenda.pdf (all paper IDs included)
  const dayOne = [
    { time: "10:00 AM - 10:30 AM", item: "Welcome Address" },
    {
      time: "10:30 AM - 10:35 AM",
      item:
        "Welcome Speech by Prof. (Dr.) Supriya Pattanayak, Hon'ble Vice Chancellor, CUTM, Odisha",
    },
    {
      time: "10:35 AM - 10:40 AM",
      item:
        "Address by Shri Preet Yadav, Head India Innovation Ecosystem, NXP (Chairperson, IEEE CASS Delhi)",
    },
    {
      time: "10:40 AM - 10:45 AM",
      item:
        "Address by Shri H.K. Ratha, Former Director, ITR Chandipur (Past Chair, IEEE Bhubaneswar Subsection)",
    },
    {
      time: "10:45 AM - 10:50 AM",
      item:
        "Address by Shri Ashok Kumar Tripathi, Former Director General of the Central Power Research Institute (CPRI) (Advisor, IEEE Bhubaneswar Section)",
    },
    {
      time: "10:50 AM - 10:55 AM",
      item:
        "Address by Prof. (Dr.) Ganapati Panda, Former Dy. Director, IIT Bhubaneswar (Advisor, IEEE Bhubaneswar Section)",
    },
    {
      time: "10:55 AM - 11:05 AM",
      item:
        "Address by Prof. (Dr.) Sankar K Pal, National Science Chair, SERB, Govt. of India (President, Indian Statistical Institute)",
    },
    {
      time: "11:05 AM - 11:15 AM",
      item:
        "Vote of Thanks by Convenor Prof. (Dr.) Sujata Chakravarty, Professor and Dean, SoET, CUTM",
    },
    { time: "11:15 AM - 11:30 AM", item: "Tea Break" },
    {
      time: "11:30 AM - 12:30 PM",
      item:
        "Keynote by Prof. (Dr.) Sankar K Pal, National Science Chair, SERB, Govt. of India (President, Indian Statistical Institute)",
    },
    { time: "12:30 PM - 1:30 PM", item: "Lunch" },
    { time: "2:00 PM - 3:00 PM", item: "Keynote by Dr. Sudipan Saha, IIT Delhi" },
    {
      time: "3:00 PM - 4:00 PM",
      item:
        "Keynote by Shri Preet Yadav, Head India Innovation Ecosystem, NXP (Chairperson, IEEE CASS Delhi)",
    },
    {
      time: "4:00 PM - 5:00 PM",
      item: "Keynote by Prof. Prashant Johri, Galgotias University, U.P.",
    },
    { time: "5:00 PM - 5:30 PM", item: "High-Tea" },
    {
      time: "5:30 PM - 6:30 PM",
      item:
        "Tutorial by Shri Abhishek Agarwal, Amazon, US and Shri Praveen Gupta Sanka, Meta, US",
    },
    { time: "6:30 PM - 6:45 PM", item: "Tea Break" },
    { time: "6:45 PM - 7:45 PM", item: "Panel Discussion" },
    { time: "7:45 PM - 9:30 PM", item: "Gala Dinner" },
  ]

  const dayTwo = {
    date: "11th September, 2025 — 10:00 a.m. - 6:00 p.m. (IST)",
    tracks: [
      {
        name: "Track 1",
        slots: [
          { time: "10:30 AM - 10:45 AM", item: "Paper ID 15" },
          { time: "10:45 AM - 11:00 AM", item: "Paper ID 32" },
          { time: "11:00 AM - 11:15 AM", item: "Paper ID 43" },
          { time: "11:15 AM - 11:30 AM", item: "Paper ID 44" },
          { time: "11:30 AM - 11:45 AM", item: "Tea Break" },
          { time: "11:45 AM - 12:00 PM", item: "Paper ID 67" },
          { time: "12:00 PM - 12:15 PM", item: "Paper ID 74" },
          { time: "12:15 PM - 12:30 PM", item: "Paper ID 75" },
          { time: "12:30 PM - 12:45 PM", item: "Paper ID 87" },
          { time: "12:45 PM - 1:00 PM", item: "Paper ID 98" },
          { time: "1:00 PM - 2:00 PM", item: "Lunch" },
          { time: "2:00 PM - 2:15 PM", item: "Paper ID 108" },
          { time: "2:15 PM - 2:30 PM", item: "Paper ID 111" },
          { time: "2:30 PM - 2:45 PM", item: "Paper ID 112" },
          { time: "2:45 PM - 3:00 PM", item: "Paper ID 115" },
          { time: "3:00 PM - 3:15 PM", item: "Paper ID 116" },
          { time: "3:15 PM - 3:30 PM", item: "Paper ID 121" },
          { time: "3:30 PM - 3:45 PM", item: "Paper ID 128" },
          { time: "3:45 PM - 4:00 PM", item: "Paper ID 130" },
          { time: "4:15 PM - 4:30 PM", item: "Paper ID 585" },
          { time: "4:30 PM - 4:45 PM", item: "Paper ID 21" },
          { time: "4:45 PM - 5:00 PM", item: "Paper ID 29" },
          { time: "5:00 PM - 5:15 PM", item: "Paper ID 33" },
          { time: "5:15 PM - 5:30 PM", item: "Paper ID 42" },
          { time: "5:30 PM - 6:00 PM", item: "High-Tea" },
        ],
      },
      {
        name: "Track 2",
        slots: [
          { time: "10:30 AM - 10:45 AM", item: "Paper ID 133" },
          { time: "10:45 AM - 11:00 AM", item: "Paper ID 205" },
          { time: "11:00 AM - 11:15 AM", item: "Paper ID 211" },
          { time: "11:15 AM - 11:30 AM", item: "Paper ID 233" },
          { time: "11:30 AM - 11:45 AM", item: "Tea Break" },
          { time: "11:45 AM - 12:00 PM", item: "Paper ID 275" },
          { time: "12:00 PM - 12:15 PM", item: "Paper ID 280" },
          { time: "12:15 PM - 12:30 PM", item: "Paper ID 281" },
          { time: "12:30 PM - 12:45 PM", item: "Paper ID 298" },
          { time: "12:45 PM - 1:00 PM", item: "Paper ID 301" },
          { time: "1:00 PM - 2:00 PM", item: "Lunch" },
          { time: "2:00 PM - 2:15 PM", item: "Paper ID 309" },
          { time: "2:15 PM - 2:30 PM", item: "Paper ID 319" },
          { time: "2:30 PM - 2:45 PM", item: "Paper ID 322" },
          { time: "2:45 PM - 3:00 PM", item: "Paper ID 328" },
          { time: "3:00 PM - 3:15 PM", item: "Paper ID 332" },
          { time: "3:15 PM - 3:30 PM", item: "Paper ID 338" },
          { time: "3:30 PM - 3:45 PM", item: "Paper ID 340" },
          { time: "3:45 PM - 4:00 PM", item: "Paper ID 343" },
          { time: "4:15 PM - 4:30 PM", item: "Paper ID 103" },
          { time: "4:30 PM - 4:45 PM", item: "Paper ID 353" },
          { time: "4:45 PM - 5:00 PM", item: "Paper ID 521" },
          { time: "5:00 PM - 5:15 PM", item: "Paper ID 522" },
          { time: "5:15 PM - 5:30 PM", item: "Paper ID 671" },
          { time: "5:30 PM - 6:00 PM", item: "High-Tea" },
        ],
      },
    ],
  }

  const dayThree = {
    date: "12th September, 2025",
    tracks: [
      {
        name: "Track 3",
        slots: [
          { time: "10:00 AM - 10:15 AM", item: "Paper ID 358" },
          { time: "10:15 AM - 10:30 AM", item: "Paper ID 385" },
          { time: "10:30 AM - 10:45 AM", item: "Paper ID 400" },
          { time: "10:45 AM - 11:00 AM", item: "Paper ID 415" },
          { time: "11:00 AM - 11:15 AM", item: "Paper ID 419" },
          { time: "11:15 AM - 11:30 AM", item: "Paper ID 420" },
          { time: "11:30 AM - 11:45 AM", item: "Tea Break" },
          { time: "11:45 AM - 12:00 PM", item: "Paper ID 437" },
          { time: "12:00 PM - 12:15 PM", item: "Paper ID 475" },
          { time: "12:15 PM - 12:30 PM", item: "Paper ID 501" },
          { time: "12:30 PM - 1:00 PM", item: "Valedictory" },
          { time: "1:00 PM onwards", item: "Lunch" },
        ],
      },
      {
        name: "Track 4",
        slots: [
          { time: "10:00 AM - 10:15 AM", item: "Paper ID 559" },
          { time: "10:15 AM - 10:30 AM", item: "Paper ID 563" },
          { time: "10:30 AM - 10:45 AM", item: "Paper ID 572" },
          { time: "10:45 AM - 11:00 AM", item: "Paper ID 577" },
          { time: "11:00 AM - 11:15 AM", item: "Paper ID 579" },
          { time: "11:15 AM - 11:30 AM", item: "Paper ID 587" },
          { time: "11:30 AM - 11:45 AM", item: "Tea Break" },
          { time: "11:45 AM - 12:00 PM", item: "Paper ID 589" },
          { time: "12:00 PM - 12:15 PM", item: "Paper ID 596" },
          { time: "12:15 PM - 12:30 PM", item: "Paper ID 604" },
          { time: "12:30 PM - 1:00 PM", item: "Valedictory" },
          { time: "1:00 PM onwards", item: "Lunch" },
        ],
      },
      {
        name: "Track 5",
        slots: [
          { time: "10:00 AM - 10:15 AM", item: "Paper ID 650" },
          { time: "10:15 AM - 10:30 AM", item: "Paper ID 656" },
          { time: "10:30 AM - 10:45 AM", item: "Paper ID 657" },
          { time: "10:45 AM - 11:00 AM", item: "Paper ID 665" },
          { time: "11:00 AM - 11:15 AM", item: "Paper ID 667" },
          // PDF shows a Tea Break at 11:30 - 11:45 (no slot between 11:15-11:30 in PDF)
          { time: "11:30 AM - 11:45 AM", item: "Tea Break" },
          { time: "12:30 PM - 1:00 PM", item: "Valedictory" },
          { time: "1:00 PM onwards", item: "Lunch" },
        ],
      },
    ],
  }

  return (
    <main>
      <Header />
      <AttendHero />
      <section className="py-16 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div
            className={`max-w-6xl mx-auto transition-all duration-1000 transform ${
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <Calendar className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Conference Agenda</h2>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-primary/10">
              {/* Day 1 — Full details */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">10th September, 2025</h3>
                </div>

                <ul className="divide-y divide-gray-100">
                  {dayOne.map((s, idx) => (
                    <li key={`d1-${idx}`} className="py-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="text-sm text-gray-600 w-44">{s.time}</div>
                        <div className="text-gray-800">{s.item}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day 2 — Tracks 1 & 2 (all paper IDs shown) */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-3">{dayTwo.date}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {dayTwo.tracks.map((track, tIdx) => (
                    <div key={`d2t-${tIdx}`} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{track.name}</h4>
                      <ul className="text-sm space-y-1">
                        {track.slots.map((slot, sIdx) => (
                          <li key={`d2t${tIdx}-${sIdx}`} className="flex justify-between">
                            <span className="text-gray-600 w-36">{slot.time}</span>
                            <span className="text-gray-800">{slot.item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 3 — Tracks 3,4,5 (all paper IDs shown) */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">{dayThree.date}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {dayThree.tracks.map((track, tIdx) => (
                    <div key={`d3t-${tIdx}`} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{track.name}</h4>
                      <ul className="text-sm space-y-1">
                        {track.slots.map((slot, sIdx) => (
                          <li key={`d3t${tIdx}-${sIdx}`} className="flex justify-between">
                            <span className="text-gray-600 w-36">{slot.time}</span>
                            <span className="text-gray-800">{slot.item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                Venue: Centurion University of Technology and Management, Bhubaneswar — resgenxai.co.in
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
