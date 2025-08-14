import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCoffee } from 'react-icons/fa'

interface CoffeeMugProps {
  isDarkMode: boolean
}

const CoffeeMug: React.FC<CoffeeMugProps> = ({ isDarkMode }) => {
  const [message, setMessage] = useState<string>("")
  const [showMessage, setShowMessage] = useState(false)

  const messages = [
    "Currently caffeinating the next big thing ☕",
    "Ctrl + Z is my spirit button.",
    "Not just a coder, a bug hunter.",
    "Coffee.exe has stopped working... just kidding! ☕",
    "Turning coffee into code since forever",
    "Debugging is like being a detective in a crime movie where you're also the murderer",
    "There are only 10 types of people: those who understand binary and those who don't",
    "Life is too short for bad coffee and bad code"
  ]

  const handleClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setMessage(randomMessage)
    setShowMessage(true)
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  return (
    <div className="relative">
      {/* Coffee Mug */}
      <motion.div
        className={`w-24 h-24 rounded-2xl shadow-cozy cursor-pointer interactive-cursor ${
          isDarkMode 
            ? 'bg-gradient-to-br from-amber-700 to-amber-900' 
            : 'bg-gradient-to-br from-amber-100 to-amber-200'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
      >
        {/* Mug Body */}
        <div className="relative w-full h-full p-4 flex items-center justify-center">
          {/* Coffee Icon */}
          <FaCoffee 
            className={`text-3xl ${
              isDarkMode ? 'text-amber-300' : 'text-amber-700'
            }`}
          />
          
          {/* Handle */}
          <div className={`absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-8 border-4 rounded-r-full ${
            isDarkMode 
              ? 'border-amber-700' 
              : 'border-amber-200'
          }`} />

          {/* Steam */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 h-4 rounded-full ${
                  isDarkMode ? 'bg-gray-400' : 'bg-gray-300'
                }`}
                style={{ marginLeft: i * 3 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Coffee Surface */}
        <div className={`absolute top-2 left-2 right-2 h-4 rounded-full ${
          isDarkMode 
            ? 'bg-amber-900' 
            : 'bg-amber-600'
        }`}>
          {/* Coffee Ripples */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Message Tooltip */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-2 rounded-lg shadow-lg max-w-xs ${
              isDarkMode 
                ? 'bg-gray-800 text-white border border-gray-700' 
                : 'bg-white text-gray-800 border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-center">{message}</p>
            {/* Arrow */}
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              isDarkMode 
                ? 'border-t-gray-800' 
                : 'border-t-white'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CoffeeMug
