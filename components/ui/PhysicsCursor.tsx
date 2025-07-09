'use client'

import { useState, useEffect, useRef } from 'react'

export const PhysicsCursor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [outerPos, setOuterPos] = useState({ x: 0, y: 0 })
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    // Check if should show cursor (only on high-end devices)
    const isLowPowerMode = document.body.classList.contains('low-power-mode')
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isGPUAccelerated = (() => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        return !!(gl && gl instanceof WebGLRenderingContext)
      } catch {
        return false
      }
    })()

    setIsVisible(!isLowPowerMode && !isMobile && isGPUAccelerated)

    // Listen for low-power mode changes
    const observer = new MutationObserver(() => {
      const newLowPowerMode = document.body.classList.contains('low-power-mode')
      setIsVisible(!newLowPowerMode && !isMobile && isGPUAccelerated)
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Update inner cursor immediately
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animateOuterCursor = () => {
      setOuterPos(prev => {
        const newX = prev.x + (mousePos.x - prev.x) / 8
        const newY = prev.y + (mousePos.y - prev.y) / 8
        
        // Update outer cursor with spring effect
        if (outerRef.current) {
          outerRef.current.style.transform = `translate(${newX - 15}px, ${newY - 15}px)`
        }
        
        return { x: newX, y: newY }
      })
      
      animationRef.current = requestAnimationFrame(animateOuterCursor)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animationRef.current = requestAnimationFrame(animateOuterCursor)

    // Hide default cursor on body
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      document.body.style.cursor = 'auto'
    }
  }, [isVisible, mousePos.x, mousePos.y])

  if (!isVisible) return null

  return (
    <>
      {/* Inner cursor */}
      <div
        ref={innerRef}
        className="custom-cursor-inner"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          backgroundColor: '#00ffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'transform 0.15s ease-out'
        }}
      />
      
      {/* Outer cursor */}
      <div
        ref={outerRef}
        className="custom-cursor-outer"
        style={{
          position: 'fixed',
          width: '30px',
          height: '30px',
          border: '2px solid rgba(0, 255, 255, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'transform 0.15s ease-out'
        }}
      />
    </>
  )
}
