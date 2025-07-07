'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(currentProgress)
      setIsVisible(window.pageYOffset > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-1 bg-gradient-to-r from-primary-400 via-purple-500 to-teal-400 shadow-lg shadow-primary-400/50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
      
      {/* Floating progress indicator */}
      {isVisible && (
        <motion.div
          className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-primary-400 text-xs font-mono border border-primary-400/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      )}
    </motion.div>
  )
}

export default ScrollProgress
