'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TechItem {
  name: string
  icon: string
  color: string
  description: string
  category: string
}

const techData = {
  frontend: [
    { name: 'React', icon: '⚛️', color: '#61DAFB', description: 'UI Framework', category: 'Frontend' },
    { name: 'Next.js', icon: '🔺', color: '#000000', description: 'Full Stack', category: 'Frontend' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6', description: 'Type Safety', category: 'Frontend' },
    { name: 'Tailwind', icon: '🎨', color: '#06B6D4', description: 'Styling', category: 'Frontend' },
  ],
  ai: [
    { name: 'TensorFlow', icon: '🧠', color: '#FF6F00', description: 'Deep Learning', category: 'AI/ML' },
    { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', description: 'Neural Networks', category: 'AI/ML' },
    { name: 'Python', icon: '🐍', color: '#3776AB', description: 'AI Language', category: 'AI/ML' },
    { name: 'OpenAI', icon: '🤖', color: '#412991', description: 'GPT Models', category: 'AI/ML' },
  ],
  tools: [
    { name: 'Docker', icon: '🐳', color: '#2496ED', description: 'Containers', category: 'DevOps' },
    { name: 'AWS', icon: '☁️', color: '#FF9900', description: 'Cloud', category: 'DevOps' },
    { name: 'Git', icon: '🔄', color: '#F05032', description: 'Version Control', category: 'DevOps' },
    { name: 'VS Code', icon: '💻', color: '#007ACC', description: 'Editor', category: 'DevOps' },
  ]
}

const terminalCommands = [
  'npm install --save future',
  'git commit -m "building tomorrow"',
  'docker run --ai-powered',
  'python train_model.py',
  'vercel deploy --production',
  'aws s3 sync ./dreams',
]

export const MobileTerminal = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [commandIndex, setCommandIndex] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Check for low-power mode
  useEffect(() => {
    const checkLowPowerMode = () => {
      setIsLowPowerMode(document.body.classList.contains('low-power-mode'))
    }
    
    checkLowPowerMode()
    const observer = new MutationObserver(checkLowPowerMode)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (isLowPowerMode) return // Skip animation in low power mode
    
    const currentCommand = terminalCommands[commandIndex]
    let charIndex = 0
    setIsTyping(true)
    setTypingText('')

    const typeInterval = setInterval(() => {
      if (charIndex < currentCommand.length) {
        setTypingText(currentCommand.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        
        // Move to next command after delay
        setTimeout(() => {
          setCommandIndex((prev) => (prev + 1) % terminalCommands.length)
        }, 2000)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [commandIndex, isLowPowerMode])

  const categories = Object.keys(techData) as (keyof typeof techData)[]

  if (isLowPowerMode) {
    // Ultra-simple static version for low-power mode
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/90 rounded-lg border border-gray-700/50 p-4">
          <div className="text-green-400 text-xs font-mono mb-4">$ gaurav --tech-stack</div>
          <div className="space-y-3">
            {Object.entries(techData).map(([category, techs]) => (
              <div key={category}>
                <div className="text-blue-400 text-sm font-semibold mb-2 capitalize">{category}</div>
                <div className="grid grid-cols-2 gap-2">
                  {techs.map((tech) => (
                    <div key={tech.name} className="flex items-center gap-2 text-xs">
                      <span>{tech.icon}</span>
                      <span className="text-gray-300">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-800/80 px-4 py-2 border-b border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-gray-400 text-xs font-mono">gaurav-terminal</span>
          </div>
          <div className="text-gray-500 text-xs">●</div>
        </div>

        {/* Terminal Content */}
        <div ref={terminalRef} className="p-4 h-80 overflow-hidden">
          {/* Command prompt */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-400 font-mono text-sm">$</span>
            <span className="text-white font-mono text-sm">
              {typingText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-green-400"
                >
                  |
                </motion.span>
              )}
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 mb-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Tech Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {techData[activeCategory as keyof typeof techData].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded bg-gray-800/30 hover:bg-gray-700/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tech.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{tech.name}</div>
                      <div className="text-xs text-gray-400">{tech.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: tech.color }}
                    ></div>
                    <span className="text-green-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      ✓
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Status Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-xs font-mono text-gray-500"
          >
            <span>Ready</span>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 bg-green-400 rounded-full"
              ></motion.div>
              <span>Online</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
