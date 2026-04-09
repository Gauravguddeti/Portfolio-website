import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaChartLine } from 'react-icons/fa'

interface PerformanceStatsProps {
  fps: number
}

/**
 * PerformanceStats - Real-time FPS Counter
 * 
 * Displays current frame rate with visual indicators.
 * Toggleable overlay for performance monitoring during development/demo.
 */
const PerformanceStats = ({ fps }: PerformanceStatsProps) => {
  const [isVisible, setIsVisible] = useState(false)
  
  // Determine FPS status color
  const getStatusColor = () => {
    if (fps >= 55) return 'text-green-400 border-green-400/30 bg-green-500/10'
    if (fps >= 30) return 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10'
    return 'text-red-400 border-red-400/30 bg-red-500/10'
  }
  
  const getStatusText = () => {
    if (fps >= 55) return 'Excellent'
    if (fps >= 30) return 'Good'
    return 'Poor'
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-slate-800/80 border border-blue-400/30 rounded-full hover:bg-slate-700/80 transition-colors backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Toggle Performance Stats"
      >
        <FaChartLine className="text-blue-400" />
      </motion.button>

      {/* Stats Overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-20 left-6 z-50 px-6 py-4 rounded-2xl border-2 backdrop-blur-md ${getStatusColor()}`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{Math.round(fps)}</div>
                <div className="text-xs opacity-70">FPS</div>
              </div>
              <div className="w-px h-12 bg-current opacity-30" />
              <div className="text-center">
                <div className="text-sm font-semibold">{getStatusText()}</div>
                <div className="text-xs opacity-70">Performance</div>
              </div>
            </div>
            
            {/* FPS Bar Indicator */}
            <div className="mt-3 h-2 bg-slate-900/50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-current rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PerformanceStats
