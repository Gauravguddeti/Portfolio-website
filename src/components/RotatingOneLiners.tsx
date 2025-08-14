import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const RotatingOneLiners = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const oneLiners = [
    "Valo id: badakh#quack - I play but got my duo sorted 🎮",
    "Why debug when you can just rewrite? 💻",
    "My code compiles on the first try... sometimes 🤞",
    "404: Work-life balance not found",
    "I speak fluent JavaScript, broken Python, and sarcasm",
    "Turning caffeine into code since 2022 ☕",
    "My git commits are like my jokes - frequent but questionable",
    "Building the future, one semicolon at a time",
    "Stack Overflow is my second home 🏠",
    "I don't always test my code, but when I do, I do it in production"
  ]

  useEffect(() => {
    if (!isTyping) return

    let typingIndex = 0
    const currentOneLiner = oneLiners[currentIndex]

    const typingInterval = setInterval(() => {
      if (typingIndex <= currentOneLiner.length) {
        setDisplayText(currentOneLiner.slice(0, typingIndex))
        typingIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        
        // Wait before starting next line
        setTimeout(() => {
          setIsTyping(true)
          setDisplayText('')
          setCurrentIndex((prev) => (prev + 1) % oneLiners.length)
        }, 3000)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [currentIndex, isTyping])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="text-sm text-blue-300 mt-4 h-6"
    >
      <div className="typing-subtitle">
        {displayText}
        {isTyping && <span className="animate-pulse">|</span>}
      </div>
    </motion.div>
  )
}

export default RotatingOneLiners
