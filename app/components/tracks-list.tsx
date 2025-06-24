"use client"

import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { User, Cpu, ImageIcon as Image, AudioWaveformIcon as Waveform} from "lucide-react"

export default function TracksList() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeTrack, setActiveTrack] = useState("human-centered")

  const tracks = [
    {
      id: "human-centered",
      title: "Track 1: Human-Centered AI",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      topics: [
        "Human-in-the-Loop",
        "Human Computer Interaction",
        "Collaborative Intelligence",
        "AI Augmentation",
        "User-centric AI",
        "Trust-based Systems",
        "Context-aware Intelligence",
        "Privacy and Security Considerations",
        "Ethical Applications of AI",
        "User Control in Smart Environments",
      ],
    },
    {
      id: "iot-ai",
      title: "Track 2: Internet of Things (IoT) and AI",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      topics: [
        "Artificial Intelligence of Things (AIoT)",
        "Edge AI",
        "Embedded AI",
        "Federated Learning in IoT",
        "Explainable AI for IoT",
        "Secure AI-enabled IoT",
        "Cyber-physical Systems",
        "Adaptive IoT Systems",
        "Responsible AI in Connected Systems",
        "Smart and Autonomous Systems",
      ],
    },
    {
      id: "image-processing",
      title: "Track 3: Image Processing and AI",
      icon: Image,
      color: "from-green-500 to-teal-500",
      topics: [
        "Image Recognition",
        "Computer Vision",
        "Semantic Segmentation",
        "Object Detection and Tracking",
        "Scene Understanding and Bias Detection",
        "Multimodal Vision Systems",
        "Explainable Computer Vision",
        "Trustworthy / Privacy-preserving Visual AI",
        "Responsible Annotation and Labeling",
        "Generative Vision Models",
      ],
    },
    {
      id: "signal-processing",
      title: "Track 4: Signal Processing and AI",
      icon: Waveform,
      color: "from-orange-500 to-red-500",
      topics: [
        "Signal Analysis",
        "Time-series Data",
        "Filtering and Denoising",
        "Multimodal Signal Fusion",
        "Spectral Analysis / Real-time Signal Processing",
        "Emotion-aware Audio/Physiological Analysis",
        "Generative Models for Signal Reconstruction",
        "Interpretability in EEG/ECG Analysis",
        "Ethical Processing of Biosignals",
        "Responsible and Explainable Signal AI",
      ],
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute -top-20 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-20 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>

      {/* Odisha art-inspired pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-primary font-medium tracking-wider">RESEARCH TRACKS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">Conference Tracks</h2>
          <p className="text-gray-600">
            ResGenXAI 2025 features four specialized tracks covering the latest advancements in AI research
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 transform ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Track tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTrack === track.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <track.icon className="w-5 h-5" />
                <span className="hidden md:inline">{track.title.split(":")[0]}</span>
                <span className="md:hidden">{`Track ${track.title.split(":")[0].split(" ")[1]}`}</span>
              </button>
            ))}
          </div>

          {/* Active track content */}
          {tracks.map((track) => (
            <div
              key={track.id}
              className={`transition-all duration-500 ${activeTrack === track.id ? "block" : "hidden"}`}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className={`bg-gradient-to-r ${track.color} h-2`}></div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${track.color} flex items-center justify-center text-white`}
                    >
                      <track.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{track.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {track.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                      >
                        <p className="text-gray-800">{topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
