"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = "unset"
    }, 3500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#ccff00] text-black"
        >
          <div className="relative flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex items-baseline text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter"
            >
            {/*
              <span className="font-[family-name:var(--font-oswald)]">AD</span>
            */}
              <span className="font-brier ml-1">LORENZO</span>

              {/* Stylized 'n' above */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 md:-top-8 left-1/2 font-brier text-2xl md:text-4xl"
              >
                n
              </motion.span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 font-[family-name:var(--font-oswald)] text-sm md:text-base font-bold tracking-widest uppercase"
          >
            LOAD NORRIS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
