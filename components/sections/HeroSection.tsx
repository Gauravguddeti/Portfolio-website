'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { TypewriterGlitch } from '@/components/ui/TypewriterGlitch'
import { FloatingQuotes } from '@/components/ui/FloatingQuotes'
import { ASCIIDonut } from '@/components/ui/ASCIIDonut'

export const HeroSection = () => {
  const [greeting, setGreeting] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring animation for bubble movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let newGreeting = ''
      
      if (hour >= 5 && hour < 8) {
        newGreeting = 'Early commit worm activated 🪱'
      } else if (hour >= 8 && hour < 12) {
        newGreeting = 'Deploying caffeine patch ☕'
      } else if (hour >= 12 && hour < 14) {
        newGreeting = 'Debugging lunch mode 🍜'
      } else if (hour >= 14 && hour < 18) {
        newGreeting = 'Afternoon slump... CPU throttled 😴'
      } else if (hour >= 18 && hour < 22) {
        newGreeting = 'Evening grind mode 💻'
      } else if (hour >= 22 || hour < 2) {
        newGreeting = 'Late-night coding session detected 🌙'
      } else {
        newGreeting = 'Why are you even here? Go to sleep. 😵‍💫'
      }
      
      setGreeting(newGreeting)
    }

    updateGreeting()
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle mouse movement for bubble interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) * 0.1
    const y = (e.clientY - centerY) * 0.1
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section 
      ref={containerRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ASCII Donut Background Animation - Behind everything but above base background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          className="ascii-donut-container relative"
          style={{
            x: springX,
            y: springY,
          }}
          animate={{
            scale: [1, 1.01, 1],
          }}
          transition={{
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <ASCIIDonut />
        </motion.div>
      </div>

      {/* Floating Quotes */}
      <FloatingQuotes />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/10 to-dark-900/70 z-10" />

      {/* Content - Highest z-index to ensure visibility */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-sm md:text-base text-primary-400 mb-2 font-mono relative z-2">
            {greeting}
          </h1>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-primary-100 to-primary-300 bg-clip-text text-transparent relative z-2"
        >
          Gaurav Guddeti
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl text-gray-300 mb-6 relative z-2">
            Artificial Intelligence · Machine Learning · Full Stack Developer
          </p>
          
          {/* Typewriter Facts */}
          <TypewriterGlitch />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="relative z-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
            data-cursor="neural"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="relative z-2 px-8 py-3 border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-dark-900 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            data-cursor="neural"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
