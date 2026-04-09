"use client"

import { useRef } from "react"
import { motion, useAnimationFrame } from "framer-motion"

export default function TechMarqueeSection() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const xPos = useRef(0)

  const text = "GAURAV GUDDETI • AI ENGINEER • FULL-STACK DEVELOPER • INNOVATOR • "

  useAnimationFrame((_, delta) => {
    if (marqueeRef.current) {
      xPos.current -= 0.5
      if (xPos.current <= -50) {
        xPos.current = 0
      }
      marqueeRef.current.style.transform = `translateX(${xPos.current}%)`
    }
  })

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold text-gray-200/5 flex-shrink-0"
            style={{
              fontFamily: "var(--font-oswald)",
              letterSpacing: "0.05em",
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
