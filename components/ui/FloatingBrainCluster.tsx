'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HoverTooltip, jokes } from '@/components/ui/HoverTooltip'

const techNodes = [
  { id: 'python', label: 'Python', x: 20, y: 25, color: '#3776ab', connections: ['tensorflow', 'pytorch'], icon: '🐍' },
  { id: 'javascript', label: 'JavaScript', x: 80, y: 25, color: '#f7df1e', connections: ['react', 'nodejs'], icon: '⚡' },
  { id: 'react', label: 'React', x: 15, y: 55, color: '#61dafb', connections: ['nextjs', 'javascript'], icon: '⚛️' },
  { id: 'nodejs', label: 'Node.js', x: 85, y: 55, color: '#339933', connections: ['javascript', 'mongodb'], icon: '🟢' },
  { id: 'tensorflow', label: 'TensorFlow', x: 25, y: 80, color: '#ff6f00', connections: ['python'], icon: '🧠' },
  { id: 'pytorch', label: 'PyTorch', x: 35, y: 15, color: '#ee4c2c', connections: ['python'], icon: '🔥' },
  { id: 'mongodb', label: 'MongoDB', x: 75, y: 80, color: '#47a248', connections: ['nodejs'], icon: '🍃' },
  { id: 'nextjs', label: 'Next.js', x: 15, y: 85, color: '#000000', connections: ['react'], icon: '▲' },
  { id: 'docker', label: 'Docker', x: 70, y: 45, color: '#2496ed', connections: ['kubernetes'], icon: '🐳' },
  { id: 'kubernetes', label: 'K8s', x: 85, y: 75, color: '#326ce5', connections: ['docker'], icon: '☸️' },
  { id: 'aws', label: 'AWS', x: 65, y: 15, color: '#ff9900', connections: [], icon: '☁️' },
  { id: 'git', label: 'Git', x: 30, y: 45, color: '#f05032', connections: [], icon: '🔧' }
]

export const FloatingBrainCluster = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
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

  const getNodePosition = (node: typeof techNodes[0]) => {
    // Add subtle mouse-following effect
    const mouseInfluence = 0.02
    const adjustedX = node.x + (mousePos.x - node.x) * mouseInfluence
    const adjustedY = node.y + (mousePos.y - node.y) * mouseInfluence
    
    return { x: adjustedX, y: adjustedY }
  }

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Neural Tech Network</h3>
        <p className="text-gray-400">My brain, but with better documentation</p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-[700px] bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-2xl border border-primary-400/20 overflow-hidden"
      >
        {/* Animated Background Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0ea5e9" strokeWidth="1"/>
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Neural Network Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.circle
            cx="50%" 
            cy="50%" 
            r="100"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeDasharray="5,5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            filter="url(#glow)"
          />
          <motion.circle
            cx="50%" 
            cy="50%" 
            r="150"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1"
            strokeDasharray="10,10"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            filter="url(#glow)"
          />
        </svg>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {techNodes.map(node => 
            node.connections.map(connId => {
              const connNode = techNodes.find(n => n.id === connId)
              if (!connNode) return null
              
              const pos1 = getNodePosition(node)
              const pos2 = getNodePosition(connNode)
              
              // Calculate control points for curved lines
              const midX = (pos1.x + pos2.x) / 2
              const midY = (pos1.y + pos2.y) / 2
              const offsetX = (pos2.y - pos1.y) * 0.2
              const offsetY = (pos1.x - pos2.x) * 0.2
              
              const pathData = `M ${pos1.x} ${pos1.y} Q ${midX + offsetX} ${midY + offsetY} ${pos2.x} ${pos2.y}`
              
              return (
                <g key={`${node.id}-${connId}`}>
                  <motion.path
                    d={pathData}
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    opacity={hoveredNode === node.id || hoveredNode === connId ? 0.9 : 0.3}
                    className="transition-all duration-300"
                    filter="url(#glow)"
                    strokeDasharray="5,5"
                    animate={{
                      strokeDashoffset: [0, -10]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Data pulse effect */}
                  {(hoveredNode === node.id || hoveredNode === connId) && (
                    <motion.circle
                      r="3"
                      fill="url(#pulseGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <animateMotion dur="1.5s" repeatCount="indefinite">
                        <mpath xlinkHref={`#path-${node.id}-${connId}`} />
                      </animateMotion>
                    </motion.circle>
                  )}
                  
                  <path id={`path-${node.id}-${connId}`} d={pathData} opacity="0" />
                </g>
              )
            })
          )}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </radialGradient>
          </defs>
        </svg>

        {/* Tech Nodes */}
        {techNodes.map((node) => {
          const position = getNodePosition(node)
          
          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              animate={{
                y: [0, -5, 0],
                scale: hoveredNode === node.id ? 1.2 : 1,
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  delay: techNodes.indexOf(node) * 0.2,
                },
                scale: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              data-cursor="tech"
              title={`${node.label} - ${node.connections.length} connections`}
            >
              <div 
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-white font-bold text-lg relative overflow-hidden backdrop-blur-sm"
                style={{ 
                  backgroundColor: hoveredNode === node.id ? node.color : 'rgba(30, 41, 59, 0.8)',
                  borderColor: hoveredNode === node.id ? node.color : '#4b5563',
                  boxShadow: hoveredNode === node.id ? `0 0 30px ${node.color}50` : 'none'
                }}
              >
                <span className="text-2xl">{node.icon}</span>
                
                {/* Pulse effect on hover */}
                {hoveredNode === node.id && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: node.color }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0.2, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Data flow particles */}
                {hoveredNode === node.id && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: node.color }}
                        animate={{
                          x: [0, 20, -20, 0],
                          y: [0, -20, 20, 0],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
              
              {/* Enhanced Label */}
              {hoveredNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-dark-900/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-primary-400/50 backdrop-blur-sm"
                  style={{
                    boxShadow: `0 4px 20px ${node.color}30`
                  }}
                >
                  <div className="font-semibold">{node.label}</div>
                  <div className="text-xs text-gray-400">
                    {node.connections.length} connection{node.connections.length !== 1 ? 's' : ''}
                  </div>
                  {/* Arrow pointing up */}
                  <div 
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-t border-l border-primary-400/50"
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}
                  />
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Central Brain Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-primary-400 via-purple-500 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold relative overflow-hidden"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
              boxShadow: [
                "0 0 30px rgba(14, 165, 233, 0.5)",
                "0 0 50px rgba(139, 92, 246, 0.7)",
                "0 0 30px rgba(14, 165, 233, 0.5)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🧠
            
            {/* Neural activity animation */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Synaptic sparks */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 2) * 30],
                  y: [0, Math.sin(i * Math.PI / 2) * 30],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
