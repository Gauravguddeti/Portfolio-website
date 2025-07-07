'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ScrollAnimationWrapperProps {
  children: React.ReactNode
  className?: string
  animation?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale'
  delay?: number
  duration?: number
}

const animationVariants = {
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
}

export const ScrollAnimationWrapper = ({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0,
  duration = 0.5,
}: ScrollAnimationWrapperProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.2, 
    triggerOnce: true 
  })

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animationVariants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Faster, smoother easing
        type: "tween"
      }}
    >
      {children}
    </motion.div>
  )
}
