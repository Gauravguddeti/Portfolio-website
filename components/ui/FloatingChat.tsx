'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  // Time-based messages
  "Late-night coding detected. Respect.",
  "Morning algorithms loading...",
  "Afternoon productivity spike detected.",
  "Evening creative mode activated.",
  
  // Hover-based messages
  "Hovering detected. Curiosity unlocked.",
  "Neural pathways firing.",
  "Pattern recognition activated.",
  "Data processing in progress...",
  
  // General AI/ML themed
  "Welcome, fellow brainwave.",
  "Building something intelligent today?",
  "Training models, one layer at a time.",
  "Gradient descent in progress...",
  "Backpropagation complete.",
  "Overfitting detected. Regularizing...",
  
  // Motivational
  "Coffee levels: critically low.",
  "Debugging reality.exe",
  "Turning coffee into code.",
  "AI whisperer at work.",
  "Compiling dreams into reality.",
  "Code. Create. Repeat.",
  "Sleep is for the uncompiled.",
  "Loading next-gen solutions...",
  "Optimizing human potential.",
  
  // Personal facts about Gaurav
  "B.Tech Computer Science student.",
  "AI/ML enthusiast since day 1.",
  "Full-stack developer by choice.",
  "Problem solver by nature.",
  "Always learning, always growing.",
  "From algorithms to applications.",
  "Building the future, one line at a time.",
  
  // Real-time inspired
  "Current mood: Innovating.",
  "Status: Deep in the zone.",
  "Next goal: World domination (via code).",
  "Favorite language: Python (obviously).",
  "Currently listening to: The sound of keyboards.",
  "Today's achievement: Another bug fixed.",
  "Mission: Making AI accessible.",
  
  // Tech humor
  "404: Social life not found.",
  "It's not a bug, it's a feature.",
  "Ctrl+Z is my best friend.",
  "Stackoverflow saved my life.",
  "Git commit -m 'fixed everything'",
  "import happiness from 'coding'",
  "while(alive) { code(); }",
  "const success = hardWork + persistence;",
]

const getTimeBasedMessages = () => {
  const hour = new Date().getHours()
  const day = new Date().getDay()
  const date = new Date().getDate()
  
  let timeMessages = []
  
  // Time of day
  if (hour >= 6 && hour < 12) {
    timeMessages.push("Good morning, builder! ☀️", "Early bird codes the worm.", "Dawn of a new algorithm.")
  } else if (hour >= 12 && hour < 17) {
    timeMessages.push("Afternoon productivity mode.", "Midday debugging session.", "Lunch break = code break.")
  } else if (hour >= 17 && hour < 21) {
    timeMessages.push("Evening grind mode ☕", "Golden hour coding.", "Sunset, sunrise, code.")
  } else {
    timeMessages.push("Midnight oil mode activated.", "Night owl detected.", "3 AM: peak creativity time.")
  }
  
  // Day of week
  if (day === 1) timeMessages.push("Monday: New week, new bugs to fix.")
  if (day === 5) timeMessages.push("Friday: Deploy day anxiety.")
  if (day === 0 || day === 6) timeMessages.push("Weekend warrior coding.")
  
  // Special dates
  if (date === 1) timeMessages.push("New month, new features.")
  if (date === 15) timeMessages.push("Mid-month milestone check.")
  
  return timeMessages
}

const getRealTimeInfo = () => {
  const now = new Date()
  const timeString = now.toLocaleTimeString()
  const dateString = now.toLocaleDateString()
  
  return [
    `Current time: ${timeString}`,
    `Today is: ${dateString}`,
    `Uptime: ${Math.floor(Math.random() * 24)} hours`,
    `Commits today: ${Math.floor(Math.random() * 10)}`,
    `Lines of code: ${Math.floor(Math.random() * 1000) + 500}`,
    `Bugs fixed: ${Math.floor(Math.random() * 5)}`,
    `Coffee cups: ${Math.floor(Math.random() * 8)}`,
  ]
}

export const FloatingChat = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const updateMessage = () => {
      const timeMessages = getTimeBasedMessages()
      const realTimeInfo = getRealTimeInfo()
      const allMessages = [...messages, ...timeMessages, ...realTimeInfo]
      
      setCurrentMessage(allMessages[messageIndex % allMessages.length])
      setMessageIndex(prev => prev + 1)
    }

    updateMessage()

    const interval = setInterval(() => {
      updateMessage()
    }, 6000) // Change message every 6 seconds

    return () => clearInterval(interval)
  }, [messageIndex])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-40 max-w-xs"
    >
      <motion.div
        key={currentMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glassmorphism rounded-2xl p-4 shadow-2xl border border-primary-400/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
            🤖
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300 leading-relaxed">
              {currentMessage}
            </p>
          </div>
        </div>
        
        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-end mt-2"
        >
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
