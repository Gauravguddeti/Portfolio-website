'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export const OptimizedCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) return () => window.removeEventListener('resize', checkMobile)

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHover = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)
    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    document.querySelectorAll('button, a, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('resize', checkMobile)
    }
  }, [cursorX, cursorY, isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Inner dot - main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] w-3 h-3 bg-primary-400 rounded-full shadow-lg"
        style={{
          x: cursorX,
          y: cursorY,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: isClicking ? 0.8 : isHovering ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      
      {/* Ring that hangs on the inner circle like a ring on finger */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-8 h-8 border-2 border-primary-400/60 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isClicking ? 1.2 : isHovering ? 1.4 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </>
  )
}
