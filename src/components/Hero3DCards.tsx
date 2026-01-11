import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'

interface Hero3DCardsProps {
  children: React.ReactNode
  isLoaded?: boolean
}

const Hero3DCards = ({ children, isLoaded = false }: Hero3DCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse parallax (desktop only)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Scroll-based transforms
  const rotateX = useTransform(scrollY, [0, 500], [0, isMobile ? 15 : 25])
  const rotateY = useTransform(scrollY, [0, 500], [0, isMobile ? -10 : -15])
  const scale = useTransform(scrollY, [0, 500], [1, isMobile ? 0.85 : 0.75])
  const z = useTransform(scrollY, [0, 500], [0, isMobile ? -100 : -200])

  // Spring animations for smooth movement
  const springConfig = { stiffness: 150, damping: 30, mass: 0.5 }
  const smoothRotateX = useSpring(rotateX, springConfig)
  const smoothRotateY = useSpring(rotateY, springConfig)
  const smoothScale = useSpring(scale, springConfig)
  const smoothZ = useSpring(z, springConfig)

  // Mouse parallax values
  const mouseX = isMobile ? 0 : mousePosition.x * 30
  const mouseY = isMobile ? 0 : mousePosition.y * 30

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative"
            style={{
              perspective: isMobile ? '800px' : '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Background Layer - Deepest */}
            <motion.div
              className="absolute inset-0 z-0"
              style={{
                transform: 'translateZ(-100px)',
                opacity: 0.3,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#234C6A]/20 to-[#456882]/20 blur-3xl" />
            </motion.div>

            {/* Main 3D Card Container */}
            <motion.div
              className="relative z-10"
              style={{
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                scale: smoothScale,
                translateZ: smoothZ,
                transformStyle: 'preserve-3d',
                transform: `
                  rotateX(${smoothRotateX}deg) 
                  rotateY(${smoothRotateY}deg) 
                  translateX(${mouseX}px) 
                  translateY(${mouseY}px)
                  translateZ(${smoothZ}px)
                  scale(${smoothScale})
                `,
                willChange: 'transform',
              }}
            >
              {/* Glassmorphic 3D Card */}
              <motion.div
                className="relative rounded-[32px] p-8 md:p-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(27, 60, 83, 0.4), rgba(35, 76, 106, 0.4))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(96, 213, 250, 0.3)',
                  boxShadow: `
                    0 20px 60px rgba(27, 60, 83, 0.5),
                    0 0 80px rgba(96, 213, 250, 0.2),
                    inset 0 0 60px rgba(96, 213, 250, 0.1)
                  `,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Inner glow effect */}
                <div 
                  className="absolute inset-0 rounded-[32px] opacity-50 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(96, 213, 250, 0.2), transparent 70%)',
                    transform: 'translateZ(10px)',
                  }}
                />

                {/* Content with depth */}
                <div style={{ 
                  transform: 'translateZ(50px)', 
                  transformStyle: 'flat',
                  position: 'relative', 
                  zIndex: 100,
                  pointerEvents: 'auto'
                }}>
                  {children}
                </div>

                {/* Floating particles */}
                {!isMobile && [...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{
                      background: '#60D5FA',
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      transform: `translateZ(${30 + i * 10}px)`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>

              {/* Shadow layer */}
              <div
                className="absolute inset-0 bg-black/20 blur-3xl -z-10 pointer-events-none"
                style={{
                  transform: 'translateZ(-50px) scale(0.9)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Hero3DCards
