'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const [showPopup, setShowPopup] = useState(false)

  const handleToggle = () => {
    toggleTheme()
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 6000) // 6 seconds to read
  }

  const funnyMessages = [
    "Ah, a fellow creature of the night! 🌙",
    "Welcome to the dark side, we have cookies 🍪",
    "Light mode? What is this, amateur hour? 😎",
    "Your eyes have been saved from the cursed light! 👀",
    "Now you're coding like a true dev! 💻",
    "Darkness is our natural habitat 🦇",
    "Light mode users are just day-shift devs 🌅"
  ]

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed top-6 right-6 z-50 p-3 bg-dark-700/80 hover:bg-dark-600/80 border border-primary-400/30 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20"
        title="Toggle theme"
      >
        <motion.div
          animate={{ rotate: 0 }} // Always keep it as moon (no rotation)
          transition={{ duration: 0.5 }}
        >
          {/* Always show moon icon */}
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </motion.div>
      </button>

      {/* Funny Popup */}
      <AnimatePresence>
        {showPopup && theme === 'dark' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-20 right-6 z-40 bg-dark-800/95 border border-primary-400/50 rounded-lg p-4 max-w-xs backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">😎</div>
              <div>
                <p className="text-white text-sm font-medium mb-1">
                  {funnyMessages[Math.floor(Math.random() * funnyMessages.length)]}
                </p>
                <p className="text-primary-300 text-xs">
                  Pro tip: Real devs only use dark mode
                </p>
              </div>
            </div>
            
            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-primary-500 rounded-b-lg"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
