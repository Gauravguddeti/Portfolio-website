'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'

const ASCIIDonutComponent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLPreElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const donut = canvasRef.current
    if (!donut) return

    let A = 0, B = 0
    
    const animate = () => {
      let b: string[] = []
      let z: number[] = []
      A += 0.07
      B += 0.03

      const width = 60, height = 22
      const background = ' '
      const chars = '.,-~:;=!*#$@'

      for (let k = 0; k < width * height; k++) {
        b[k] = background
        z[k] = 0
      }

      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          const c = Math.sin(i)
          const d = Math.cos(j)
          const e = Math.sin(A)
          const f = Math.sin(j)
          const g = Math.cos(A)
          const h = d + 2
          const D = 1 / (c * h * e + f * g + 5)
          const l = Math.cos(i)
          const m = Math.cos(B)
          const n = Math.sin(B)
          const t = c * h * g - f * e
          const x = Math.floor(width / 2 + width * 0.4 * D * (l * h * m - t * n))
          const y = Math.floor(height / 2 + height * 0.2 * D * (l * h * n + t * m))
          const o = x + width * y
          const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n))
          if (height > y && y > 0 && x > 0 && width > x && D > z[o]) {
            z[o] = D
            b[o] = chars[Math.max(0, N)]
          }
        }
      }

      // Convert array to string with proper line breaks
      let output = ''
      for (let k = 0; k < height; k++) {
        output += b.slice(k * width, (k + 1) * width).join('') + '\n'
      }
      
      donut.textContent = output
    }

    if (isVisible) {
      intervalRef.current = setInterval(animate, 50)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isVisible])

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.pre
      ref={canvasRef}
      className="ascii-donut-bg"
      id="ascii-donut"
      style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'monospace',
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.06)',
        opacity: 0.06,
        whiteSpace: 'pre',
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        willChange: 'contents'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      transition={{ duration: 2 }}
    />
  )
}

// Fallback static donut for low-power devices
const StaticDonutFallback = () => (
  <div 
    className="ascii-donut-bg"
    id="ascii-donut-static"
    style={{ 
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'monospace',
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.06)',
      opacity: 0.06,
      whiteSpace: 'pre',
      pointerEvents: 'none',
      zIndex: 0,
      userSelect: 'none'
    }}
  >
    <pre>{`         ###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###
       #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@                @@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@                  @@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@                      @@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@                      @@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@                  @@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@                @@@@@@@@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
       #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
         ###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###`}</pre>
  </div>
)

export const ASCIIDonut = () => {
  const [hasJavaScript, setHasJavaScript] = useState(false)
  const [isLowPower, setIsLowPower] = useState(true) // Default to low power

  useEffect(() => {
    setHasJavaScript(true)
    
    // Check if in low-power mode or mobile
    const checkPowerMode = () => {
      const isLowPowerMode = document.body.classList.contains('low-power-mode')
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isGPUAccelerated = (() => {
        try {
          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
          return !!(gl && gl instanceof WebGLRenderingContext)
        } catch {
          return false
        }
      })()
      
      setIsLowPower(isLowPowerMode || isMobile || !isGPUAccelerated)
    }
    
    checkPowerMode()
    
    // Listen for low-power mode changes
    const observer = new MutationObserver(checkPowerMode)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Only show animated donut on high-end devices
  if (!hasJavaScript || isLowPower) {
    return <StaticDonutFallback />
  }

  return (
    <Suspense fallback={<StaticDonutFallback />}>
      <ASCIIDonutComponent />
    </Suspense>
  )
}
