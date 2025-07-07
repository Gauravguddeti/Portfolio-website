'use client'

import { motion } from 'framer-motion'
import { ArcReactorTechStack } from '@/components/ui/ArcReactorTechStack'
import { FloatingQuotes } from '@/components/ui/FloatingQuotes'

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      {/* Floating Quotes */}
      <FloatingQuotes />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Tech Arsenal HUD
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My technology stack visualized as an interactive Arc Reactor interface
          </p>
        </motion.div>

        {/* Interactive 3D Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ArcReactorTechStack />
        </motion.div>
      </div>
    </section>
  )
}
