import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Pattachitra-inspired pattern overlay */}
      <div className="absolute inset-0 odisha-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-[100px] h-[50px]">
                <Image src="/rs.png" alt="ResGenXAI Logo" fill className="object-full" />
              </div>
              <div>
                <h3 className="font-bold text-lg">ResGenXAI 2025</h3>
                <p className="text-sm text-gray-400">IEEE Conference #64788</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">International Conference on Responsible, Generative and Explainable AI</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/call-for-papers" className="text-gray-400 hover:text-primary transition-colors">
                  Call for Papers
                </Link>
              </li>
              <li>
                <Link href="/authorguidelines" className="text-gray-400 hover:text-primary transition-colors">
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link href="/reviewerguidelines" className="text-gray-400 hover:text-primary transition-colors">
                  Reviewer Guidelines
                </Link>
              </li>
              <li>
                <Link href="/attend" className="text-gray-400 hover:text-primary transition-colors">
                  Attend
                </Link>
              </li>
              <li>
                <Link href="/committees" className="text-gray-400 hover:text-primary transition-colors">
                  Committees
                </Link>
              </li>
              <li>
                <Link href="/sight-seeing" className="text-gray-400 hover:text-primary transition-colors">
                  Sight Seeing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">ResGenXAI 2025 Highlights</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="block text-temple-gold">671 Submissions</span>
                From 8 Countries
              </li>
              <li className="text-gray-400">
                <span className="block text-temple-gold">67 Papers</span>
                Published in IEEE Xplore
              </li>
              <li className="text-gray-400">
                <span className="block text-temple-gold">10% Acceptance</span>
                Maintaining High Standards
              </li>
              <li className="text-gray-400">
                <span className="block text-temple-gold">Conference Concluded</span>
                Successfully in 2025
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-temple-gold flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Centurion University of Technology and Management, Bhubaneswar, Odisha, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-temple-gold flex-shrink-0" />
                <a
                  href="mailto:saneev.das@cutm.ac.in"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  saneev.das@cutm.ac.in
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-temple-gold flex-shrink-0" />
                <a href="tel:+917978029866" className="text-gray-400 hover:text-primary transition-colors">
                  +91 7978029866
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 ResGenXAI. All rights reserved.</p>
          <p className="mt-2">
            Organized by Centurion University of Technology and Management in association with IEEE
          </p>
        </div>
      </div>
    </footer>
  )
}
