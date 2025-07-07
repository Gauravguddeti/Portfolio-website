'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

const typingFacts = [
  "Gaming enthusiast 🎯 Valorant ranked grinder - already got my perfect duo though!",
  "\"LETS TP MY KITTENS\" ~Goat",
  "Built an AI model that predicted wrong — confidently.",
  "ML models are great. Until they're not.",
  "GPT-3 has more neurons than I do.",
  "Python was named after Monty Python, not the snake.",
  "StackOverflow is my therapist.",
  "Deployed to prod at 3AM. On purpose.",
  "My AI can detect sarcasm. Sometimes.",
  "Will not touch CSS. Mentally allergic.",
  "I talk to my AI models like they're coworkers."
]

export const TypewriterGlitch = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Start glitch effect
      setIsGlitching(true)
      
      setTimeout(() => {
        setShowText(false)
        
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % typingFacts.length)
          setShowText(true)
          setIsGlitching(false)
        }, 500)
      }, 2000)
    }, 6000) // Complete cycle every 6 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[80px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {showText && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: isGlitching ? 'blur(1px) hue-rotate(90deg)' : 'blur(0px) hue-rotate(0deg)'
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`text-lg md:text-xl text-gray-400 font-mono text-center max-w-2xl ${
              isGlitching ? 'animate-pulse' : ''
            }`}
            style={{
              textShadow: isGlitching ? '2px 0 #ff0000, -2px 0 #00ff00' : 'none'
            }}
          >
            <Typewriter
              words={[typingFacts[currentIndex]]}
              loop={1}
              cursor
              cursorStyle='|'
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
