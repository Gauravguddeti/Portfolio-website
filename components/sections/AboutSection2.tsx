'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AboutMeVisual } from '@/components/ui/AboutMeVisual'
import { FloatingQuotes } from '@/components/ui/FloatingQuotes'

export const AboutSection = () => {
  const [stats, setStats] = useState({
    projects: 0,
    tools: 0,
    curiosity: '∞'
  })

  useEffect(() => {
    // Animate counters
    const animateValue = (start: number, end: number, setter: (val: number) => void) => {
      const duration = 2000
      const range = end - start
      const increment = range / (duration / 16)
      let current = start
      
      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setter(end)
          clearInterval(timer)
        } else {
          setter(Math.floor(current))
        }
      }, 16)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(0, 5, (val) => setStats(prev => ({ ...prev, projects: val })))
            animateValue(0, 20, (val) => setStats(prev => ({ ...prev, tools: val })))
          }
        })
      },
      { threshold: 0.5 }
    )

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      {/* Floating Quotes */}
      <FloatingQuotes />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AboutMeVisual />
        </motion.div>
      </div>
    </section>
  )
}
