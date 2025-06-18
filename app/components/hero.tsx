"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"

// Separate client-only component for animations
function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    top: number;
    left: number;
    animationDuration: number;
    animationDelay: number;
  }>>([])
  const [neuralNodes, setNeuralNodes] = useState<Array<{
    top: number;
    left: number;
    animationDuration: number;
  }>>([])
  const [neuralConnections, setNeuralConnections] = useState<Array<{
    top: number;
    left: number;
    width: number;
    transform: string;
    animationDuration: number;
  }>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only run once when component mounts on client
    setMounted(true)
    
    // Generate random particles
    const newParticles = Array(20).fill(0).map(() => ({
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      animationDelay: Math.random() * 5
    }))
    
    // Generate random neural network nodes
    const newNodes = Array(10).fill(0).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2
    }))
    
    // Generate random neural connections
    const newConnections = Array(15).fill(0).map(() => {
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const endX = startX + (Math.random() * 20 - 10)
      const endY = startY + (Math.random() * 20 - 10)
      
      return {
        top: startY,
        left: startX,
        width: Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)),
        transform: `rotate(${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)}deg)`,
        animationDuration: Math.random() * 4 + 3
      }
    })
    
    setParticles(newParticles)
    setNeuralNodes(newNodes)
    setNeuralConnections(newConnections)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-temple-gold/20 animate-float"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.animationDelay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Neural network animation */}
      <div className="absolute inset-0 overflow-hidden">
        {neuralNodes.map((node, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-temple-gold rounded-full animate-pulse"
            style={{
              top: `${node.top}%`,
              left: `${node.left}%`,
              boxShadow: "0 0 20px 5px rgba(255, 193, 7, 0.5)",
              animationDuration: `${node.animationDuration}s`,
            }}
          ></div>
        ))}
        {neuralConnections.map((connection, i) => (
          <div
            key={i + 10}
            className="absolute bg-gradient-to-r from-temple-gold/30 to-transparent h-px animate-pulse"
            style={{
              top: `${connection.top}%`,
              left: `${connection.left}%`,
              width: `${connection.width}%`,
              transform: connection.transform,
              transformOrigin: "left center",
              animationDuration: `${connection.animationDuration}s`,
            }}
          ></div>
        ))}
      </div>
    </>
  )
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen -mt-32 pt-32 relative overflow-hidden bg-gradient-to-br from-primary-900 to-secondary-900">
      {/* Pattachitra-inspired pattern overlay */}
      <div className="absolute inset-0 odisha-pattern opacity-10"></div>

      <div className="absolute inset-0 bg-[url('/grid-AI.webp')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 to-secondary-900/70"></div>

      {/* Client-only animated background */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 pt-12 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`relative z-10 space-y-8 transition-all duration-1000 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium tracking-wider text-sm">IEEE Conference Record #64788</span>
            </div>
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium tracking-wider text-sm">HYBRID MODE</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
              <span className="block">2025 International Conference on</span>
              <span className="block text-temple-gold">Responsible, Generative</span>
              <span className="block">and Explainable AI</span>
            </h1>

            <p className="text-lg md:text-xl text-orange-100 leading-relaxed max-w-xl">
              Advancing AI with Responsibility, Creativity, and Transparency
              
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/call-for-papers">
                <Button
                  size="lg"
                  className="bg-white hover:bg-orange-50 text-primary px-8 rounded-full group transition-all duration-300"
                >
                  Call for Papers
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="https://conferences.ieee.org/conferences_events/conferences/conferencedetails/64788">
              <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/20 rounded-full">
                Learn More
              </Button>
              </Link>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Konark wheel inspired design */}
              <div className="absolute inset-0 border-4 border-temple-gold/30 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-4 border-temple-gold/40 rounded-full animate-spin-slow-reverse"></div>
              <div className="absolute inset-16 border-4 border-temple-gold/50 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-24 border-4 border-temple-gold/60 rounded-full animate-spin-slow-reverse"></div>

              {/* Spokes */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-temple-gold/30"
                  style={{
                    transformOrigin: "left center",
                    transform: `rotate(${i * 30}deg) translateY(-50%)`,
                  }}
                ></div>
              ))}

              <div className="relative h-full w-full flex items-center justify-center">
                <div className="w-1/2 h-1/2 relative bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <Image
                      src="/rs.png"
                      alt="AI Visualization"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 -right-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -left-1/4 w-72 h-72 bg-secondary-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
