import { useEffect, useRef, useState } from 'react'

interface CursorPosition {
  x: number
  y: number
}

const CustomCursor = () => {
  const innerCursor = useRef<HTMLDivElement>(null)
  const outerCursor = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const innerPositionRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const outerPositionRef = useRef<CursorPosition>({ x: 0, y: 0 })
  
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    
    if (prefersReducedMotion || isTouch) {
      setIsVisible(false)
      return
    }

    let isMoving = false
    let animationPaused = false

    const handlePointerMove = (e: PointerEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
      isMoving = true
    }

    const handleVisibilityChange = () => {
      animationPaused = document.hidden
    }

    const animate = () => {
      if (isMoving && !animationPaused && innerCursor.current && outerCursor.current) {
        const targetX = positionRef.current.x
        const targetY = positionRef.current.y

        // Inner cursor - snappy follow (ease ~ 0.35)
        innerPositionRef.current.x += (targetX - innerPositionRef.current.x) * 0.35
        innerPositionRef.current.y += (targetY - innerPositionRef.current.y) * 0.35

        // Outer cursor - laggy follow for hula-hoop effect (ease ~ 0.12)
        outerPositionRef.current.x += (targetX - outerPositionRef.current.x) * 0.12
        outerPositionRef.current.y += (targetY - outerPositionRef.current.y) * 0.12

        // Apply transforms
        innerCursor.current.style.transform = `translate3d(${innerPositionRef.current.x - 5}px, ${innerPositionRef.current.y - 5}px, 0)`
        outerCursor.current.style.transform = `translate3d(${outerPositionRef.current.x - 20}px, ${outerPositionRef.current.y - 20}px, 0)`
      }
      
      requestRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    requestRef.current = requestAnimationFrame(animate)

    // Add pointer move listener
    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Handle cursor hide/show
    const handlePointerLeave = () => {
      if (innerCursor.current && outerCursor.current) {
        innerCursor.current.style.opacity = '0'
        outerCursor.current.style.opacity = '0'
      }
    }

    const handlePointerEnter = () => {
      if (innerCursor.current && outerCursor.current) {
        innerCursor.current.style.opacity = '1'
        outerCursor.current.style.opacity = '1'
      }
    }

    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerenter', handlePointerEnter)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerenter', handlePointerEnter)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Inner dot */}
      <div
        ref={innerCursor}
        className="cursor-inner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      
      {/* Outer ring */}
      <div
        ref={outerCursor}
        className="cursor-outer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '2px solid rgba(59, 130, 246, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default CustomCursor
