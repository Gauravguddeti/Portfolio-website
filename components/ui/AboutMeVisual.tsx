'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const terminalLines = [
  "> Compiling thoughts...",
  "> Debugging purpose...", 
  "> AI loaded. Personality: 10%, Panic: 90%",
  "> Coffee levels: critically low",
  "> Bugs found: 404 not found",
  "> Motivation.exe has stopped working"
]

const rotatingFacts = [
  "I once fixed a bug by deleting half the code",
  "CSS is a dark art. I just chant and hope",
  "My code has more comments than logic",
  "I deploy on Fridays. I live dangerously.",
  "Git blame reveals my darkest secrets",
  "I name variables like I'm writing poetry"
]

const devTags = [
  "🧠 backend-biased",
  "⚙️ AI tinkerer",
  "🪄 debug magic",
  "💬 commit sarcasm=true",
  "💻 logic > layout",
  "🧩 modular by nature",
  "🔄 refactor enthusiast",
  "🚫 frontend? depends."
]

export const AboutMeVisual = () => {
  const [currentFact, setCurrentFact] = useState(0)
  const [terminalIndex, setTerminalIndex] = useState(0)

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % rotatingFacts.length)
    }, 4000)

    const terminalInterval = setInterval(() => {
      setTerminalIndex((prev) => (prev + 1) % terminalLines.length)
    }, 2500)

    return () => {
      clearInterval(factInterval)
      clearInterval(terminalInterval)
    }
  }, [])

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Left Side - Avatar/Terminal */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        {/* Glitched Avatar Placeholder */}
        <div className="relative">
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-4xl font-bold text-white"
            animate={{
              boxShadow: [
                "0 0 20px rgba(14, 165, 233, 0.5)",
                "0 0 40px rgba(14, 165, 233, 0.8)",
                "0 0 20px rgba(14, 165, 233, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GG
          </motion.div>
          
          {/* Glitch effect overlay */}
          <motion.div
            className="absolute inset-0 w-32 h-32 mx-auto bg-red-500 rounded-full opacity-0"
            animate={{
              opacity: [0, 0.3, 0],
              x: [0, 2, -2, 0],
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
          />
        </div>

        {/* Terminal Feed */}
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 ml-2">~/brain</span>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={terminalIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-400"
            >
              {terminalLines[terminalIndex]}
              <span className="animate-pulse">_</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side - Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        {/* Sarcastic Intro */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About This Human
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm a B.Tech Computer Science student with a deep interest in artificial intelligence, 
            machine learning, and full-stack development. I enjoy turning abstract ideas into working systems, 
            whether it's training neural networks to detect crop diseases or building end-to-end web platforms.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            My work blends logic with creativity — I've built AI models, APIs, dashboards, and more, 
            always aiming for clean code and thoughtful design. I'm particularly drawn to projects where 
            machine learning meets real-world impact, and I take pride in writing code that's both functional and maintainable.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Outside of building things, I spend time exploring emerging AI tools, writing tiny automations 
            to improve workflows, and occasionally debugging things I broke two weeks ago. I value systems thinking, 
            grinding in games, and a little humor in every commit.
          </p>
        </div>

        {/* Rotating Fact Tile */}
        <div className="bg-dark-700/50 rounded-xl p-6 border border-primary-400/20 min-h-[100px] flex items-center">
          <div className="w-full">
            <div className="text-sm text-primary-400 mb-2">💡 Random Dev Confession</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.5 }}
                className="text-white font-medium"
              >
                "{rotatingFacts[currentFact]}"
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Tech Tags */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary-400">Dev Personality Tags</h3>
          <div className="flex flex-wrap gap-3">
            {devTags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 10px 30px rgba(14, 165, 233, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-white/5 rounded-full text-sm font-mono text-gray-300 hover:text-white border border-primary-400/20 hover:border-primary-400/50 cursor-default backdrop-blur-sm transition-all duration-300"
                animate={{
                  y: [0, -2, 0],
                }}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: `${3 + (index % 3)}s`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'ease-in-out'
                }}
              >
                <span className="relative">
                  {tag}
                  {/* Subtle glow effect on hover */}
                  <motion.span
                    className="absolute inset-0 rounded-full opacity-0"
                    whileHover={{ 
                      opacity: 0.3,
                      boxShadow: `0 0 15px ${index % 2 === 0 ? 'rgba(14, 165, 233, 0.5)' : 'rgba(139, 92, 246, 0.5)'}`
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
