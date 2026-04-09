import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Detect device capability
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false
    const isMobile = window.innerWidth < 768

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    let mouseX = 0
    let mouseY = 0
    let lastMouseX = 0
    let lastMouseY = 0
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Create particles - reduce count on mobile/low-end devices
    const createParticles = () => {
      particles = []
      let particleCount = Math.min(50, Math.floor(window.innerWidth / 30))
      
      if (isMobile) particleCount = Math.floor(particleCount * 0.5)
      if (isLowEnd) particleCount = Math.floor(particleCount * 0.6)
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6'
        })
      }
    }

    // Throttled mouse move handler
    let lastMouseMoveTime = 0
    const mouseMoveThrottle = 16 // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseMoveTime < mouseMoveThrottle) return
      
      lastMouseX = mouseX
      mouseX = e.clientX
      mouseY = e.clientY
      lastMouseMoveTime = now
    }

    let isTabVisible = true
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden
    }

    const animate = () => {
      // Skip rendering if tab is not visible
      if (!isTabVisible) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Mouse interaction - only if mouse has moved significantly
        const mouseDeltaX = Math.abs(mouseX - lastMouseX)
        const mouseDeltaY = Math.abs(mouseY - lastMouseY)
        
        if (mouseDeltaX > 2 || mouseDeltaY > 2) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const force = (150 - distance) / 150
            particle.vx -= dx * force * 0.0001
            particle.vy -= dy * force * 0.0001
          }
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary collision with damping
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x))
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y))
        }

        // Draw particle with GPU-friendly operations
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()

        // Draw connections - only to nearby particles (performance optimization)
        if (!isMobile) {
          particles.slice(index + 1, index + 5).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              const opacity = (100 - distance) / 100 * 0.1
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ y: backgroundY, willChange: 'transform' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}

export default InteractiveBackground
