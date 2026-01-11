import { useRef, useState, ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticLinkProps {
  children: ReactNode
  href: string
  className?: string
  strength?: number
  target?: string
  rel?: string
}

const MagneticLink = ({
  children,
  href,
  className = '',
  strength = 0.2,
  target,
  rel,
}: MagneticLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.1 })
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return

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

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`${className} relative inline-block z-10`}
      style={{ 
        x, 
        y,
        pointerEvents: 'auto',
        WebkitTapHighlightColor: 'transparent',
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  )
}

export default MagneticLink
