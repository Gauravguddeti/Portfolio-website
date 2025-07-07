'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionBackgroundProps {
  children: ReactNode
  variant?: 'default' | 'gradient' | 'grid' | 'dots' | 'waves'
  className?: string
}

export const SectionBackground = ({ 
  children, 
  variant = 'default', 
  className = '' 
}: SectionBackgroundProps) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-teal-900/10'
      case 'grid':
        return 'bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]'
      case 'dots':
        return 'bg-[radial-gradient(circle_at_2px_2px,rgba(59,130,246,0.2),transparent_2px)] bg-[size:20px_20px]'
      case 'waves':
        return 'bg-gradient-to-r from-transparent via-primary-500/5 to-transparent'
      default:
        return 'bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900'
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative overflow-hidden ${getBackgroundStyle()} ${className}`}
    >
      {/* Animated background elements */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, -100, 50, 0],
              y: [0, 50, -100, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      )}
      
      {variant === 'waves' && (
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-400/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      )}

      {variant === 'grid' && (
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,0.1)_75%,rgba(59,130,246,0.1)_76%,transparent_77%),linear-gradient(rgba(59,130,246,0.1)_24%,transparent_25%,transparent_26%,rgba(59,130,246,0.1)_27%,rgba(59,130,246,0.1)_74%,transparent_75%,transparent_76%,rgba(59,130,246,0.1)_77%)]"
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      )}

      {children}
    </motion.section>
  )
}

export default SectionBackground
