'use client'

import { useEffect, useRef } from 'react'

// Memory management utility
export const useMemoryOptimization = () => {
  const cleanupRef = useRef<Array<() => void>>([])

  const addCleanup = (cleanup: () => void) => {
    cleanupRef.current.push(cleanup)
  }

  const forceCleanup = () => {
    cleanupRef.current.forEach(cleanup => cleanup())
    cleanupRef.current = []
  }

  useEffect(() => {
    const handleMemoryWarning = () => {
      // Force cleanup on memory pressure
      forceCleanup()
      
      // Force garbage collection if available
      if (window.gc) {
        window.gc()
      }
    }

    // Listen for memory pressure events
    if ('memory' in performance) {
      const checkMemory = () => {
        const memInfo = (performance as any).memory
        if (memInfo && memInfo.usedJSHeapSize > memInfo.totalJSHeapSize * 0.8) {
          handleMemoryWarning()
        }
      }
      
      const interval = setInterval(checkMemory, 30000) // Check every 30 seconds
      addCleanup(() => clearInterval(interval))
    }

    return () => {
      forceCleanup()
    }
  }, [])

  return { addCleanup, forceCleanup }
}

// Performance monitoring component
export const PerformanceMonitor = ({ children }: { children: React.ReactNode }) => {
  const { addCleanup } = useMemoryOptimization()

  useEffect(() => {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn('Long task detected:', entry.duration + 'ms')
          }
        })
      })

      observer.observe({ entryTypes: ['longtask'] })
      addCleanup(() => observer.disconnect())
    }

    // Monitor memory usage
    if (process.env.NODE_ENV === 'development') {
      const logMemoryUsage = () => {
        if ('memory' in performance) {
          const memInfo = (performance as any).memory
          console.log('Memory usage:', {
            used: Math.round(memInfo.usedJSHeapSize / 1024 / 1024) + 'MB',
            total: Math.round(memInfo.totalJSHeapSize / 1024 / 1024) + 'MB',
            limit: Math.round(memInfo.jsHeapSizeLimit / 1024 / 1024) + 'MB'
          })
        }
      }
      
      const interval = setInterval(logMemoryUsage, 60000) // Log every minute
      addCleanup(() => clearInterval(interval))
    }
  }, [addCleanup])

  return <>{children}</>
}

// Animation frame optimization
export const useAnimationFrame = (callback: (time: number) => void, dependencies: any[] = []) => {
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, dependencies)
}

// Intersection observer optimization
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => callback(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [callback, options])
}
