import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'

interface LightSwitchProps {
  isDarkMode: boolean
  onToggle: () => void
}

const LightSwitch: React.FC<LightSwitchProps> = ({ isDarkMode, onToggle }) => {
  return (
    <motion.div
      className={`relative w-16 h-8 rounded-full cursor-pointer interactive-cursor ${
        isDarkMode 
          ? 'bg-gray-700 border-2 border-neonGreen' 
          : 'bg-gray-200 border-2 border-coffeeBrown'
      }`}
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Switch Background */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
            : 'bg-gradient-to-r from-yellow-200 to-orange-300'
        }`}
        animate={{
          background: isDarkMode 
            ? 'linear-gradient(to right, #1f2937, #111827)' 
            : 'linear-gradient(to right, #fef3c7, #fed7aa)'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Switch Toggle */}
      <motion.div
        className={`absolute top-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center ${
          isDarkMode 
            ? 'bg-gray-900 text-neonGreen' 
            : 'bg-white text-orange-500'
        }`}
        animate={{
          x: isDarkMode ? 32 : 2,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? <FaMoon className="text-xs" /> : <FaSun className="text-xs" />}
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isDarkMode 
            ? 'shadow-neon' 
            : 'shadow-glow'
        }`}
        animate={{
          boxShadow: isDarkMode 
            ? '0 0 20px #00FF88, 0 0 40px #00FF88' 
            : '0 0 20px #F59E0B, 0 0 40px #F59E0B'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs font-medium">
        <span className={`${isDarkMode ? 'text-gray-400' : 'text-coffeeBrown'}`}>
          Cozy
        </span>
        <span className={`${isDarkMode ? 'text-neonGreen' : 'text-gray-400'}`}>
          Hacker
        </span>
      </div>
    </motion.div>
  )
}

export default LightSwitch
