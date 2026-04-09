import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  // Smooth spring animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // 3D rotation based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 origin-left z-[100]"
        style={{ 
          scaleX,
          backgroundSize: '200% 100%',
          willChange: 'transform',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 3D Circular indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="4"
              fill="none"
            />
          </svg>

          {/* Progress circle with 3D rotation */}
          <motion.svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            style={{ 
              rotateY: smoothRotate,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
              }}
              strokeDasharray="0 1"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-blue-400 text-xl"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↑
            </motion.div>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </>
  )
}

export default ScrollProgressIndicator
