import { useRef, useState, ReactNode } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  disabled?: boolean
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
}

const MagneticButton = ({
  children,
  className = '',
  strength = 0.3,
  disabled = false,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })

  const scale = useTransform(
    () => (isHovered ? 1.05 : 1),
    [],
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const Component = href ? motion.a : motion.button

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="inline-block z-10"
      style={{ pointerEvents: 'auto' }}
    >
      <Component
        style={{ 
          x, 
          y, 
          scale,
          pointerEvents: 'auto',
          WebkitTapHighlightColor: 'transparent',
          willChange: 'transform'
        }}
        className={className}
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        disabled={disabled}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </Component>
    </div>
  )
}

export default MagneticButton
