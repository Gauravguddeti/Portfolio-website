'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  type?: 'wave' | 'diagonal' | 'zigzag' | 'curve' | 'particles'
  flip?: boolean
}

export const SectionDivider = ({ type = 'wave', flip = false }: SectionDividerProps) => {
  const getPath = () => {
    switch (type) {
      case 'wave':
        return "M0,32L48,37.3C96,43,192,53,288,48C384,43,480,21,576,16C672,11,768,21,864,26.7C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      case 'diagonal':
        return "M0,0L1440,64L1440,0Z"
      case 'zigzag':
        return "M0,32L60,21.3C120,11,240,11,360,16C480,21,600,32,720,37.3C840,43,960,43,1080,37.3C1200,32,1320,21,1380,16L1440,11L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      case 'curve':
        return "M0,64L1440,0L1440,0L0,0Z"
      case 'particles':
        return "M0,32L80,32C160,32,320,32,480,21.3C640,11,800,0,960,5.3C1120,11,1280,32,1360,42.7L1440,53L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      default:
        return "M0,32L48,37.3C96,43,192,53,288,48C384,43,480,21,576,16C672,11,768,21,864,26.7C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    }
  }

  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <svg
        className="relative block w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(14, 165, 233, 0.1)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
          </linearGradient>
        </defs>
        <motion.path
          d={getPath()}
          fill={`url(#gradient-${type})`}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </svg>
      
      {type === 'particles' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: '50%',
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
