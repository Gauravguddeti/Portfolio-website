'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TechStar {
  id: string
  name: string
  symbol: string
  category: string
  color: string
  x: number
  y: number
  z: number
  radius: number
  originalX: number
  originalY: number
  originalZ: number
  constellation?: string
}

const techData: Omit<TechStar, 'x' | 'y' | 'z' | 'originalX' | 'originalY' | 'originalZ'>[] = [
  // Frontend Constellation
  { id: '1', name: 'React', symbol: 'Re', category: 'frontend', color: '#61DAFB', radius: 8, constellation: 'Frontend Galaxy' },
  { id: '2', name: 'Next.js', symbol: 'Nx', category: 'frontend', color: '#000000', radius: 7, constellation: 'Frontend Galaxy' },
  { id: '3', name: 'TypeScript', symbol: 'Ts', category: 'frontend', color: '#3178C6', radius: 6, constellation: 'Frontend Galaxy' },
  { id: '4', name: 'Tailwind CSS', symbol: 'Tw', category: 'frontend', color: '#06B6D4', radius: 5, constellation: 'Frontend Galaxy' },
  { id: '5', name: 'Framer Motion', symbol: 'Fm', category: 'frontend', color: '#FF0055', radius: 4, constellation: 'Frontend Galaxy' },
  
  // Backend Constellation
  { id: '6', name: 'Node.js', symbol: 'Nd', category: 'backend', color: '#339933', radius: 7, constellation: 'Backend Nebula' },
  { id: '7', name: 'Python', symbol: 'Py', category: 'backend', color: '#3776AB', radius: 8, constellation: 'Backend Nebula' },
  { id: '8', name: 'Express', symbol: 'Ex', category: 'backend', color: '#000000', radius: 5, constellation: 'Backend Nebula' },
  { id: '9', name: 'FastAPI', symbol: 'Fa', category: 'backend', color: '#009688', radius: 6, constellation: 'Backend Nebula' },
  
  // Database Constellation
  { id: '10', name: 'MongoDB', symbol: 'Mg', category: 'database', color: '#47A248', radius: 6, constellation: 'Data Cluster' },
  { id: '11', name: 'PostgreSQL', symbol: 'Pg', category: 'database', color: '#336791', radius: 6, constellation: 'Data Cluster' },
  { id: '12', name: 'Redis', symbol: 'Rd', category: 'database', color: '#DC382D', radius: 4, constellation: 'Data Cluster' },
  
  // AI/ML Constellation
  { id: '13', name: 'TensorFlow', symbol: 'Tf', category: 'ai', color: '#FF6F00', radius: 7, constellation: 'AI Cosmos' },
  { id: '14', name: 'PyTorch', symbol: 'Pt', category: 'ai', color: '#EE4C2C', radius: 7, constellation: 'AI Cosmos' },
  { id: '15', name: 'OpenAI', symbol: 'Ai', category: 'ai', color: '#412991', radius: 8, constellation: 'AI Cosmos' },
  { id: '16', name: 'Langchain', symbol: 'Lc', category: 'ai', color: '#1C3C3C', radius: 5, constellation: 'AI Cosmos' },
  
  // DevOps Constellation
  { id: '17', name: 'Docker', symbol: 'Dk', category: 'devops', color: '#2496ED', radius: 6, constellation: 'DevOps Void' },
  { id: '18', name: 'Git', symbol: 'Gt', category: 'devops', color: '#F05032', radius: 5, constellation: 'DevOps Void' },
  { id: '19', name: 'AWS', symbol: 'Aw', category: 'devops', color: '#FF9900', radius: 7, constellation: 'DevOps Void' },
  { id: '20', name: 'Vercel', symbol: 'Vc', category: 'devops', color: '#000000', radius: 4, constellation: 'DevOps Void' },
]

const constellations = [
  'All Stars',
  'Frontend Galaxy',
  'Backend Nebula', 
  'Data Cluster',
  'AI Cosmos',
  'DevOps Void'
]

export const InteractiveTechGalaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [selectedConstellation, setSelectedConstellation] = useState('All Stars')
  const [hoveredStar, setHoveredStar] = useState<TechStar | null>(null)
  const [stars, setStars] = useState<TechStar[]>([])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const targetRotationRef = useRef({ x: 0, y: 0 })

  // Initialize stars with 3D positions
  const initializeStars = useCallback(() => {
    const centerX = 300
    const centerY = 300
    const radius = 150
    
    const newStars: TechStar[] = techData.map((tech, index) => {
      const phi = Math.acos(-1 + (2 * index) / techData.length)
      const theta = Math.sqrt(techData.length * Math.PI) * phi
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      
      return {
        ...tech,
        x: centerX + x,
        y: centerY + y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
      }
    })
    
    setStars(newStars)
  }, [])

  // Mouse interaction handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current.isDown = true
    mouseRef.current.x = e.clientX
    mouseRef.current.y = e.clientY
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mouseRef.current.isDown) {
      const deltaX = e.clientX - mouseRef.current.x
      const deltaY = e.clientY - mouseRef.current.y
      
      targetRotationRef.current.x += deltaY * 0.01
      targetRotationRef.current.y += deltaX * 0.01
      
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    } else {
      // Check for hover
      const canvas = canvasRef.current
      if (!canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const hoveredStar = stars.find(star => {
        const distance = Math.sqrt((star.x - x) ** 2 + (star.y - y) ** 2)
        return distance <= star.radius + 10
      })
      
      setHoveredStar(hoveredStar || null)
    }
  }, [stars])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  // Auto-rotation when not interacting
  useEffect(() => {
    let lastInteraction = Date.now()
    
    const autoRotate = () => {
      if (Date.now() - lastInteraction > 3000 && !mouseRef.current.isDown) {
        targetRotationRef.current.y += 0.005
      }
    }

    const interval = setInterval(autoRotate, 16)
    
    const updateLastInteraction = () => {
      lastInteraction = Date.now()
    }
    
    window.addEventListener('mousemove', updateLastInteraction)
    window.addEventListener('touchstart', updateLastInteraction)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', updateLastInteraction)
      window.removeEventListener('touchstart', updateLastInteraction)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Smooth rotation interpolation
      rotation.x += (targetRotationRef.current.x - rotation.x) * 0.1
      rotation.y += (targetRotationRef.current.y - rotation.y) * 0.1

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connecting lines between stars in same constellation
      if (selectedConstellation !== 'All Stars') {
        const constellationStars = stars.filter(star => 
          star.constellation === selectedConstellation
        )
        
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)'
        ctx.lineWidth = 1
        
        for (let i = 0; i < constellationStars.length; i++) {
          for (let j = i + 1; j < constellationStars.length; j++) {
            const star1 = constellationStars[i]
            const star2 = constellationStars[j]
            
            ctx.beginPath()
            ctx.moveTo(star1.x, star1.y)
            ctx.lineTo(star2.x, star2.y)
            ctx.stroke()
          }
        }
      }

      // Update and draw stars
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      const updatedStars = stars.map(star => {
        // Apply rotation
        const cosX = Math.cos(rotation.x)
        const sinX = Math.sin(rotation.x)
        const cosY = Math.cos(rotation.y)
        const sinY = Math.sin(rotation.y)
        
        const x = star.originalX
        const y = star.originalY * cosX - star.originalZ * sinX
        const z = star.originalY * sinX + star.originalZ * cosX
        
        const finalX = x * cosY + z * sinY
        const finalY = y
        const finalZ = -x * sinY + z * cosY
        
        const projectedX = centerX + finalX
        const projectedY = centerY + finalY
        
        // Calculate size based on z-depth
        const perspective = 300 / (300 + finalZ)
        const size = star.radius * perspective
        const opacity = Math.max(0.3, perspective)
        
        // Filter by constellation
        const isVisible = selectedConstellation === 'All Stars' || 
                         star.constellation === selectedConstellation
        
        if (isVisible) {
          // Draw glow effect
          const gradient = ctx.createRadialGradient(
            projectedX, projectedY, 0,
            projectedX, projectedY, size * 2
          )
          // Convert color to rgba format for opacity
          const r = parseInt(star.color.slice(1, 3), 16)
          const g = parseInt(star.color.slice(3, 5), 16)
          const b = parseInt(star.color.slice(5, 7), 16)
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`)
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(projectedX, projectedY, size * 2, 0, Math.PI * 2)
          ctx.fill()
          
          // Draw star core
          ctx.fillStyle = star.color
          ctx.globalAlpha = opacity
          ctx.beginPath()
          ctx.arc(projectedX, projectedY, size, 0, Math.PI * 2)
          ctx.fill()
          
          // Draw symbol
          ctx.fillStyle = '#ffffff'
          ctx.font = `${size}px bold sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(star.symbol, projectedX, projectedY)
          
          ctx.globalAlpha = 1
        }
        
        return {
          ...star,
          x: projectedX,
          y: projectedY,
          z: finalZ,
          visible: isVisible,
          size,
          opacity
        }
      })
      
      setStars(updatedStars)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [stars, rotation, selectedConstellation])

  useEffect(() => {
    initializeStars()
  }, [initializeStars])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Interactive Tech Galaxy
        </h3>
        <p className="text-gray-400 mb-6">
          Drag to explore • Click constellations to filter • Watch the universe unfold
        </p>
        
        {/* Constellation Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {constellations.map((constellation) => (
            <motion.button
              key={constellation}
              onClick={() => setSelectedConstellation(constellation)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedConstellation === constellation
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              {constellation}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Galaxy Canvas */}
      <div className="relative bg-gradient-to-b from-dark-900 to-black rounded-2xl overflow-hidden border border-gray-800">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full h-auto cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          data-cursor="grab"
        />
        
        {/* Hover Info Panel */}
        <AnimatePresence>
          {hoveredStar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 left-4 bg-dark-800/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: hoveredStar.color }}
                >
                  {hoveredStar.symbol}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{hoveredStar.name}</h4>
                  <p className="text-gray-400 text-sm">{hoveredStar.constellation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Instructions */}
        <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
          <p>🖱️ Drag to rotate • ✨ Hover for details</p>
        </div>
      </div>
      
      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {constellations.slice(1).map((constellation) => {
          const constellationStars = techData.filter(star => star.constellation === constellation)
          const colors = constellationStars.map(star => star.color)
          
          return (
            <div
              key={constellation}
              className="bg-dark-800/50 rounded-lg p-3 border border-gray-700"
            >
              <h5 className="text-white font-medium mb-2">{constellation}</h5>
              <div className="flex flex-wrap gap-1">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-1">
                {constellationStars.length} technologies
              </p>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
