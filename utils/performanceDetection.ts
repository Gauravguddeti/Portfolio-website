'use client'

/**
 * Simple, robust visual fallback detection
 * Detects low-end devices, hardware acceleration disabled, or user preferences
 * Returns true if heavy visuals should be disabled
 */
export function isVisualFallbackRequired(): boolean {
  if (typeof window === 'undefined') return false

  // 1. User explicitly prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true
  }

  // 2. Very low device memory (< 2GB)
  if ('deviceMemory' in navigator) {
    const deviceMemory = (navigator as any).deviceMemory
    if (deviceMemory && deviceMemory < 2) {
      return true
    }
  }

  // 3. Hardware acceleration detection (WebGL availability)
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      return true // No WebGL = no hardware acceleration
    }

    // Check for software rendering
    const webglContext = gl as WebGLRenderingContext
    const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      if (typeof renderer === 'string') {
        // Software rendering indicators
        if (renderer.includes('Software') || 
            renderer.includes('Microsoft Basic') ||
            renderer.includes('GDI Generic') ||
            renderer.includes('llvmpipe')) {
          return true
        }
      }
    }
  } catch {
    return true // WebGL test failed = assume no hardware acceleration
  }

  // 4. Very old mobile devices
  const userAgent = navigator.userAgent.toLowerCase()
  if (/android [1-4]|iphone os [1-8]|ipad os [1-8]|windows phone/i.test(userAgent)) {
    return true
  }

  return false
}
