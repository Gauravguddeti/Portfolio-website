import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  // Random Marvel-inspired dialogue
  const dialogues = ["Suit Up", "Time to Shine", "Booting Systems"]
  const [randomDialogue] = useState(() => 
    dialogues[Math.floor(Math.random() * dialogues.length)]
  )

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 600)
          }, 400)
          return 100
        }
        // Accelerate towards the end for smooth feel
        const increment = prev < 60 ? 2 : prev < 90 ? 3 : 5
        return Math.min(prev + increment, 100)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
        >
          <div className="text-center">
            {/* Logo/Name Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 font-orbitron"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                GAURAV.DEV
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-blue-300 mt-4 text-lg tracking-wide"
              >
                {randomDialogue}
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="w-64 mx-auto"
            >
              <div className="relative h-1 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-blue-400/20">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-md"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              {/* Progress Number */}
              <motion.div
                className="text-blue-400 text-sm font-semibold mt-4 tabular-nums"
                key={progress}
              >
                {Math.floor(progress)}%
              </motion.div>
            </motion.div>

            {/* Decorative Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
