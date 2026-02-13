"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Client-only component for animations
function NeuralNetworkAnimation() {
  const [mounted, setMounted] = useState(false)
  const [nodes, setNodes] = useState<Array<{top: number; left: number; animationDuration: number}>>([])
  const [connections, setConnections] = useState<Array<{startX: number; startY: number; width: number; angle: number; animationDuration: number}>>([])

  useEffect(() => {
    setMounted(true)
    
    // Generate neural network nodes
    const newNodes = Array(15).fill(0).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2
    }))
    
    // Generate neural connections
    const newConnections = Array(20).fill(0).map(() => {
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const endX = startX + (Math.random() * 20 - 10)
      const endY = startY + (Math.random() * 20 - 10)
      
      return {
        startX,
        startY,
        width: Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)),
        angle: Math.atan2(endY - startY, endX - startX) * (180 / Math.PI),
        animationDuration: Math.random() * 4 + 3
      }
    })
    
    setNodes(newNodes)
    setConnections(newConnections)
  }, [])

  // Don't render anything during SSR
  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Neural network nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
          style={{
            top: `${node.top}%`,
            left: `${node.left}%`,
            boxShadow: "0 0 20px 5px rgba(96, 165, 250, 0.5)",
            animationDuration: `${node.animationDuration}s`,
          }}
        ></div>
      ))}
      
      {/* Neural connections */}
      {connections.map((connection, i) => (
        <div
          key={i + 15}
          className="absolute bg-gradient-to-r from-blue-400/30 to-transparent h-px animate-pulse"
          style={{
            top: `${connection.startY}%`,
            left: `${connection.startX}%`,
            width: `${connection.width}%`,
            transform: `rotate(${connection.angle}deg)`,
            transformOrigin: "left center",
            animationDuration: `${connection.animationDuration}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

export default function CallForPapersHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/grid-AI.webp')] bg-repeat opacity-5"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70"></div>

      {/* Client-only neural network animation */}
      <NeuralNetworkAnimation />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium tracking-wider text-sm mb-6">
            IEEE Conference Record #64788 - Conference Concluded
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Call for Papers (Archived)</h1>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            The International Conference on Responsible, Generative and Explainable AI (ResGenXAI-2025) successfully received
            671 submissions from 8 countries, with 67 high-quality papers published in IEEE Xplore.
          </p>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        {/* Wave content if needed */}
      </div>
    </section>
  )
}