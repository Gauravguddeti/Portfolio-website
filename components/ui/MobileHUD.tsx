'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TechItem {
  name: string
  icon: string
  color: string
  description: string
}

const techData = {
  core: [
    { name: 'React', icon: '⚛️', color: '#61DAFB', description: 'UI Framework' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6', description: 'Type Safety' },
    { name: 'Next.js', icon: '🌐', color: '#000000', description: 'Full Stack' },
    { name: 'Tailwind', icon: '🎨', color: '#06B6D4', description: 'Styling' },
    { name: 'JavaScript', icon: '⚡', color: '#F7DF1E', description: 'Core Language' },
    { name: 'Git', icon: '🔄', color: '#F05032', description: 'Version Control' },
  ],
  ai: [
    { name: 'TensorFlow', icon: '🧠', color: '#FF6F00', description: 'Deep Learning' },
    { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', description: 'Neural Networks' },
    { name: 'Python', icon: '🐍', color: '#3776AB', description: 'AI Language' },
    { name: 'OpenAI', icon: '🤖', color: '#412991', description: 'GPT Models' },
    { name: 'Hugging Face', icon: '🤗', color: '#FFD21E', description: 'Transformers' },
    { name: 'LangChain', icon: '🔗', color: '#1C3C3C', description: 'LLM Framework' },
  ],
  infra: [
    { name: 'Docker', icon: '🐳', color: '#2496ED', description: 'Containers' },
    { name: 'AWS', icon: '☁️', color: '#FF9900', description: 'Cloud Platform' },
    { name: 'Vercel', icon: '▲', color: '#000000', description: 'Deployment' },
    { name: 'Firebase', icon: '🔥', color: '#FFCA28', description: 'Backend' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248', description: 'Database' },
    { name: 'GitHub', icon: '🐙', color: '#181717', description: 'DevOps' },
  ]
}

const MobileHUDComponent = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    // Check for low-power mode
    const checkLowPowerMode = () => {
      setIsLowPowerMode(document.body.classList.contains('low-power-mode'))
    }
    
    checkLowPowerMode()
    
    // Observer for class changes
    const observer = new MutationObserver(checkLowPowerMode)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isLowPowerMode) return // Don't observe if in low power mode
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('mobile-hud-trigger')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const ringVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const iconVariants = {
    idle: { scale: 1, y: 0 },
    hover: { 
      scale: 1.1, 
      y: -2,
      transition: { duration: 0.2 }
    }
  }

  return (
    <div id="mobile-hud-trigger" className="mobile-hud w-full max-w-md mx-auto py-8">
      {isLowPowerMode ? (
        // Simple static grid for mobile low-power mode
        <div className="grid grid-cols-3 gap-3">
          {[...techData.core, ...techData.ai, ...techData.infra].slice(0, 12).map((tech) => (
            <div
              key={tech.name}
              className="bg-gray-800/30 p-2 rounded text-center border border-gray-700/20"
            >
              <div className="text-lg mb-1">{tech.icon}</div>
              <div className="text-xs font-medium text-white">{tech.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <>
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={ringVariants}
          className="relative w-80 h-80 mx-auto"
        >
        {/* Glowing Core */}
        <motion.div
          className="absolute inset-[40%] rounded-full z-30"
          style={{
            background: 'radial-gradient(circle, rgba(0,191,255,0.8) 0%, rgba(0,150,255,0.4) 50%, transparent 100%)',
            boxShadow: '0 0 40px rgba(0,191,255,0.6), inset 0 0 20px rgba(255,255,255,0.3)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-2 rounded-full bg-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Core Tools Ring - Inner */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ willChange: 'transform' }}
        >
          {techData.core.map((tech, index) => {
            const angle = (index / techData.core.length) * 360
            const radius = 100
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius
            
            return (
              <motion.div
                key={tech.name}
                className="absolute cursor-pointer z-20"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                variants={iconVariants}
                animate={hoveredTech === tech.name ? "hover" : "idle"}
                onTap={() => setHoveredTech(hoveredTech === tech.name ? null : tech.name)}
              >
                <motion.div
                  className="relative w-12 h-12 rounded-full border flex items-center justify-center text-lg backdrop-blur-sm"
                  style={{
                    background: hoveredTech === tech.name 
                      ? `radial-gradient(circle, ${tech.color}40, ${tech.color}20, rgba(0,150,200,0.3))`
                      : 'radial-gradient(circle, rgba(0,150,200,0.4), rgba(0,130,180,0.3), rgba(0,110,160,0.2))',
                    borderColor: hoveredTech === tech.name ? tech.color : '#0891b2',
                    boxShadow: hoveredTech === tech.name 
                      ? `0 0 15px ${tech.color}60, inset 0 0 8px ${tech.color}30`
                      : '0 0 8px rgba(8,145,178,0.4), inset 0 0 4px rgba(8,145,178,0.2)',
                  }}
                  animate={{ 
                    rotate: -360,
                    boxShadow: hoveredTech === tech.name
                      ? [`0 0 15px ${tech.color}60`, `0 0 25px ${tech.color}80`, `0 0 15px ${tech.color}60`]
                      : '0 0 8px rgba(8,145,178,0.4)'
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 1, repeat: Infinity }
                  }}
                >
                  <span className="drop-shadow-lg">{tech.icon}</span>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* AI/ML Ring - Middle */}
        <motion.div
          className="absolute inset-[-10px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ willChange: 'transform' }}
        >
          {techData.ai.map((tech, index) => {
            const angle = (index / techData.ai.length) * 360
            const radius = 130
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius
            
            return (
              <motion.div
                key={tech.name}
                className="absolute cursor-pointer z-10"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                variants={iconVariants}
                animate={hoveredTech === tech.name ? "hover" : "idle"}
                onTap={() => setHoveredTech(hoveredTech === tech.name ? null : tech.name)}
              >
                <motion.div
                  className="relative w-11 h-11 rounded-full border flex items-center justify-center text-base backdrop-blur-sm"
                  style={{
                    background: hoveredTech === tech.name 
                      ? `radial-gradient(circle, ${tech.color}40, ${tech.color}20, rgba(0,50,120,0.3))`
                      : 'radial-gradient(circle, rgba(0,50,120,0.4), rgba(0,40,100,0.3), rgba(0,30,80,0.2))',
                    borderColor: hoveredTech === tech.name ? tech.color : '#1e40af',
                    boxShadow: hoveredTech === tech.name 
                      ? `0 0 12px ${tech.color}50, inset 0 0 6px ${tech.color}25`
                      : '0 0 6px rgba(30,64,175,0.4), inset 0 0 3px rgba(30,64,175,0.2)',
                  }}
                  animate={{ 
                    rotate: 360,
                    boxShadow: hoveredTech === tech.name
                      ? [`0 0 12px ${tech.color}50`, `0 0 20px ${tech.color}70`, `0 0 12px ${tech.color}50`]
                      : '0 0 6px rgba(30,64,175,0.4)'
                  }}
                  transition={{ 
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 1.2, repeat: Infinity }
                  }}
                >
                  <span className="drop-shadow-lg">{tech.icon}</span>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Infra/DevOps Ring - Outer */}
        <motion.div
          className="absolute inset-[-20px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ willChange: 'transform' }}
        >
          {techData.infra.map((tech, index) => {
            const angle = (index / techData.infra.length) * 360
            const radius = 160
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius
            
            return (
              <motion.div
                key={tech.name}
                className="absolute cursor-pointer z-5"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                variants={iconVariants}
                animate={hoveredTech === tech.name ? "hover" : "idle"}
                onTap={() => setHoveredTech(hoveredTech === tech.name ? null : tech.name)}
              >
                <motion.div
                  className="relative w-10 h-10 rounded-full border flex items-center justify-center text-sm backdrop-blur-sm"
                  style={{
                    background: hoveredTech === tech.name 
                      ? `radial-gradient(circle, ${tech.color}40, ${tech.color}20, rgba(30,30,30,0.3))`
                      : 'radial-gradient(circle, rgba(30,30,30,0.4), rgba(20,20,20,0.3), rgba(10,10,10,0.2))',
                    borderColor: hoveredTech === tech.name ? tech.color : '#4a5568',
                    boxShadow: hoveredTech === tech.name 
                      ? `0 0 10px ${tech.color}40, inset 0 0 5px ${tech.color}20`
                      : '0 0 4px rgba(74,85,104,0.4), inset 0 0 2px rgba(74,85,104,0.2)',
                  }}
                  animate={{ 
                    rotate: -360,
                    boxShadow: hoveredTech === tech.name
                      ? [`0 0 10px ${tech.color}40`, `0 0 15px ${tech.color}60`, `0 0 10px ${tech.color}40`]
                      : '0 0 4px rgba(74,85,104,0.4)'
                  }}
                  transition={{ 
                    rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  <span className="drop-shadow-lg">{tech.icon}</span>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Energy Pulses */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary-400/20"
            style={{ transform: `scale(${1 + i * 0.2})` }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1 + i * 0.2, 1.1 + i * 0.2, 1 + i * 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Tech Info Panel */}
      <AnimatePresence>
        {hoveredTech && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-dark-900/90 backdrop-blur-sm rounded-lg p-4 border border-primary-400/30 mx-4"
          >
            {(() => {
              const allTech = [...techData.core, ...techData.ai, ...techData.infra]
              const tech = allTech.find(t => t.name === hoveredTech)
              return tech ? (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <h4 className="text-white font-semibold">{tech.name}</h4>
                      <p className="text-sm text-gray-400">{tech.description}</p>
                    </div>
                  </div>
                  <div 
                    className="w-full h-1 rounded-full"
                    style={{ backgroundColor: tech.color + '30' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tech.color }}
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              ) : null
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ring Labels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 grid grid-cols-3 gap-2 text-center text-xs"
      >
        <div>
          <div className="text-primary-400 font-semibold mb-1">Core</div>
          <div className="text-gray-500">Tools</div>
        </div>
        <div>
          <div className="text-primary-400 font-semibold mb-1">AI/ML</div>
          <div className="text-gray-500">Intelligence</div>
        </div>
        <div>
          <div className="text-primary-400 font-semibold mb-1">Infra</div>
          <div className="text-gray-500">DevOps</div>
        </div>
      </motion.div>
        </>
      )}
    </div>
  )
}

// Lazy loading component with fallback
export const MobileHUD = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <Suspense fallback={
      <div className="w-full max-w-md mx-auto py-8">
        <div className="w-80 h-80 mx-auto rounded-full bg-dark-800/50 animate-pulse flex items-center justify-center">
          <div className="text-primary-400 text-sm">Loading HUD...</div>
        </div>
      </div>
    }>
      <MobileHUDComponent />
    </Suspense>
  )
}
