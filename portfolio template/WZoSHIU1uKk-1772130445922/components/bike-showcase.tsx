"use client"

import { useState, useEffect } from "react"
import { InteractiveClean } from "@/components/interactive-clean"
import { motion } from "framer-motion"

interface AnimatedCounterProps {
  target: number
  label: string
  unit?: string
}

function AnimatedCounter({ target, label, unit = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [target])

  return (
    <div className="text-right">
      <div className="text-xs uppercase tracking-wider text-black/60 mb-2">{label}</div>
      <div className="text-6xl md:text-8xl font-black text-black">
        {count}
        {unit}
      </div>
    </div>
  )
}

export default function BikeShowcase() {
  return (
    <section className="relative bg-lorenzo-dark px-6 md:px-12 overflow-hidden pb-5">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
          <div className="flex flex-col justify-center items-start lg:items-end lg:pr-12 order-2 lg:order-1">
            <div className="relative">
              {/* Large decorative quote */}
              <div
                className="absolute -left-16 -top-20 lg:-left-24 lg:-top-32 text-lorenzo-accent opacity-30 text-[200px] lg:text-[280px] leading-none pointer-events-none select-none simteste"
                style={{ fontFamily: "var(--font-alex-brush), cursive" }}
              >
                &ldquo;
              </div>

              {/* Main quote with improved spacing and hierarchy */}
              <blockquote className="relative z-10 max-w-xl">
                <p className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-lorenzo-text-light leading-[1.1] tracking-tight mb-8">
                  <span className="block mb-2">I THINK</span>
                  <span className="block mb-2">ABOUT BEING</span>
                  <span className="block text-lorenzo-accent font-brier normal-case text-5xl md:text-6xl -ml-1 lg:text-8xl">
                    FASTER
                  </span>
                  <span className="block mt-2">ON THE NEXT</span>
                  <span className="block">LAP.</span>
                </p>
              </blockquote>

              {/* Author attribution */}
              <div className="mt-4">
                <p className="text-base font-medium font-mono md:text-lg text-accent">- Lorenzo Cardoso</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-[4/5] md:aspect-square max-w-lg mx-auto lg:mx-0 order-1 lg:order-2"
          >
            {/* Decorative Corners (Green brackets) 
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-[#CFFF04] rounded-tl-3xl z-20" />
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-[#CFFF04] rounded-tr-3xl z-20" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-[#CFFF04] rounded-bl-3xl z-20" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-[#CFFF04] rounded-br-3xl z-20" />
            */}
            <InteractiveClean />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
