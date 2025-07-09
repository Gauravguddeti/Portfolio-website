'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

export function PerformanceTracker() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track performance metrics
    const trackMetrics = () => {
      // First Contentful Paint
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
      }

      // Time to First Byte
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navEntry) {
        setMetrics(prev => ({ ...prev, ttfb: navEntry.responseStart - navEntry.requestStart }))
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
            })
          })
          fidObserver.observe({ entryTypes: ['first-input'] })

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            })
            setMetrics(prev => ({ ...prev, cls: clsValue }))
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })

          return () => {
            lcpObserver.disconnect()
            fidObserver.disconnect()
            clsObserver.disconnect()
          }
        } catch (error) {
          console.log('Performance Observer not supported:', error)
        }
      }
    }

    // Track after page load
    if (document.readyState === 'complete') {
      trackMetrics()
    } else {
      window.addEventListener('load', trackMetrics)
      return () => window.removeEventListener('load', trackMetrics)
    }
  }, [])

  // Log metrics for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && metrics.lcp !== null) {
      console.log('🚀 Performance Metrics:', {
        'First Contentful Paint': metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
        'Largest Contentful Paint': metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
        'First Input Delay': metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
        'Cumulative Layout Shift': metrics.cls ? metrics.cls.toFixed(4) : 'N/A',
        'Time to First Byte': metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A'
      })

      // Performance recommendations
      const recommendations = []
      if (metrics.fcp && metrics.fcp > 1800) recommendations.push('⚠️ Slow First Contentful Paint')
      if (metrics.lcp && metrics.lcp > 2500) recommendations.push('⚠️ Slow Largest Contentful Paint')
      if (metrics.fid && metrics.fid > 100) recommendations.push('⚠️ High First Input Delay')
      if (metrics.cls && metrics.cls > 0.1) recommendations.push('⚠️ High Cumulative Layout Shift')
      if (metrics.ttfb && metrics.ttfb > 600) recommendations.push('⚠️ Slow Time to First Byte')

      if (recommendations.length > 0) {
        console.warn('Performance Issues:', recommendations)
      } else {
        console.log('✅ Good performance metrics!')
      }
    }
  }, [metrics])

  return null // No UI component
}
