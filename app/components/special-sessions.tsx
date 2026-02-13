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

export default function SpecialSessions() {
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
            IEEE Conference Record #64788
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Special Session: Explainable and Scalable AI Models for Real-Time Decision-Making in Distributed IoT Ecosystems</h1>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            This special session aims to explore cutting-edge innovations and practical applications at the intersection of these transformative technologies. IoT facilitates seamless data collection and connectivity among devices, while AI leverages this data for intelligent decision-making and automation. XAI ensures transparency, trust, and accountability in AI-driven systems—an increasingly critical requirement across sectors. The session welcomes original research, case studies, and visionary perspectives on the integration of IoT, AI, and XAI in various domains. 
          </p>
        </div>

        {/* Organizers and Submission Details */}
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-8 relative z-10">
          {/* Organizers Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-blue-400 mr-3"></div>
              Session Organizers
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-white">Dr. Amrutanshu Panigrahi</h3>
                <p className="text-blue-100">Assistant Professor, Department of CSE</p>
                <p className="text-blue-100">SoA University, Bhubaneswar, India</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-white">Dr. Abhilash Pati</h3>
                <p className="text-blue-100">Assistant Professor, Department of CSE</p>
                <p className="text-blue-100">SoA University, Bhubaneswar, India</p>
                <p className="text-blue-200 text-sm">Email: abhilashpati@soa.ac.in</p>
              </div>
            </div>
          </div>

          {/* Paper Submission Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-blue-400 mr-3"></div>
              Paper Submission
            </h2>
            <div className="space-y-4 text-blue-100">
              <p>
                The manuscript template can be found at{' '}
                <a href="https://www.resgenxai.co.in/authorguidelines" className="text-blue-300 hover:text-blue-200 underline transition-colors">
                  resgenxai.co.in/authorguidelines
                </a>
              </p>
              <p>
                All manuscripts were renamed as:{' '}
                <span className="font-mono bg-white/20 px-2 py-1 rounded text-white">
                  ResGenXAI_2025_ManuscriptShortTitle_SS01
                </span>
              </p>
              <p>
                Submissions were managed through Microsoft CMT. The conference proceedings are now published on{' '}
                <a href="https://ieeexplore.ieee.org/xpl/conhome/11343984/proceeding" className="text-blue-300 hover:text-blue-200 underline transition-colors">
                  IEEE Xplore
                </a>
              </p>
              <p>
                Registration details:{' '}
                <a href="https://www.resgenxai.co.in/" className="text-blue-300 hover:text-blue-200 underline transition-colors">
                  resgenxai.co.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        {/* Wave content if needed */}
      </div>
    </section>
  )
}
