'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import usePerformanceMonitor from '@/hooks/usePerformanceMonitor'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
  id: string
}

interface Trail {
  x: number
  y: number
  opacity: number
  timestamp: number
}

interface FloatingLog {
  x: number
  y: number
  vx: number
  vy: number
  text: string
  opacity: number
  life: number
  maxLife: number
  id: string
}

export const InteractiveCursorBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [trails, setTrails] = useState<Trail[]>([])
  const [floatingLogs, setFloatingLogs] = useState<FloatingLog[]>([])
  const frameCount = useRef(0)
  
  // Use performance monitoring hook - temporarily disabled for debugging
  // const { isLowPowerMode, hardwareAcceleration } = usePerformanceMonitor()
  const isLowPowerMode = false
  const hardwareAcceleration = true

  const logMessages = [
    'Training neural network...',
    'Processing data streams...',
    'Analyzing patterns...',
    'Optimizing algorithms...',
    'Computing predictions...',
    'Initializing AI models...',
    'Running inference...',
    'Updating weights...',
    'Backpropagating errors...',
    'Converging solution...'
  ]

  const createParticle = useCallback((x: number, y: number) => {
    if (particles.length >= 35) return // Max 35 particles for performance
    
    const particle: Particle = {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 60 + Math.random() * 60,
      size: 1 + Math.random() * 2,
      hue: 200 + Math.random() * 60, // Blue to cyan range
      id: Date.now() + Math.random().toString()
    }
    
    setParticles(prev => [...prev, particle])
  }, [particles.length])

  const createFloatingLog = useCallback((x: number, y: number) => {
    if (floatingLogs.length >= 3) return // Max 3 floating logs
    
    const log: FloatingLog = {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.5 - Math.random() * 0.5,
      text: logMessages[Math.floor(Math.random() * logMessages.length)],
      opacity: 0.8,
      life: 1,
      maxLife: 180,
      id: Date.now() + Math.random().toString()
    }
    
    setFloatingLogs(prev => [...prev, log])
  }, [floatingLogs.length])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
      
      // Create trail
      const trail: Trail = {
        x: e.clientX,
        y: e.clientY,
        opacity: 0.5,
        timestamp: Date.now()
      }
      
      setTrails(prev => [...prev.slice(-15), trail])
      
      // Create particles with probability
      if (Math.random() < 0.15 && !isLowPowerMode) {
        createParticle(e.clientX, e.clientY)
      }
      
      // Create floating logs rarely
      if (Math.random() < 0.005 && !isLowPowerMode) {
        createFloatingLog(e.clientX, e.clientY)
      }
    }

    const animate = () => {
      frameCount.current++
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (isLowPowerMode) {
        // Minimal rendering in low power mode
        const gradient = ctx.createRadialGradient(
          lastMousePosition.current.x, lastMousePosition.current.y, 0,
          lastMousePosition.current.x, lastMousePosition.current.y, 100
        )
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        // Full rendering
        
        // Draw subtle grid
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)'
        ctx.lineWidth = 1
        
        const gridSize = 80
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // Draw mouse influence
        const gradient = ctx.createRadialGradient(
          lastMousePosition.current.x, lastMousePosition.current.y, 0,
          lastMousePosition.current.x, lastMousePosition.current.y, 200
        )
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)')
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw trails
        trails.forEach((trail, index) => {
          const age = Date.now() - trail.timestamp
          const opacity = Math.max(0, trail.opacity * (1 - age / 2000))
          
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.beginPath()
          ctx.arc(trail.x, trail.y, 2, 0, Math.PI * 2)
          ctx.fill()
        })

        // Update and draw particles
        setParticles(prev => prev.map(particle => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy
          
          // Update velocity (slight gravity and friction)
          particle.vx *= 0.99
          particle.vy *= 0.99
          particle.vy += 0.01
          
          // Update life
          particle.life = Math.max(0, particle.life - 1/particle.maxLife)
          
          // Draw particle
          const opacity = particle.life * 0.6
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          
          return particle
        }).filter(particle => particle.life > 0))

        // Update and draw floating logs
        setFloatingLogs(prev => prev.map(log => {
          // Update position
          log.x += log.vx
          log.y += log.vy
          
          // Update life
          log.life = Math.max(0, log.life - 1/log.maxLife)
          log.opacity = log.life * 0.4
          
          // Draw log
          ctx.fillStyle = `rgba(34, 197, 94, ${log.opacity})`
          ctx.font = '10px monospace'
          ctx.fillText(log.text, log.x, log.y)
          
          return log
        }).filter(log => log.life > 0))
      }

      // Clean up old trails
      setTrails(prev => prev.filter(trail => Date.now() - trail.timestamp < 2000))

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLowPowerMode, particles.length, floatingLogs.length, createParticle, createFloatingLog])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}
