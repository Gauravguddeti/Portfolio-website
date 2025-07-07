'use client'

import { useState, useEffect, useRef } from 'react'

interface PerformanceMonitorProps {
  onLowPowerMode: (enabled: boolean) => void
}

export const PerformanceMonitor = ({ onLowPowerMode }: PerformanceMonitorProps) => {
  const [fps, setFps] = useState(60)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const frameCount = useRef(0)
  const lastTime = useRef(Date.now())
  const animationRef = useRef<number>()

  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++
      const now = Date.now()
      const elapsed = now - lastTime.current

      if (elapsed >= 1000) {
        const currentFPS = (frameCount.current * 1000) / elapsed
        setFps(Math.round(currentFPS))
        
        // Enable low power mode if FPS is consistently below 30
        if (currentFPS < 30 && !isLowPowerMode) {
          setIsLowPowerMode(true)
          onLowPowerMode(true)
          document.body.classList.add('low-power-mode')
        } else if (currentFPS >= 50 && isLowPowerMode) {
          setIsLowPowerMode(false)
          onLowPowerMode(false)
          document.body.classList.remove('low-power-mode')
        }
        
        frameCount.current = 0
        lastTime.current = now
      }
      
      animationRef.current = requestAnimationFrame(measureFPS)
    }

    // Initial hardware acceleration test
    const canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Test GPU acceleration by drawing complex shapes
      const startTime = performance.now()
      for (let i = 0; i < 1000; i++) {
        ctx.fillRect(Math.random() * 100, Math.random() * 100, 10, 10)
      }
      const endTime = performance.now()
      
      // If rendering takes too long, enable low power mode immediately
      if (endTime - startTime > 50) {
        setIsLowPowerMode(true)
        onLowPowerMode(true)
        document.body.classList.add('low-power-mode')
      }
    }

    animationRef.current = requestAnimationFrame(measureFPS)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [onLowPowerMode, isLowPowerMode])

  // Don't render anything in production, this is just for monitoring
  return null
}
