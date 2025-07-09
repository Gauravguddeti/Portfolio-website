'use client'

/**
 * Strict low-power mode detection
 * Only activates for systems with NO hardware acceleration or mobile devices
 * Desktop systems with GPU should run full visuals
 */
export function isLowPowerMode(): boolean {
  if (typeof window === 'undefined') return false

  // 1. Mobile devices only (not tablets with good performance)
  const isMobile = /android.*mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent)
  if (isMobile) {
    return true
  }

  // 2. User explicitly prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true
  }

  // 3. WebGL completely unavailable (no hardware acceleration)
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      console.log('🔋 Low-power mode: No WebGL available')
      return true // No WebGL = no hardware acceleration
    }

    // 4. Check for software rendering (hardware acceleration disabled)
    const webglContext = gl as WebGLRenderingContext
    const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      if (typeof renderer === 'string') {
        const softwareIndicators = [
          'software', 'microsoft basic render driver', 'gdi generic', 
          'llvmpipe', 'mesa software', 'swiftshader'
        ]
        const hasSoftwareRendering = softwareIndicators.some(indicator => 
          renderer.toLowerCase().includes(indicator)
        )
        if (hasSoftwareRendering) {
          console.log('🔋 Low-power mode: Software rendering detected -', renderer)
          return true
        }
      }
    }

    // 5. Test GPU performance with a simple operation
    const testTexture = webglContext.createTexture()
    if (!testTexture) {
      console.log('🔋 Low-power mode: GPU texture creation failed')
      return true
    }
    webglContext.deleteTexture(testTexture)

  } catch (error) {
    console.log('🔋 Low-power mode: WebGL test failed -', error)
    return true // WebGL test failed = assume no hardware acceleration
  }

  // 6. Very low device memory (< 2GB) - only extreme cases
  if ('deviceMemory' in navigator) {
    const deviceMemory = (navigator as any).deviceMemory
    if (deviceMemory && deviceMemory < 2) {
      console.log('🔋 Low-power mode: Very low device memory -', deviceMemory, 'GB')
      return true
    }
  }

  console.log('⚡ High-power mode: Hardware acceleration available')
  return false
}

// Legacy function for backward compatibility
export function isVisualFallbackRequired(): boolean {
  return isLowPowerMode()
}
