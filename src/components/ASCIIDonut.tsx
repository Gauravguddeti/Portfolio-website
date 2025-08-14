import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ASCIIDonut = () => {
  const [rotation, setRotation] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.03) % (Math.PI * 2))
    }, 50)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX - window.innerWidth / 2) * 0.00005,
        y: (e.clientY - window.innerHeight / 2) * 0.00005
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const generateDonut = () => {
    const chars = '.,-~:;=!*#$@'
    const result = []
    const R1 = 1
    const R2 = 2
    const K2 = 5
    const K1 = 30 * K2 * 3 / (8 * (R1 + R2))
    
    // Increased size - more rows and columns
    for (let i = 0; i < 50; i++) {
      let line = ''
      for (let j = 0; j < 160; j++) {
        const A = rotation + mousePosition.x * 15
        const B = rotation * 1.3 + mousePosition.y * 15
        
        const sinA = Math.sin(A), cosA = Math.cos(A)
        const sinB = Math.sin(B), cosB = Math.cos(B)
        
        const theta = (j - 80) * 0.05 // Adjusted center
        const phi = (i - 25) * 0.1 // Adjusted center
        
        const costheta = Math.cos(theta), sintheta = Math.sin(theta)
        const cosphi = Math.cos(phi), sinphi = Math.sin(phi)
        
        const circlex = R2 + R1 * costheta
        const circley = R1 * sintheta
        
        const x = circlex * (cosB * cosphi + sinA * sinB * sinphi) - circley * cosA * sinB
        const y = circlex * (sinB * cosphi - sinA * cosB * sinphi) + circley * cosA * cosB
        const z = K2 + cosA * circlex * sinphi + circley * sinA
        const ooz = 1 / z
        
        const xp = Math.floor(80 + K1 * ooz * x) // Adjusted center
        const yp = Math.floor(25 + K1 * ooz * y) // Adjusted center
        
        const L = cosphi * costheta * sinB - cosA * costheta * sinphi - sinA * sintheta + cosB * (cosA * sintheta - costheta * sinA * sinphi)
        
        if (L > 0 && xp >= 0 && xp < 160 && yp >= 0 && yp < 50) {
          const luminance_index = Math.floor(L * 8)
          line += chars[Math.min(luminance_index, chars.length - 1)]
        } else {
          line += ' '
        }
      }
      result.push(line)
    }
    return result
  }

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
    >
      <div className="font-mono text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem] text-blue-400/15 leading-tight select-none whitespace-pre transform scale-125">
        {generateDonut().map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </motion.div>
  )
}

export default ASCIIDonut
