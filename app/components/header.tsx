"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Call for Papers", href: "/call-for-papers" },
    { name: "Special Sessions", href: "/special-sessions" },
    {
      name: "Guidelines",
      href: "#",
      submenu: [
        { name: "Author Guidelines", href: "/authorguidelines" },
        { name: "Reviewer Guidelines", href: "/reviewerguidelines" },
      ],
    },
    { name: "Attend", href: "#",
      submenu: [
        { name: "Agenda", href: "/agenda" },
        { name: "Code of Conduct", href: "/attend" },
      ], },
    { name: "Committees", href: "/committees" },
    { name: "Registration", href: "/registration" },
    { name: "Sight Seeing", href: "/sight-seeing" },
  ]

  return (
    <>
      <div className="h-36"></div>
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center border-b border-primary/20 pb-2 mb-2">
            <div className="flex items-center">
              <div className="relative h-14 w-44">
                <Image src="/lg.png" alt="Conference Logos" fill className="object-contain" priority />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-[50px] w-[100px] ">
                <Image 
                  src="/ie.png" 
                  alt="IEEE Logo" 
                  fill 
                  className="object-full" 
                  priority 
                />
              </div>
              <div className="text-right">
                <h1 className="text-sm md:text-base font-bold text-primary">ResGenXAI 2025</h1>
                <p className="text-xs text-gray-600">IEEE Conference #64788</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-12 md:w-32 md:h-10">
                <Image
                  src="/rs.png"
                  alt="ResGenXAI Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden md:block">
                <h2 className="text-sm md:text-base font-bold text-gray-900">
                  International Conference on Responsible, Generative and Explainable AI
                </h2>
              </div>
            </div>

            <nav
              className={`
              fixed md:relative top-0 right-0 h-screen md:h-auto w-full md:w-auto
              bg-white md:bg-transparent transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
              md:flex md:items-center md:space-x-1
            `}
            >
              <button className="md:hidden absolute top-6 right-6 text-gray-800" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col md:flex-row items-center justify-center h-full md:h-auto space-y-8 md:space-y-0 md:space-x-1">
                {menuItems.map((item, index) => (
                  <div key={index} className="relative group">
                    {item.submenu ? (
                      <>
                        <button className="text-gray-800 hover:text-primary transition-colors duration-300 text-sm md:text-base whitespace-nowrap px-3 py-2 rounded-md hover:bg-primary/10 group-hover:text-primary group-hover:bg-primary/10">
                          {item.name}
                        </button>
                        <div className="absolute left-0 mt-0 pt-2 w-48 hidden group-hover:block z-50">
                          <div className="bg-white shadow-lg rounded-md overflow-hidden">
                            {item.submenu.map((subitem, subindex) => (
                              <Link
                                key={subindex}
                                href={subitem.href}
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary/10 hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subitem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-800 hover:text-primary transition-colors duration-300 text-sm md:text-base whitespace-nowrap px-3 py-2 rounded-md hover:bg-primary/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 md:ml-2">
                  <Link href="https://ieeexplore.ieee.org/xpl/conhome/11343984/proceeding">
                    <Button className="bg-primary hover:bg-primary-600 text-white">View Proceedings</Button>
                  </Link>
                  <Link href="/registration">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Interest Form
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>

            <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}