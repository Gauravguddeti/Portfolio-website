import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Section3DTransitionProps {
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'bold'
  direction?: 'up' | 'down' | 'left' | 'right'
}

const Section3DTransition = ({ 
  children, 
  className = '',
  intensity = 'bold',
  direction = 'up'
}: Section3DTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Bold 3D transforms
  const isBold = intensity === 'bold'
  const multiplier = isBold ? 1 : 0.5

  // Direction-based transforms - stabilized when in center of viewport
  const getTransforms = () => {
    switch (direction) {
      case 'up':
        return {
          y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50 * multiplier, 0, 0, -50 * multiplier]),
          rotateX: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8 * multiplier, 0, 0, -8 * multiplier]),
        }
      case 'down':
        return {
          y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-50 * multiplier, 0, 0, 50 * multiplier]),
          rotateX: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-8 * multiplier, 0, 0, 8 * multiplier]),
        }
      case 'left':
        return {
          x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50 * multiplier, 0, 0, -50 * multiplier]),
          rotateY: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8 * multiplier, 0, 0, -8 * multiplier]),
        }
      case 'right':
        return {
          x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-50 * multiplier, 0, 0, 50 * multiplier]),
          rotateY: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-8 * multiplier, 0, 0, 8 * multiplier]),
        }
    }
  }

  const transforms = getTransforms()
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])
  // Keep content fully visible from 5% to 95% of scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...transforms,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  )
}

export default Section3DTransition
