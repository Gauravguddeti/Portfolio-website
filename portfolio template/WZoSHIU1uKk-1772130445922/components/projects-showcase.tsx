"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Code2, Sparkles } from "lucide-react"

const projects = [
  {
    title: "RateMyProf India",
    description: "Full-stack professor rating platform with 1000+ users. Features immersive 3D WebGL landing page, secure anonymous reviews with JWT auth, and real-time search with auto-suggestions.",
    tags: ["Next.js 14", "React Three Fiber", "FastAPI", "PostgreSQL", "TypeScript"],
    live: "https://ratemyprof.me",
    github: null,
    gradient: "from-blue-600 to-cyan-600",
    featured: true,
  },
  {
    title: "RelayX",
    description: "AI-powered voice automation platform for inbound/outbound calls. Integrated RAG and LangGraph for context-aware conversations with optimized STT/TTS pipelines.",
    tags: ["Python", "FastAPI", "LangGraph", "RAG", "Docker"],
    live: null,
    github: "https://github.com/Gauravguddeti/relayX",
    gradient: "from-purple-600 to-pink-600",
    featured: true,
  },
  {
    title: "SmartJeb",
    description: "AI-powered expense tracker with intelligent financial insights. Modern, secure financial companion built with cutting-edge tech stack.",
    tags: ["Node.js", "Supabase", "Tailwind CSS", "AI"],
    live: "https://smartjeb.vercel.app",
    github: "https://github.com/Gauravguddeti/SmartJeb",
    gradient: "from-green-600 to-emerald-600",
    featured: false,
  },
  {
    title: "Crop Disease Analyzer",
    description: "AI-based crop disease detection using advanced image analysis. Helping farmers identify and treat crop diseases early.",
    tags: ["React.js", "Material UI", "AI Models", "Computer Vision"],
    live: "https://cropdiseaseanalyzer.vercel.app",
    github: "https://github.com/Gauravguddeti/CropDiseaseDetector",
    gradient: "from-yellow-600 to-orange-600",
    featured: false,
  },
  {
    title: "Jarvis AI",
    description: "Advanced AI assistant for content generation, image creation, search, and automation. Powered by cutting-edge LLMs and Stable Diffusion.",
    tags: ["Python", "PyTorch", "Transformers", "Stable Diffusion", "Mistral 7B"],
    live: null,
    github: "https://github.com/Gauravguddeti/jarvis",
    gradient: "from-red-600 to-rose-600",
    featured: false,
  },
  {
    title: "Smart Traffic Signal System",
    description: "Dynamic traffic signal optimization using YOLOv8 for real-time vehicle detection and analysis.",
    tags: ["Python", "YOLOv8", "OpenCV", "Computer Vision"],
    live: null,
    github: "https://github.com/Gauravguddeti/smart-traffic-signal",
    gradient: "from-indigo-600 to-blue-600",
    featured: false,
  },
]

export default function ProjectsShowcase() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="relative py-24 bg-gray-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building the future with AI, Full-Stack Development, and Innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all hover:scale-105 hover:shadow-2xl">
                {project.featured && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    FEATURED
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${project.gradient}`}>
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Github className="w-5 h-5 text-gray-400" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-lg text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover effect gradient border */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-20 blur-xl -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
