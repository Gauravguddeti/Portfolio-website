'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DNAHelix } from '@/components/3d/DNAHelix'

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

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                I'm a passionate B.Tech Computer Science student with a deep fascination for 
                artificial intelligence and machine learning. My journey in tech began with 
                curiosity about how machines can learn and think, leading me to explore the 
                intersection of code and cognition.
              </p>
              
              <p className="text-lg">
                From building neural networks to crafting full-stack applications, I enjoy 
                turning complex problems into elegant solutions. Whether it's implementing 
                machine learning algorithms from scratch or developing user-friendly interfaces, 
                I believe in the power of technology to create meaningful impact.
              </p>

              <div className="bg-dark-700/50 rounded-xl p-6 border border-primary-400/20">
                <h3 className="text-xl font-semibold mb-4 text-primary-400">Current Focus</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Deep Learning & Computer Vision
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Natural Language Processing
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Full-Stack Development (React/Node.js)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    MLOps & Model Deployment
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl p-4 border border-primary-400/30">
                  <h4 className="font-semibold text-primary-400 mb-2">Philosophy</h4>
                  <p className="text-sm">
                    "Code is poetry, algorithms are art, and AI is the bridge between 
                    human creativity and machine precision."
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-400/30">
                  <h4 className="font-semibold text-green-400 mb-2">Current Goal</h4>
                  <p className="text-sm">
                    Building AI systems that are not just intelligent, but also 
                    ethical, accessible, and beneficial for humanity.
                  </p>
                </div>
              </div>

              <div className="bg-dark-700/30 rounded-xl p-6 border border-gray-600/20">
                <h3 className="text-xl font-semibold mb-4 text-white">When I'm Not Coding</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-primary-400">🎵 Music:</span> Lo-fi beats & synthwave
                  </div>
                  <div>
                    <span className="text-primary-400">📚 Reading:</span> Sci-fi & tech blogs
                  </div>
                  <div>
                    <span className="text-primary-400">🎮 Gaming:</span> Strategy & puzzle games
                  </div>
                  <div>
                    <span className="text-primary-400">☕ Coffee:</span> Espresso enthusiast
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  {stats.projects}+
                </div>
                <div className="text-sm text-gray-400">Projects</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  {stats.tools}+
                </div>
                <div className="text-sm text-gray-400">Tools Used</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  {stats.curiosity}
                </div>
                <div className="text-sm text-gray-400">Curiosity</div>
              </motion.div>
            </div>
          </motion.div>

          {/* DNA Helix Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-[500px] flex items-center justify-center"
          >
            <DNAHelix />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
