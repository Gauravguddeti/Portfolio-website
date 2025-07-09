'use client'

import { useEffect } from 'react'
import { isLowPowerMode } from '@/utils/performanceDetection'

/**
 * Low-power mode manager
 * Automatically detects low-end devices and applies .low-power-mode class
 * Shows indicator when fallback mode is active
 */
export function VisualFallbackManager() {
  useEffect(() => {
    // Run detection once when component mounts
    const shouldUseLowPowerMode = isLowPowerMode()
    
    if (shouldUseLowPowerMode) {
      document.body.classList.add('low-power-mode')
      console.log('🔋 Low-power mode enabled for optimal performance')
    } else {
      document.body.classList.remove('low-power-mode')
      console.log('⚡ High-power mode enabled')
    }

    // Tab visibility handling for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add('tab-hidden')
      } else {
        document.body.classList.remove('tab-hidden')
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Development utilities
    if (process.env.NODE_ENV === 'development') {
      (window as any).toggleLowPowerMode = () => {
        document.body.classList.toggle('low-power-mode')
        const isEnabled = document.body.classList.contains('low-power-mode')
        console.log('🔋 Low-power mode:', isEnabled ? 'ENABLED' : 'DISABLED')
      }
      
      (window as any).checkLowPowerMode = () => {
        const isEnabled = document.body.classList.contains('low-power-mode')
        console.log('🔋 Low-power mode status:', isEnabled ? 'ENABLED' : 'DISABLED')
        return isEnabled
      }
      
      console.log('🧪 Dev tools available:')
      console.log('- window.toggleLowPowerMode() - Toggle low-power mode')
      console.log('- window.checkLowPowerMode() - Check current status')
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, []) // Empty dependency array = run only once

  return null // No UI component
}
