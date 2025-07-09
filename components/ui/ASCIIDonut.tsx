'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'

const ASCIIDonutComponent = () => {
  const [donutFrames, setDonutFrames] = useState<string[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLPreElement>(null)
  const animationRef = useRef<number>()

  // Generate ASCII donut frames
  const generateDonutFrames = () => {
    const frames: string[] = []
    const frameCount = 60 // Smooth 60 frame animation
    
    for (let frame = 0; frame < frameCount; frame++) {
      const A = frame * 0.1 // Rotation around X-axis
      const B = frame * 0.07 // Rotation around Z-axis
      
      const cosA = Math.cos(A), sinA = Math.sin(A)
      const cosB = Math.cos(B), sinB = Math.sin(B)
      
      const width = 60 // Increased size for main background
      const height = 30
      const output: string[] = Array(height).fill('').map(() => ' '.repeat(width))
      const zbuffer: number[] = Array(width * height).fill(0)
      
      // Generate donut
      for (let theta = 0; theta < 6.28; theta += 0.07) { // Circle around tube
        const cosTheta = Math.cos(theta), sinTheta = Math.sin(theta)
        
        for (let phi = 0; phi < 6.28; phi += 0.02) { // Circle around donut
          const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi)
          
          // 3D coordinates (before rotation)
          const circleX = cosTheta
          const circleY = sinTheta
          const circleZ = 0
          
          // Apply rotations
          const x = circleX * (cosB * cosPhi + sinA * sinB * sinPhi) - circleY * cosA * sinB
          const y = circleX * (sinB * cosPhi - sinA * cosB * sinPhi) + circleY * cosA * cosB
          const z = cosA * circleX * sinPhi + circleY * sinA + 4
          
          const ooz = 1 / z // One over Z (for perspective)
          
          // Project to 2D with larger scale
          const xp = Math.floor(width / 2 + 20 * ooz * x) // Increased scale
          const yp = Math.floor(height / 2 + 10 * ooz * y) // Increased scale
          
          if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
            const idx = xp + yp * width
            if (ooz > zbuffer[idx]) {
              zbuffer[idx] = ooz
              
              // Calculate luminance for character selection
              const luminance = cosPhi * cosTheta * sinB - cosA * cosTheta * sinPhi - 
                               sinA * sinTheta + cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi)
              
              const luminanceIndex = Math.floor(luminance * 8)
              const chars = '.,-~:;=!*#$@'
              const char = chars[Math.max(0, Math.min(chars.length - 1, luminanceIndex + 5))]
              
              // Update output array
              const line = output[yp].split('')
              line[xp] = char
              output[yp] = line.join('')
            }
          }
        }
      }
      
      frames.push(output.join('\n'))
    }
    
    return frames
  }

  // Initialize donut animation
  useEffect(() => {
    console.log('🍩 ASCIIDonut: Generating frames...')
    const frames = generateDonutFrames()
    setDonutFrames(frames)
    console.log('🍩 ASCIIDonut: Generated', frames.length, 'frames')
  }, [])

  // Animation loop with RAF for smooth 60fps
  useEffect(() => {
    if (!isVisible || donutFrames.length === 0) {
      console.log('🍩 ASCIIDonut: Animation paused -', { isVisible, frameCount: donutFrames.length })
      return
    }

    console.log('🍩 ASCIIDonut: Starting animation loop')
    let lastTime = 0
    const targetFPS = 15 // Slower for ASCII effect
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        setCurrentFrame(prev => {
          const newFrame = (prev + 1) % donutFrames.length
          // Log every 30 frames to avoid spam
          if (newFrame % 30 === 0) {
            console.log('🍩 ASCIIDonut: Frame', newFrame, '/', donutFrames.length)
          }
          return newFrame
        })
        lastTime = currentTime
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        console.log('🍩 ASCIIDonut: Animation stopped')
      }
    }
  }, [isVisible, donutFrames])

  // Intersection observer for performance
  useEffect(() => {
    console.log('🍩 ASCIIDonut: Setting up intersection observer')
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        console.log('🍩 ASCIIDonut: Visibility changed -', visible)
        setIsVisible(visible)
      },
      { threshold: 0.1 }
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
      console.log('🍩 ASCIIDonut: Observer attached to element')
    } else {
      console.log('🍩 ASCIIDonut: No element to observe yet')
    }

    return () => {
      observer.disconnect()
      console.log('🍩 ASCIIDonut: Observer disconnected')
    }
  }, [])

  if (donutFrames.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="text-primary-400/50 text-xs font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <motion.pre
      ref={canvasRef}
      className="ascii-donut-bg"
      id="ascii-donut"
      style={{
        position: 'absolute',
        fontFamily: 'Courier New, monospace',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.08)',
        zIndex: 0, // Proper z-index for layering
        pointerEvents: 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateZ(0)', 
        whiteSpace: 'pre',
        userSelect: 'none',
        willChange: 'contents',
        display: 'block',
        width: 'auto',
        height: 'auto',
        lineHeight: '1'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {donutFrames[currentFrame]}
    </motion.pre>
  )
}

// Fallback static donut
const StaticDonutFallback = () => (
  <div className="ascii-donut-bg"
       id="ascii-donut-static"
       style={{ 
         position: 'absolute',
         fontFamily: 'Courier New, monospace',
         fontSize: '12px',
         color: 'rgba(255, 255, 255, 0.08)',
         zIndex: 0, // Proper z-index
         pointerEvents: 'none',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         whiteSpace: 'pre',
         userSelect: 'none',
         display: 'block',
         width: 'auto',
         height: 'auto',
         lineHeight: '1'
       }}>
    <pre>{`
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@                            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@                            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@                            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    `}</pre>
  </div>
)

export const ASCIIDonut = () => {
  const [hasJavaScript, setHasJavaScript] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    setHasJavaScript(true)
    // Check if in low-power mode
    setIsLowPower(document.body.classList.contains('low-power-mode'))
    
    // Listen for low-power mode changes
    const observer = new MutationObserver(() => {
      setIsLowPower(document.body.classList.contains('low-power-mode'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Always render animated donut unless in low-power mode
  if (!hasJavaScript || isLowPower) {
    return <StaticDonutFallback />
  }

  return (
    <Suspense fallback={<StaticDonutFallback />}>
      <ASCIIDonutComponent />
    </Suspense>
  )
}
