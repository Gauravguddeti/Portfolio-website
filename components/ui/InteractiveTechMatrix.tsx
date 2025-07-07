'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TechNode {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'cloud' | 'tools'
  icon: string
  color: string
  level: number // 1-5 proficiency level
  x: number
  y: number
  z: number // depth for 3D effect
}

const techStack: TechNode[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', icon: '⚛️', color: '#61DAFB', level: 5, x: 20, y: 20, z: 1 },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', icon: '▲', color: '#000000', level: 4, x: 40, y: 15, z: 2 },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', icon: 'TS', color: '#3178C6', level: 4, x: 60, y: 25, z: 1 },
  { id: 'tailwind', name: 'Tailwind', category: 'frontend', icon: '🎨', color: '#06B6D4', level: 5, x: 80, y: 20, z: 2 },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', icon: '🟢', color: '#339933', level: 4, x: 15, y: 50, z: 3 },
  { id: 'python', name: 'Python', category: 'backend', icon: '🐍', color: '#3776AB', level: 5, x: 35, y: 45, z: 1 },
  { id: 'mongodb', name: 'MongoDB', category: 'backend', icon: '🍃', color: '#47A248', level: 4, x: 65, y: 55, z: 2 },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', icon: '🐘', color: '#336791', level: 3, x: 85, y: 50, z: 3 },
  
  // AI/ML
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai', icon: '🧠', color: '#FF6F00', level: 4, x: 25, y: 75, z: 2 },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', icon: '🔥', color: '#EE4C2C', level: 3, x: 45, y: 80, z: 1 },
  { id: 'opencv', name: 'OpenCV', category: 'ai', icon: '👁️', color: '#5C3EE8', level: 3, x: 70, y: 75, z: 3 },
  
  // Cloud
  { id: 'aws', name: 'AWS', category: 'cloud', icon: '☁️', color: '#FF9900', level: 3, x: 10, y: 85, z: 2 },
  { id: 'docker', name: 'Docker', category: 'cloud', icon: '🐳', color: '#2496ED', level: 4, x: 90, y: 80, z: 1 },
  
  // Tools
  { id: 'git', name: 'Git', category: 'tools', icon: '🔧', color: '#F05032', level: 5, x: 50, y: 90, z: 2 },
]

const categoryColors = {
  frontend: '#61DAFB',
  backend: '#339933', 
  ai: '#FF6F00',
  cloud: '#FF9900',
  tools: '#F05032'
}

export const InteractiveTechMatrix = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{id: string, x: number, y: number, vx: number, vy: number}>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Create floating particles
    if (hoveredNode) {
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: `${hoveredNode}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [hoveredNode])

  const getNodeStyle = (node: TechNode) => {
    const isSelected = selectedCategory === node.category || selectedCategory === null
    const isHovered = hoveredNode === node.id
    const depth = node.z
    
    return {
      left: `${node.x}%`,
      top: `${node.y}%`,
      transform: `translate(-50%, -50%) translateZ(${depth * 20}px) scale(${isHovered ? 1.3 : isSelected ? 1 : 0.7})`,
      zIndex: depth * 10 + (isHovered ? 100 : 0),
      opacity: isSelected ? 1 : 0.4,
      filter: isHovered ? `drop-shadow(0 0 20px ${node.color})` : 'none'
    }
  }

  const categories = Array.from(new Set(techStack.map(node => node.category)))

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-4">
          Interactive Tech Matrix
        </h3>
        <p className="text-gray-400 mb-6">
          Explore my technical universe - hover, click, and discover
        </p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === null 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                selectedCategory === category 
                  ? 'text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: selectedCategory === category ? categoryColors[category as keyof typeof categoryColors] : undefined
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-[600px] bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 rounded-3xl border border-primary-400/20 overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="techGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#gridGradient)" strokeWidth="1"/>
              </pattern>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#techGrid)" />
          </svg>
        </div>

        {/* Mouse Follower Effect */}
        <div 
          className="absolute w-32 h-32 rounded-full pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
          }}
        />

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {techStack.map(node => {
            const relatedNodes = techStack.filter(other => 
              other.category === node.category && other.id !== node.id
            )
            
            return relatedNodes.map(related => {
              const isVisible = (selectedCategory === null || selectedCategory === node.category) &&
                              (hoveredNode === node.id || hoveredNode === related.id)
              
              return (
                <motion.line
                  key={`${node.id}-${related.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${related.x}%`}
                  y2={`${related.y}%`}
                  stroke={categoryColors[node.category as keyof typeof categoryColors]}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity={isVisible ? 0.6 : 0}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              )
            })
          })}
        </svg>

        {/* Floating Particles */}
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-primary-400 rounded-full pointer-events-none"
              initial={{ 
                left: `${particle.x}%`, 
                top: `${particle.y}%`,
                opacity: 0 
              }}
              animate={{
                left: `${particle.x + particle.vx * 20}%`,
                top: `${particle.y + particle.vy * 20}%`,
                opacity: [0, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Tech Nodes */}
        {techStack.map(node => (
          <motion.div
            key={node.id}
            className="absolute cursor-pointer"
            style={getNodeStyle(node)}
            animate={getNodeStyle(node)}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
          >
            <div 
              className="relative w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center text-white font-bold backdrop-blur-sm"
              style={{ 
                backgroundColor: hoveredNode === node.id ? `${node.color}20` : 'rgba(30, 41, 59, 0.8)',
                borderColor: node.color,
                boxShadow: hoveredNode === node.id ? `0 0 30px ${node.color}50` : '0 0 10px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-xl mb-1">{node.icon}</div>
              
              {/* Skill Level Indicator */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: i < node.level ? node.color : 'rgba(255,255,255,0.2)'
                    }}
                  />
                ))}
              </div>

              {/* Pulsing Ring */}
              {hoveredNode === node.id && (
                <motion.div
                  className="absolute -inset-2 rounded-2xl border-2"
                  style={{ borderColor: node.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0.3, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>

            {/* Enhanced Tooltip */}
            <AnimatePresence>
              {hoveredNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-dark-900/95 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap border backdrop-blur-sm z-50"
                  style={{
                    borderColor: node.color,
                    boxShadow: `0 4px 20px ${node.color}30`
                  }}
                >
                  <div className="font-bold text-center">{node.name}</div>
                  <div className="text-xs text-gray-400 text-center capitalize">{node.category}</div>
                  <div className="text-xs text-center mt-1" style={{ color: node.color }}>
                    {'★'.repeat(node.level)} Level {node.level}
                  </div>
                  
                  {/* Arrow */}
                  <div 
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45"
                    style={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      borderTop: `1px solid ${node.color}`,
                      borderLeft: `1px solid ${node.color}`
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Holographic Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scanning Line */}
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-30"
            animate={{
              y: ['-10%', '110%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Corner Hologram Effects */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-8 h-8 border-primary-400 ${
                i === 0 ? 'top-4 left-4 border-t-2 border-l-2' :
                i === 1 ? 'top-4 right-4 border-t-2 border-r-2' :
                i === 2 ? 'bottom-4 left-4 border-b-2 border-l-2' :
                'bottom-4 right-4 border-b-2 border-r-2'
              }`}
              animate={{
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
