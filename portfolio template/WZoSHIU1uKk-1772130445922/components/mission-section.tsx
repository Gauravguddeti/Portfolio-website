"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, useInView } from "framer-motion"

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [signatureDrawn, setSignatureDrawn] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1.2, 1, 0.2])
  const imageY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, -200])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0])

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setSignatureDrawn(true), 800)
    }
  }, [isInView])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = rect.height
        const scrolled = -rect.top
        const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1)
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getTextTransform = () => {
    if (scrollProgress < 0.2) {
      const progress = scrollProgress / 0.2
      return {
        opacity: progress,
        transform: `translateX(${(1 - progress) * -50}px)`,
      }
    }
    return {
      opacity: 1,
      transform: "translateX(0px)",
    }
  }

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen bg-lorenzo-dark text-lorenzo-text-light py-24 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/*
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3 border-2 border-white/20 rounded-full px-6 py-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-lorenzo-accent">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">TEAM LORENZO SINCE 2020</span>
          </div>
        </div>
        */}

          <div className="relative h-32 flex items-center justify-center mt-16">
            <img
              src="/images/icon/ico-helmet-w.png"
              className="h-full w-auto max-h-[60px] object-contain"
            />
          </div>
        
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-balance leading-[1.1] xl:text-8xl">
            <span className="text-lorenzo-accent font-brier leading-[1.1] text-8xl">REDEFINING</span> LIMITS,
            <br />
            FIGHTING FOR <span className="text-lorenzo-accent font-brier leading-[1.1]">VICTORIES</span>,
            <br />
            BRINGING EVERYTHING IN
            <br />
            EVERY SENSE.
            <br />
            DEFINING A <span className="text-lorenzo-accent font-brier leading-[1.1]">LEGACY</span>
            <br />
            IN MOTOCROSS
            <br />
            ON AND OFF THE TRACK.
          </h2>
        </div>

        {/* Signature animation */}
        {/*
        <div className="relative h-32 flex items-center justify-center mt-16">
          
          <svg width="400" height="150" viewBox="0 0 400 150" className="w-full max-w-md">
            <motion.path
              d="M30,75 Q60,40 110,75 T220,75 Q250,95 310,65 Q340,45 370,75 M200,90 Q220,110 250,90"
              fill="none"
              stroke="#c8f550"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={signatureDrawn ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
        */}
      </div>
    </section>
  )
}
