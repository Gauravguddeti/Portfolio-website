'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: React.ReactNode
  content: string
  joke?: string
  delay?: number
  className?: string
}

export const HoverTooltip = ({ children, content, joke, delay = 500, className = "" }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const timeoutRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent) => {
    clearTimeout(timeoutRef.current)
    
    timeoutRef.current = setTimeout(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        // Better positioning that doesn't cover the button
        const centerX = rect.left + rect.width / 2
        const topY = rect.top - 15
        
        setPosition({
          x: centerX,
          y: topY
        })
      }
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className={`inline-block cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="bg-dark-800/95 border border-primary-400/50 rounded-lg p-3 max-w-xs shadow-lg backdrop-blur-sm">
              <p className="text-white text-sm font-medium mb-1">{content}</p>
              {joke && (
                <p className="text-primary-300 text-xs italic border-t border-gray-600 pt-2">
                  💭 {joke}
                </p>
              )}
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-800" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Predefined jokes for different sections
export const jokes = {
  resume: "Just a simple doc with everything that's already on this website... but in Times New Roman! 📄",
  contact: "I promise I'm more interesting than my LinkedIn suggests",
  projects: "Each project represents 47 cups of coffee and 3 existential crises",
  skills: "Powered by Stack Overflow and pure determination",
  tech: "This technology and I have a complicated relationship",
  email: "I actually read my emails (shocking, I know)",
  github: "Where my code goes to be judged by strangers",
  demo: "Please don't break it, I just fixed it 5 minutes ago",
  status: "Status: Probably needs more coffee"
}
