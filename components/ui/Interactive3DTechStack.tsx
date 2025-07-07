'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

interface TechCube {
  id: string
  name: string
  icon: string
  color: string
  category: string
  x: number
  y: number
  z: number
  rotationX: number
  rotationY: number
  rotationZ: number
}

const techStack = [
  { name: 'React', icon: '⚛️', color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', color: '#000000', category: 'Frontend' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', category: 'Frontend' },
  { name: 'Python', icon: '🐍', color: '#3776AB', category: 'Backend' },
  { name: 'Node.js', icon: '🟢', color: '#339933', category: 'Backend' },
  { name: 'TensorFlow', icon: '🧠', color: '#FF6F00', category: 'AI/ML' },
  { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', category: 'AI/ML' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', category: 'Database' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791', category: 'Database' },
  { name: 'Docker', icon: '🐳', color: '#2496ED', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', color: '#FF9900', category: 'DevOps' },
  { name: 'Git', icon: '📋', color: '#F05032', category: 'Tools' },
]

export const Interactive3DTechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cubes, setCubes] = useState<TechCube[]>([])
  const [hoveredCube, setHoveredCube] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'Database', 'DevOps', 'Tools']

  // Initialize cube positions in 3D space
  useEffect(() => {
    const radius = 200
    const newCubes: TechCube[] = techStack.map((tech, index) => {
      const angle = (index / techStack.length) * Math.PI * 2
      const height = Math.sin(index * 0.5) * 100
      
      return {
        id: tech.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        ...tech,
        x: Math.cos(angle) * radius,
        y: height,
        z: Math.sin(angle) * radius,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
      }
    })
    setCubes(newCubes)
  }, [])

  // Handle mouse movement for 3D rotation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height
    
    mouseX.set(x * 30) // Max rotation of 30 degrees
    mouseY.set(y * -30)
  }

  const filteredCubes = selectedCategory === 'All' 
    ? cubes 
    : cubes.filter(cube => cube.category === selectedCategory)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          3D Tech Universe
        </h3>
        <p className="text-gray-400 mb-6">
          Explore my technology stack in an interactive 3D space
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 3D Scene Container */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-[600px] bg-gradient-to-b from-dark-900 to-black rounded-2xl overflow-hidden border border-gray-800 perspective-1000"
        onMouseMove={handleMouseMove}
        style={{
          perspective: '1000px',
        }}
      >
        {/* 3D Space */}
        <motion.div
          className="absolute inset-0 preserve-3d"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: mouseY,
            rotateY: mouseX,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div
                key={`grid-${i}`}
                className="absolute border-t border-primary-400/20"
                style={{
                  top: `${i * 10}%`,
                  width: '100%',
                  transform: `rotateX(90deg) translateZ(${i * 20 - 100}px)`,
                }}
              />
            ))}
          </div>

          {/* Tech Cubes */}
          {filteredCubes.map((cube, index) => (
            <motion.div
              key={cube.id}
              className="absolute w-16 h-16 cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate3d(${cube.x}px, ${cube.y}px, ${cube.z}px)`,
                left: '50%',
                top: '50%',
                marginLeft: '-32px',
                marginTop: '-32px',
              }}
              initial={{ 
                opacity: 0, 
                scale: 0,
                rotateX: cube.rotationX,
                rotateY: cube.rotationY,
                rotateZ: cube.rotationZ,
              }}
              animate={{ 
                opacity: 1, 
                scale: hoveredCube === cube.id ? 1.3 : 1,
                rotateX: cube.rotationX + (hoveredCube === cube.id ? 45 : 0),
                rotateY: cube.rotationY + (hoveredCube === cube.id ? 45 : 0),
                rotateZ: cube.rotationZ,
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.4,
                rotateY: cube.rotationY + 180,
              }}
              onHoverStart={() => setHoveredCube(cube.id)}
              onHoverEnd={() => setHoveredCube(null)}
            >
              {/* Cube Faces */}
              <div className="relative w-full h-full preserve-3d">
                {/* Front Face */}
                <div 
                  className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg rounded-lg border-2 border-white/20 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: cube.color + '40',
                    borderColor: cube.color,
                    transform: 'translateZ(32px)'
                  }}
                >
                  {cube.icon}
                </div>
                
                {/* Back Face */}
                <div 
                  className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs rounded-lg border-2 border-white/20 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: cube.color + '60',
                    borderColor: cube.color,
                    transform: 'translateZ(-32px) rotateY(180deg)'
                  }}
                >
                  {cube.name}
                </div>

                {/* Side Faces */}
                {[0, 90, 180, 270].map((rotation, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-lg border-2 border-white/10"
                    style={{
                      backgroundColor: cube.color + '20',
                      borderColor: cube.color + '40',
                      transform: `rotateY(${rotation}deg) translateZ(32px)`,
                    }}
                  />
                ))}
              </div>

              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-lg opacity-50 blur-lg"
                style={{
                  backgroundColor: cube.color,
                  transform: 'translateZ(-10px)',
                  animation: hoveredCube === cube.id ? 'pulse 1s infinite' : 'none',
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Info Panel */}
        {hoveredCube && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 left-4 bg-dark-800/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 max-w-xs"
          >
            {(() => {
              const cube = cubes.find(c => c.id === hoveredCube)
              return cube ? (
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: cube.color }}
                  >
                    {cube.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{cube.name}</h4>
                    <p className="text-gray-400 text-sm">{cube.category}</p>
                  </div>
                </div>
              ) : null
            })()}
          </motion.div>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
          <p>🖱️ Move mouse to rotate • ✨ Hover cubes for details</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {categories.slice(1).map((category) => {
          const count = techStack.filter(tech => tech.category === category).length
          return (
            <div
              key={category}
              className="bg-dark-800/50 rounded-lg p-4 text-center border border-gray-700"
            >
              <div className="text-2xl font-bold text-primary-400">{count}</div>
              <div className="text-gray-400 text-sm">{category}</div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
