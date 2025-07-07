'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const LiveSystemBackground = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [networkPulse, setNetworkPulse] = useState<Array<{id: number, x: number, y: number}>>([])

  useEffect(() => {
    // Real-time clock
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Network pulse animation
    const pulseInterval = setInterval(() => {
      setNetworkPulse(prev => [
        ...prev.slice(-5),
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100
        }
      ])
    }, 1200)

    return () => {
      clearInterval(timeInterval)
      clearInterval(pulseInterval)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full">
          <defs>
            <pattern id="liveGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0ea5e9" strokeWidth="0.3" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#liveGrid)" />
          
          {/* Network pulse points */}
          {networkPulse.map((pulse) => (
            <motion.circle
              key={pulse.id}
              cx={`${pulse.x}%`}
              cy={`${pulse.y}%`}
              r="2"
              fill="#0ea5e9"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0], 
                scale: [0, 1.2, 0],
                r: [2, 8, 2]
              }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          ))}
        </svg>
      </div>

      {/* Real-time display - only time and date */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="font-mono text-xs text-primary-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            LIVE
          </div>
        </div>
        
        <div className="text-xs font-mono text-gray-400 space-y-1">
          <div>TIME: {currentTime.toLocaleTimeString()}</div>
          <div>DATE: {currentTime.toLocaleDateString()}</div>
        </div>
      </div>

      {/* Floating tech nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-400 font-mono text-xs opacity-30"
            style={{
              left: `${(i * 15 + 10) % 85}%`,
              top: `${(i * 20 + 25) % 75}%`
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {['AI', 'ML', 'JS', 'PY', 'React', 'Next'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
