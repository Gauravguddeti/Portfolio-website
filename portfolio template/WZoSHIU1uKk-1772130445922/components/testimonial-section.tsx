"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function TestimonialSection() {
  return (
    <section className="relative min-h-screen bg-[#1a1f1a] overflow-hidden flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lorenzo-piloto.png"
          alt="Lorenzo racing background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f1a]/80 via-[#1a1f1a]/90 to-[#1a1f1a]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Quote Content */}
          <div className="w-full order-2 lg:order-1">
            {/* Decorative quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mb-6 md:mb-12"
            >
              <svg width="80" height="80" viewBox="0 0 120 120" className="text-[#CFFF04]/30">
                <text x="0" y="100" fontSize="140" fontFamily="Georgia, serif" fontWeight="bold" fill="currentColor">
                  "
                </text>
              </svg>
            </motion.div>

            {/* Main quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-8 md:mb-12"
            >
              <p className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight tracking-tight">
                I THINK <br />
                ABOUT BEING <br />
                <span className="text-[#CFFF04] font-brier font-normal normal-case text-5xl md:text-7xl lg:text-8xl block mt-2 mb-2">
                  FASTER
                </span>
                ON THE NEXT LAP.
              </p>
            </motion.blockquote>

            {/* Author */}
            <motion.footer
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="w-12 md:w-20 h-1 bg-[#CFFF04]" />
              <div>
                <p className="text-lg md:text-xl font-bold text-white font-mono">Lorenzo Cardoso</p>
              </div>
            </motion.footer>
          </div>

          {/* Right Column: Restored basic image placeholder to clear InteractiveClean usage */}
          <div className="order-1 lg:order-2 w-full aspect-[4/5] md:aspect-square relative max-w-lg mx-auto lg:mx-0">
            <Image
              src="/images/lorenzo-piloto.png"
              alt="Lorenzo racing"
              fill
              className="object-cover object-center rounded-3xl grayscale opacity-50"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
