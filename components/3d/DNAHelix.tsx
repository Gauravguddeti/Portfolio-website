'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export const DNAHelix = () => {
  const [rotation, setRotation] = useState(0)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const helixPoints = []
  const numPoints = 20
  const radius = 60
  const height = 300

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 4
    const y = (i / numPoints) * height
    
    helixPoints.push({
      x1: Math.cos(angle + rotation * Math.PI / 180) * radius + 100,
      y1: y + 50,
      x2: Math.cos(angle + Math.PI + rotation * Math.PI / 180) * radius + 100,
      y2: y + 50,
      angle: angle + rotation * Math.PI / 180
    })
  }

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-cursor="neural"
    >
      <svg width="200" height="400" className="overflow-visible">
        {/* DNA strands */}
        {helixPoints.map((point, index) => (
          <g key={index}>
            {/* Left strand */}
            <motion.circle
              cx={point.x1}
              cy={point.y1}
              r={hovering ? 6 : 4}
              fill="#0ea5e9"
              animate={{
                fill: hovering ? '#38bdf8' : '#0ea5e9',
                scale: hovering ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 0.3,
                repeat: hovering ? Infinity : 0
              }}
            />
            
            {/* Right strand */}
            <motion.circle
              cx={point.x2}
              cy={point.y2}
              r={hovering ? 6 : 4}
              fill="#7dd3fc"
              animate={{
                fill: hovering ? '#bae6fd' : '#7dd3fc',
                scale: hovering ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 0.3,
                repeat: hovering ? Infinity : 0,
                delay: 0.1
              }}
            />
            
            {/* Connecting line */}
            <motion.line
              x1={point.x1}
              y1={point.y1}
              x2={point.x2}
              y2={point.y2}
              stroke="#374151"
              strokeWidth={hovering ? 2 : 1}
              opacity={hovering ? 0.8 : 0.4}
              animate={{
                stroke: hovering ? '#0ea5e9' : '#374151'
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Data points */}
            {index % 3 === 0 && (
              <motion.circle
                cx={(point.x1 + point.x2) / 2}
                cy={(point.y1 + point.y2) / 2}
                r={2}
                fill="#fbbf24"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            )}
          </g>
        ))}
        
        {/* Connecting spiral */}
        <motion.path
          d={`M ${helixPoints[0]?.x1} ${helixPoints[0]?.y1} ${helixPoints.map(p => `L ${p.x1} ${p.y1}`).join(' ')}`}
          fill="none"
          stroke="#0ea5e9"
          strokeWidth={2}
          opacity={0.3}
          strokeDasharray="4,4"
          animate={{
            strokeDashoffset: [0, 8]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.path
          d={`M ${helixPoints[0]?.x2} ${helixPoints[0]?.y2} ${helixPoints.map(p => `L ${p.x2} ${p.y2}`).join(' ')}`}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth={2}
          opacity={0.3}
          strokeDasharray="4,4"
          animate={{
            strokeDashoffset: [8, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
      
      {hovering && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-dark-800 text-primary-400 px-3 py-1 rounded-lg text-sm font-mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          AI/ML Data Structure
        </motion.div>
      )}
    </div>
  )
}
