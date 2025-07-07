'use client'

import { useEffect, useState, useCallback } from 'react'

interface PerformanceMetrics {
  fps: number
  frameTime: number
  isLowPowerMode: boolean
  hardwareAcceleration: boolean
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    isLowPowerMode: false,
    hardwareAcceleration: true
  })

  const runHardwareTest = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        resolve(false)
        return
      }

      // Test 1: GPU acceleration check
      const startTime = performance.now()
      
      // Draw complex shapes that would benefit from GPU acceleration
      for (let i = 0; i < 500; i++) {
        ctx.fillStyle = `hsl(${i % 360}, 70%, 50%)`
        ctx.fillRect(
          Math.random() * 200,
          Math.random() * 200,
          Math.random() * 20,
          Math.random() * 20
        )
      }
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Test 2: WebGL support
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const hasWebGL = !!gl
      
      // Test 3: Hardware acceleration heuristics
      const hasHardwareAcceleration = renderTime < 30 && hasWebGL
      
      resolve(hasHardwareAcceleration)
    })
  }, [])

  const startFPSMonitoring = useCallback(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let frameTimes: number[] = []
    
    const measureFrame = (currentTime: number) => {
      frameCount++
      const frameTime = currentTime - lastTime
      frameTimes.push(frameTime)
      
      // Keep only last 60 frame times
      if (frameTimes.length > 60) {
        frameTimes.shift()
      }
      
      // Calculate metrics every 30 frames
      if (frameCount % 30 === 0) {
        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length
        const fps = 1000 / avgFrameTime
        
        setMetrics(prev => ({
          ...prev,
          fps: Math.round(fps),
          frameTime: Math.round(avgFrameTime * 100) / 100
        }))
        
        // Enable low power mode if FPS is consistently low
        if (fps < 30) {
          setMetrics(prev => ({
            ...prev,
            isLowPowerMode: true
          }))
          document.body.classList.add('low-power-mode')
        } else if (fps > 50) {
          setMetrics(prev => ({
            ...prev,
            isLowPowerMode: false
          }))
          document.body.classList.remove('low-power-mode')
        }
      }
      
      lastTime = currentTime
      requestAnimationFrame(measureFrame)
    }
    
    requestAnimationFrame(measureFrame)
  }, [])

  useEffect(() => {
    // Run hardware acceleration test
    runHardwareTest().then(hasHardwareAcceleration => {
      setMetrics(prev => ({
        ...prev,
        hardwareAcceleration: hasHardwareAcceleration,
        isLowPowerMode: !hasHardwareAcceleration
      }))
      
      if (!hasHardwareAcceleration) {
        document.body.classList.add('low-power-mode')
      }
    })
    
    // Start FPS monitoring
    startFPSMonitoring()
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setMetrics(prev => ({
        ...prev,
        isLowPowerMode: true
      }))
      document.body.classList.add('low-power-mode')
    }
    
    // Check for low battery (if supported)
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2) {
          setMetrics(prev => ({
            ...prev,
            isLowPowerMode: true
          }))
          document.body.classList.add('low-power-mode')
        }
      })
    }
    
  }, [runHardwareTest, startFPSMonitoring])

  return metrics
}

export default usePerformanceMonitor
