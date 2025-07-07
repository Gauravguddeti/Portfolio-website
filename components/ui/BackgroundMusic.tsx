'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Loader2 } from '@/components/icons/index'
import { useAudio } from '@/components/providers/AudioProvider'

export const BackgroundMusic = () => {
  const { isPlaying, toggleAudio, canPlay, isFading } = useAudio()
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.3 }}
    >
      <motion.button
        onClick={toggleAudio}
        disabled={!canPlay || isFading}
        className={`relative w-12 h-12 glassmorphism rounded-full flex items-center justify-center transition-all duration-300 ${
          !canPlay || isFading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
        } ${isPlaying ? 'text-green-400 shadow-lg shadow-green-400/20' : 'text-red-400 shadow-lg shadow-red-400/20'}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={canPlay && !isFading ? { scale: 1.1 } : {}}
        whileTap={canPlay && !isFading ? { scale: 0.9 } : {}}
      >
        <motion.div
          animate={{ 
            scale: isPlaying && !isFading ? [1, 1.1, 1] : 1,
            rotate: isFading ? 360 : 0
          }}
          transition={{ 
            scale: { duration: 2, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" },
            rotate: { duration: 1, ease: "linear" }
          }}
        >
          {isFading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : isPlaying ? (
            <Volume2 size={20} />
          ) : (
            <VolumeX size={20} />
          )}
        </motion.div>
        
        {/* Pulsing ring when playing */}
        {isPlaying && !isFading && (
          <motion.div
            className="absolute inset-0 border-2 border-green-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Sound waves animation */}
        {isPlaying && !isFading && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-green-400/30 rounded-full"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ 
                  scale: [1, 2.5, 3.5],
                  opacity: [0.6, 0.2, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.button>
      
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          className="absolute bottom-full right-0 mb-2 bg-dark-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-primary-400/20"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          {!canPlay ? 'Click to enable music' : 
           isFading ? 'Adjusting volume...' :
           isPlaying ? 'Mute background music' : 'Play background music'}
          <div className="absolute top-full right-4 w-2 h-2 bg-dark-800/90 rotate-45 -mt-1" />
        </motion.div>
      )}
    </motion.div>
  )
}
