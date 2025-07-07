'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

interface TechItem {
  name: string
  icon: string
  color: string
  description: string
}

const techData = {
  inner: [
    { name: 'HTML', icon: '🏗️', color: '#E34F26', description: 'Structure & Semantics' },
    { name: 'CSS', icon: '🎨', color: '#1572B6', description: 'Styling & Layouts' },
    { name: 'JavaScript', icon: '⚡', color: '#F7DF1E', description: 'Dynamic Logic' },
    { name: 'VS Code', icon: '💻', color: '#007ACC', description: 'Code Editor' },
    { name: 'Git', icon: '🔄', color: '#F05032', description: 'Version Control' },
    { name: 'React', icon: '⚛️', color: '#61DAFB', description: 'UI Framework' },
  ],
  middle: [
    { name: 'TensorFlow', icon: '🧠', color: '#FF6F00', description: 'Deep Learning' },
    { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', description: 'Neural Networks' },
    { name: 'Hugging Face', icon: '🤗', color: '#FFD21E', description: 'AI Models' },
    { name: 'Scikit-learn', icon: '📊', color: '#F7931E', description: 'ML Library' },
    { name: 'Python', icon: '🐍', color: '#3776AB', description: 'AI Language' },
    { name: 'Jupyter', icon: '📓', color: '#F37626', description: 'Data Analysis' },
    { name: 'OpenAI', icon: '🤖', color: '#412991', description: 'GPT Integration' },
    { name: 'LangChain', icon: '🔗', color: '#1C3C3C', description: 'LLM Framework' },
  ],
  outer: [
    { name: 'Docker', icon: '🐳', color: '#2496ED', description: 'Containerization' },
    { name: 'Firebase', icon: '🔥', color: '#FFCA28', description: 'Backend Services' },
    { name: 'GitHub', icon: '🐙', color: '#181717', description: 'Code Repository' },
    { name: 'Postman', icon: '📮', color: '#FF6C37', description: 'API Testing' },
    { name: 'Figma', icon: '🎯', color: '#F24E1E', description: 'Design Tool' },
    { name: 'Vercel', icon: '▲', color: '#000000', description: 'Deployment' },
    { name: 'AWS', icon: '☁️', color: '#FF9900', description: 'Cloud Platform' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248', description: 'Database' },
  ]
}

const diagnosticLogs = [
  '[HUD] React: Stable',
  '[AI] TensorFlow: Active',
  '[Infra] Docker: Running',
  '[DB] MongoDB: Connected',
  '[Deploy] Vercel: Online'
]

const floatingLogs = [
  '[model]: inference running...',
  '[status]: TensorFlow active',
  '[neural]: processing data...',
  '[gpu]: accelerating...',
  '[api]: endpoints ready',
  '[ml]: training complete',
  '[system]: all systems go'
]

export const ArcReactorTechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  // Physics-based movement for outer ring with gravity effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 })
  
  // Constrain movement with better physics for hula-hoop effect
  const constrainedX = useTransform(springX, [-200, 200], [-20, 20])
  const constrainedY = useTransform(springY, [-200, 200], [-20, 20])

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Rotate logs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % diagnosticLogs.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Mouse movement for physics simulation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMobile) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = e.clientX - centerX
    const y = e.clientY - centerY
    
    mouseX.set(x)
    mouseY.set(y)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Tech Arsenal
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Holographic diagnostic interface showcasing core technologies
        </p>
      </motion.div>

      {/* Arc Reactor Container */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-[800px] flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Holographic Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[linear-gradient(rgba(0,191,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
        </div>

        {/* Main Arc Reactor Housing */}
        <div className="relative w-[650px] h-[650px]">
          
          {/* Outer Metal Housing */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #1a1a1a, #2d2d2d, #404040, #2d2d2d, #1a1a1a)',
              boxShadow: `
                inset 0 0 50px rgba(0,0,0,0.8),
                inset 0 0 20px rgba(255,255,255,0.1),
                0 0 50px rgba(0,191,255,0.3),
                0 0 100px rgba(0,191,255,0.1)
              `
            }}
          >
            {/* Inner Housing Ring */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
              
              {/* Arc Reactor Core Chamber */}
              <motion.div
                className="absolute inset-12 rounded-full overflow-hidden"
                style={{
                  background: 'radial-gradient(circle, rgba(0,191,255,0.4) 0%, rgba(0,150,255,0.3) 30%, rgba(0,100,255,0.2) 60%, transparent 100%)',
                  boxShadow: `
                    inset 0 0 20px rgba(0,191,255,0.3),
                    inset 0 0 40px rgba(0,150,255,0.2),
                    0 0 30px rgba(0,191,255,0.4),
                    0 0 60px rgba(0,150,255,0.2)
                  `
                }}
                animate={{
                  boxShadow: [
                    `inset 0 0 20px rgba(0,191,255,0.3), inset 0 0 40px rgba(0,150,255,0.2), 0 0 30px rgba(0,191,255,0.4), 0 0 60px rgba(0,150,255,0.2)`,
                    `inset 0 0 25px rgba(0,191,255,0.4), inset 0 0 50px rgba(0,150,255,0.3), 0 0 40px rgba(0,191,255,0.5), 0 0 80px rgba(0,150,255,0.3)`,
                    `inset 0 0 20px rgba(0,191,255,0.3), inset 0 0 40px rgba(0,150,255,0.2), 0 0 30px rgba(0,191,255,0.4), 0 0 60px rgba(0,150,255,0.2)`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                
                {/* Energy Plasma Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,191,255,0.4) 20%, rgba(0,150,255,0.3) 40%, rgba(0,100,255,0.2) 60%, transparent 80%)'
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Simple Central Core - No Initials */}
                <motion.div
                  className="absolute inset-[35%] rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,230,255,0.6) 30%, rgba(0,191,255,0.4) 70%, rgba(0,150,255,0.3) 100%)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.4), inset 0 0 15px rgba(0,191,255,0.3)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white/80"
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </motion.div>

                {/* Energy Ripples - Reduced */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: `rgba(0,191,255,${0.4 - i * 0.2})`
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: i * 2,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Particle Effects - Further Reduced */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white"
                    style={{
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 0 4px rgba(0,191,255,0.8)'
                    }}
                    animate={{
                      x: [0, Math.cos((i * 45) * Math.PI / 180) * 80],
                      y: [0, Math.sin((i * 45) * Math.PI / 180) * 80],
                      opacity: [1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Outer Ring - Physics Based with Hula-Hoop Motion */}
          <motion.div
            className="absolute inset-0"
            style={{
              x: constrainedX,
              y: constrainedY,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
          >
            {/* Ring Structure */}
            <div className="absolute inset-[-20px] rounded-full border-4 border-gray-600/50 shadow-2xl">
              <div className="absolute inset-2 rounded-full border-2 border-gray-500/30" />
              
              {/* Tech Icons on Outer Ring */}
              {techData.outer.map((tech, index) => {
                const angle = (index / techData.outer.length) * 360
                const radius = 340
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius
                
                return (
                  <motion.div
                    key={tech.name}
                    className="absolute cursor-pointer z-10 pointer-events-auto"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                    whileHover={{ scale: 1.4 }}
                    onMouseEnter={() => {
                      console.log('Hovering:', tech.name) // Debug log
                      setHoveredTech(tech.name)
                    }}
                    onMouseLeave={() => {
                      console.log('Leaving:', tech.name) // Debug log
                      setHoveredTech(null)
                    }}
                  >
                    <motion.div
                      className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center text-2xl shadow-xl backdrop-blur-sm pointer-events-auto"
                      style={{
                        background: hoveredTech === tech.name 
                          ? `radial-gradient(circle, ${tech.color}40, ${tech.color}20, transparent)`
                          : 'radial-gradient(circle, rgba(30,30,30,0.9), rgba(20,20,20,0.8), transparent)',
                        borderColor: hoveredTech === tech.name ? tech.color : '#4a5568',
                        boxShadow: hoveredTech === tech.name 
                          ? `0 0 25px ${tech.color}80, inset 0 0 15px ${tech.color}30`
                          : '0 4px 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.1)',
                      }}
                      animate={{ 
                        rotate: -angle,
                        y: hoveredTech === tech.name ? [-2, 2, -2] : 0
                      }}
                      transition={{ 
                        rotate: { type: "spring", stiffness: 300 },
                        y: { duration: 1, repeat: hoveredTech === tech.name ? Infinity : 0 }
                      }}
                    >
                      <span className="drop-shadow-lg">{tech.icon}</span>
                      {hoveredTech === tech.name && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: tech.color }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 0.4, 0.8]
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Middle Ring - AI/ML */}
          <motion.div
            className="absolute inset-28 rounded-full"
            style={{
              x: useTransform(constrainedX, [-20, 20], [-10, 10]),
              y: useTransform(constrainedY, [-20, 20], [-10, 10]),
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-full h-full rounded-full border border-blue-400/20 shadow-lg backdrop-blur-sm">
              {techData.middle.map((tech, index) => {
                const angle = (index / techData.middle.length) * 360
                const radius = 200
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius
                
                return (
                  <motion.div
                    key={tech.name}
                    className="absolute cursor-pointer z-20 pointer-events-auto"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                    whileHover={{ scale: 1.3 }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <motion.div
                      className="relative w-16 h-16 rounded-full border flex items-center justify-center text-xl shadow-xl backdrop-blur-sm pointer-events-auto"
                      style={{
                        background: hoveredTech === tech.name 
                          ? `radial-gradient(circle, ${tech.color}40, ${tech.color}20, rgba(0,50,120,0.2))`
                          : 'radial-gradient(circle, rgba(0,50,120,0.3), rgba(0,40,100,0.2), rgba(0,30,80,0.1))',
                        borderColor: hoveredTech === tech.name ? tech.color : '#1e40af',
                        boxShadow: hoveredTech === tech.name 
                          ? `0 0 20px ${tech.color}60, inset 0 0 10px ${tech.color}20`
                          : '0 0 10px rgba(30,64,175,0.3), inset 0 0 6px rgba(30,64,175,0.1)',
                      }}
                      animate={{ 
                        rotate: -360,
                        y: hoveredTech === tech.name ? [-1, 1, -1] : 0
                      }}
                      transition={{ 
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        y: { duration: 0.8, repeat: hoveredTech === tech.name ? Infinity : 0 }
                      }}
                    >
                      <span className="drop-shadow-lg">{tech.icon}</span>
                      {hoveredTech === tech.name && (
                        <motion.div
                          className="absolute inset-0 rounded-full border"
                          style={{ borderColor: tech.color }}
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.6, 0.3, 0.6]
                          }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Inner Ring - Core Tools */}
          <motion.div
            className="absolute inset-40 rounded-full"
            style={{
              x: useTransform(constrainedX, [-20, 20], [-5, 5]),
              y: useTransform(constrainedY, [-20, 20], [-5, 5]),
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-full h-full rounded-full border border-cyan-300/50 shadow-lg backdrop-blur-sm">
              {techData.inner.map((tech, index) => {
                const angle = (index / techData.inner.length) * 360
                const radius = 140
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius
                
                return (
                  <motion.div
                    key={tech.name}
                    className="absolute cursor-pointer z-30 pointer-events-auto"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                    whileHover={{ scale: 1.25 }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <motion.div
                      className="relative w-14 h-14 rounded-full border flex items-center justify-center text-lg shadow-lg backdrop-blur-sm pointer-events-auto"
                      style={{
                        background: hoveredTech === tech.name 
                          ? `radial-gradient(circle, ${tech.color}50, ${tech.color}30, rgba(0,150,200,0.2))`
                          : 'radial-gradient(circle, rgba(0,150,200,0.3), rgba(0,130,180,0.2), rgba(0,110,160,0.1))',
                        borderColor: hoveredTech === tech.name ? tech.color : '#0891b2',
                        boxShadow: hoveredTech === tech.name 
                          ? `0 0 15px ${tech.color}70, inset 0 0 8px ${tech.color}25`
                          : '0 0 10px rgba(8,145,178,0.3), inset 0 0 5px rgba(8,145,178,0.15)',
                      }}
                      animate={{ 
                        rotate: 360,
                        y: hoveredTech === tech.name ? [-1, 1, -1] : 0
                      }}
                      transition={{ 
                        rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                        y: { duration: 0.6, repeat: hoveredTech === tech.name ? Infinity : 0 }
                      }}
                    >
                      <span className="drop-shadow-lg">{tech.icon}</span>
                      {hoveredTech === tech.name && (
                        <motion.div
                          className="absolute inset-0 rounded-full border"
                          style={{ borderColor: tech.color }}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.2, 0.5]
                          }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Arc Reactor Triangle Segments - Reduced */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute origin-bottom"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '50% 280px',
                transform: `translateX(-50%) translateY(-280px) rotate(${i * 45}deg)`,
              }}
            >
              <motion.div
                className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[40px] border-l-transparent border-r-transparent"
                style={{
                  borderBottomColor: `rgba(0,191,255,${0.8 - (i % 4) * 0.2})`,
                  filter: 'drop-shadow(0 0 8px rgba(0,191,255,0.6))'
                }}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scaleY: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}

          {/* Energy Field Lines - Reduced */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-blue-400/20"
              style={{
                transform: `scale(${1 + i * 0.15})`,
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [1 + i * 0.15, 1.1 + i * 0.15, 1 + i * 0.15],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Floating AI Logs - Reduced */}
        {floatingLogs.slice(0, 4).map((log, index) => (
          <motion.div
            key={index}
            className="absolute text-xs font-mono text-primary-300/60 pointer-events-none"
            style={{
              left: `${20 + (index % 3) * 30}%`,
              top: `${15 + (index % 4) * 20}%`,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [-10, -30, -50],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 1.5,
              ease: "easeOut"
            }}
          >
            {log}
          </motion.div>
        ))}

        {/* Diagnostic Display */}
        <motion.div
          className="absolute top-4 left-4 bg-dark-900/80 backdrop-blur-sm rounded-lg p-4 border border-primary-400/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-xs text-primary-400 font-mono mb-2">DIAGNOSTIC LOGS</div>
          <motion.div
            key={currentLogIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-green-400 font-mono"
          >
            {diagnosticLogs[currentLogIndex]}
          </motion.div>
        </motion.div>

        {/* Tech Info Panel */}
        <AnimatePresence>
          {hoveredTech && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 bg-dark-900/90 backdrop-blur-sm rounded-lg p-4 border border-primary-400/30 max-w-xs z-50"
            >
              {(() => {
                const allTech = [...techData.inner, ...techData.middle, ...techData.outer]
                const tech = allTech.find(t => t.name === hoveredTech)
                return tech ? (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{tech.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold">{tech.name}</h4>
                        <p className="text-xs text-gray-400">{tech.description}</p>
                      </div>
                    </div>
                    <div 
                      className="w-full h-1 rounded-full"
                      style={{ backgroundColor: tech.color + '40' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: tech.color }}
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ) : null
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.div
            className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            animate={{ y: [0, 600, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Ring Labels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="text-center">
          <div className="text-primary-400 font-semibold mb-2">Inner Ring</div>
          <div className="text-sm text-gray-400">Core Development Tools</div>
        </div>
        <div className="text-center">
          <div className="text-primary-400 font-semibold mb-2">Middle Ring</div>
          <div className="text-sm text-gray-400">AI & Machine Learning</div>
        </div>
        <div className="text-center">
          <div className="text-primary-400 font-semibold mb-2">Outer Ring</div>
          <div className="text-sm text-gray-400">DevOps & Cloud Services</div>
        </div>
      </motion.div>
    </div>
  )
}
