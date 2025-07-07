'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface HologramProps {
  children: React.ReactNode
  className?: string
}

export const Hologram = ({ children, className = "" }: HologramProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="neural"
    >
      {/* Holographic background */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/20 via-cyan-400/20 to-purple-400/20 blur-lg"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.8 : 0.3
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
          animate={{
            y: isHovered ? [0, 100, 0] : 0
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glitch effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary-400/10"
          animate={{
            x: [0, 2, -2, 0],
            opacity: [0, 0.5, 0.5, 0]
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      )}
    </motion.div>
  )
}
