"use client"

import { useInView } from "react-intersection-observer"
import { MapPin, Phone, Globe, Clock, Coffee, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VenueInfo() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-orange-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <MapPin className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Venue Information</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-6 rounded-xl shadow-md pattachitra-border my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Centurion University of Technology and Management
              </h3>
              <p className="text-gray-600">
                The conference was held at the state-of-the-art facilities of Centurion University of Technology and
                Management in Bhubaneswar, Odisha, India.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    Address
                  </h4>
                  <p className="text-gray-600">
                    Centurion University of Technology and Management
                    <br />
                    Jatni Campus, Bhubaneswar
                    <br />
                    Odisha, India - 752050
                  </p>

                  <h4 className="font-bold text-gray-900 mt-4 flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-2" />
                    Contact
                  </h4>
                  <p className="text-gray-600">
                    Phone: +91 7978029866
                    <br />
                    Email:{" "}
                    <a href="mailto:resgenxai2025@cutm.ac.in" className="text-primary hover:text-primary-700">
                      resgenxai2025@cutm.ac.in
                    </a>
                  </p>

                  <h4 className="font-bold text-gray-900 mt-4 flex items-center">
                    <Globe className="w-5 h-5 text-primary mr-2" />
                    Website
                  </h4>
                  <p className="text-gray-600">
                    <a
                      href="https://cutm.ac.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-700"
                    >
                      https://cutm.ac.in
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-2" />
                    Conference Details
                  </h4>
                  <p className="text-gray-600">
                    ResGenXAI 2025 was held September 10-12, 2025.
                  </p>

                  <h4 className="font-bold text-gray-900 mt-4 flex items-center">
                    <Coffee className="w-5 h-5 text-primary mr-2" />
                    Event Facilities
                  </h4>
                  <p className="text-gray-600">
                    Coffee breaks were provided in the morning and afternoon each day. Refreshments were available
                    throughout the conference.
                  </p>

                  <h4 className="font-bold text-gray-900 mt-4 flex items-center">
                    <Utensils className="w-5 h-5 text-primary mr-2" />
                    Meals
                  </h4>
                  <p className="text-gray-600">
                    Lunch was provided for all registered attendees. Vegetarian and non-vegetarian options were
                    available.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.995246582244!2d85.7036736760121!3d20.17592341652183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19aec948fe62ef%3A0xb6c968c7957b6b4f!2sCenturion%20University%20of%20Technology%20%26%20Management%2C%20Bhubaneswar%20(CUTM)!5e0!3m2!1sen!2sin!4v1747330577330!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button className="bg-primary hover:bg-primary-600 text-white">Download Venue Information</Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md pattachitra-border my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accommodation</h3>
              <p className="text-gray-600">
                Special rates were arranged at several hotels near the conference venue for ResGenXAI 2025 participants.
              </p>
              <p className="text-gray-600 mt-4">
                For any accommodation-related queries, please contact the conference secretariat at{" "}
                <a href="mailto:resgenxai2025@cutm.ac.in" className="text-primary hover:text-primary-700">
                  resgenxai2025@cutm.ac.in
                </a>
                .
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md pattachitra-border my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transportation</h3>
              <p className="text-gray-600">
                Bhubaneswar is well-connected by air, rail, and road. The Biju Patnaik International Airport (BBI) is
                approximately 20 km from the conference venue.
              </p>
              <p className="text-gray-600 mt-4">
                Shuttle services were provided from selected hotels to the conference venue for ResGenXAI 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
