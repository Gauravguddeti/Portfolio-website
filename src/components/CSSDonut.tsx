import { motion } from 'framer-motion'

const CSSDonut = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div 
        className="w-full h-full"
        style={{
          background: `
            radial-gradient(
              circle at 50% 50%,
              transparent 30%,
              rgba(59, 130, 246, 0.03) 35%,
              rgba(139, 92, 246, 0.05) 45%,
              rgba(59, 130, 246, 0.08) 55%,
              rgba(139, 92, 246, 0.03) 65%,
              transparent 70%
            ),
            conic-gradient(
              from 0deg,
              rgba(59, 130, 246, 0.1) 0deg,
              rgba(139, 92, 246, 0.15) 90deg,
              rgba(59, 130, 246, 0.08) 180deg,
              rgba(139, 92, 246, 0.12) 270deg,
              rgba(59, 130, 246, 0.1) 360deg
            )
          `,
          borderRadius: '50%',
        }}
      />
    </motion.div>
  )
}

export default CSSDonut
