'use client'

import { useEffect } from 'react'
import { isVisualFallbackRequired } from '@/utils/performanceDetection'

/**
 * Simple visual fallback manager
 * Runs detection once on client-side and applies .visual-fallback class if needed
 * No UI, no warnings, completely silent
 */
export function VisualFallbackManager() {
  useEffect(() => {
    // Only run detection once when component mounts
    const shouldUseFallback = isVisualFallbackRequired()
    
    if (shouldUseFallback) {
      document.body.classList.add('visual-fallback')
      // Silent console log for debugging (remove in production if needed)
      console.log('Visual fallback enabled for optimal performance')
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
      (window as any).toggleVisualFallback = () => {
        document.body.classList.toggle('visual-fallback')
        const isEnabled = document.body.classList.contains('visual-fallback')
        console.log('Visual fallback:', isEnabled ? 'ENABLED' : 'DISABLED')
      }
      
      (window as any).checkVisualFallback = () => {
        const isEnabled = document.body.classList.contains('visual-fallback')
        console.log('Visual fallback status:', isEnabled ? 'ENABLED' : 'DISABLED')
        return isEnabled
      }
      
      console.log('🧪 Dev tools available:')
      console.log('- window.toggleVisualFallback() - Toggle visual fallback mode')
      console.log('- window.checkVisualFallback() - Check current status')
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, []) // Empty dependency array = run only once

  return null // No UI component
}
