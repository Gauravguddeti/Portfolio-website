'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sarcasticQuotes = [
  "Code works. I don't.",
  "Dark mode isn't a feature. It's a survival tool.",
  "StackOverflow is my second brain.",
  "I deploy at 3AM because I love chaos.",
  "My repo has more forks than my kitchen.",
  "Frontend is vibes. Backend is trauma.",
  "Trust the process. The process: 💥💻🔥",
  "Touch grass failed. Retrying…",
  "AI wrote this. I supervised.",
  "Debugging is twice as hard as writing code.",
  "It works on my machine. Ship it.",
  "CSS is awesome. Said no one ever.",
  "Git blame reveals my deepest secrets.",
  "Comments are for the weak.",
  "Production is my testing environment.",
  "I speak fluent Google Translate.",
  "Caffeine.exe has stopped working.",
  "404: Life not found.",
  "Ctrl+Z is my therapy.",
  "I code therefore I am (confused)."
]

interface FloatingQuote {
  id: number
  text: string
  x: number
  y: number
  duration: number
  delay: number
}

export const FloatingQuotes = () => {
  const [quotes, setQuotes] = useState<FloatingQuote[]>([])

  useEffect(() => {
    const generateQuotes = () => {
      const newQuotes: FloatingQuote[] = []
      
      for (let i = 0; i < 8; i++) {
        newQuotes.push({
          id: i,
          text: sarcasticQuotes[Math.floor(Math.random() * sarcasticQuotes.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 20 + 15, // 15-35 seconds
          delay: Math.random() * 10 // 0-10 seconds delay
        })
      }
      
      setQuotes(newQuotes)
    }

    generateQuotes()
    
    // Regenerate quotes every 30 seconds
    const interval = setInterval(generateQuotes, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {quotes.map((quote) => (
          <motion.div
            key={quote.id}
            className="absolute text-xs font-mono text-primary-400 max-w-xs"
            style={{
              left: `${quote.x}%`,
              top: `${quote.y}%`,
              opacity: 0.08,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.1, 0.08, 0],
              scale: [0.8, 1, 1, 0.9],
              y: [0, -20, -40, -60]
            }}
            transition={{
              duration: quote.duration,
              delay: quote.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {quote.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
