import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  isLowPerformance: boolean
  shouldReduceEffects: boolean
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLowPerformance: false,
    shouldReduceEffects: false,
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        setMetrics({
          fps,
          isLowPerformance: fps < 30,
          shouldReduceEffects: fps < 45,
        })

        frameCount = 0
        lastTime = currentTime
      }

      animationFrameId = requestAnimationFrame(measureFPS)
    }

    animationFrameId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return metrics
}

// Device capability detection
export const useDeviceCapability = () => {
  const [capability, setCapability] = useState({
    isMobile: false,
    isLowEnd: false,
    cores: navigator.hardwareConcurrency || 4,
    memory: (navigator as any).deviceMemory || 4,
  })

  useEffect(() => {
    const checkCapability = () => {
      const isMobile = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      const cores = navigator.hardwareConcurrency || 4
      const memory = (navigator as any).deviceMemory || 4
      const isLowEnd = cores <= 4 || memory <= 4

      setCapability({ isMobile, isLowEnd, cores, memory })
    }

    checkCapability()
    window.addEventListener('resize', checkCapability)
    return () => window.removeEventListener('resize', checkCapability)
  }, [])

  return capability
}
