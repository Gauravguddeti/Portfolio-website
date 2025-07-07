'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from '@/components/icons'
import { smoothScrollToTop } from '@/utils/smoothScroll'

export const Footer = () => {
  const scrollToTop = () => {
    smoothScrollToTop()
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 border-t border-gray-800 py-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-gray-400">
              Designed & Built by{' '}
              <span className="text-primary-400 font-semibold">Gaurav Guddeti</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              © {currentYear} All rights reserved
            </p>
          </motion.div>

          {/* Right side - Back to Top */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            className="relative w-12 h-12 glassmorphism rounded-full flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowUp size={20} />
            </motion.div>
            
            {/* Animated background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary-400 rounded-full"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: '70%',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 1, 0.4],
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
            
            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 border-2 border-primary-400 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0, 0.6, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-xs text-gray-500">
            Built with Next.js, React, Tailwind CSS, Framer Motion, and Three.js
          </p>
          <p className="text-xs text-gray-600 mt-2">
            "Building tools with code, curiosity, and cold coffee."
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
