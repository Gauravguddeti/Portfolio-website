'use client'

import { motion } from 'framer-motion'

export const LowPowerIndicator = () => {
  return (
    <motion.div
      className="low-power-indicator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg text-xs text-gray-400">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        <span>Running in Low Power Mode</span>
      </div>
    </motion.div>
  )
}
