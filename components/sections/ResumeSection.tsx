'use client'

import { motion } from 'framer-motion'
import { Download, FileText } from '@/components/icons'
import { HoverTooltip, jokes } from '@/components/ui/HoverTooltip'

export const ResumeSection = () => {
  return (
    <section id="resume" className="py-20 bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Download my resume to learn more about my experience and qualifications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-2xl p-8 border border-gray-800 hover:border-primary-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl">
                <FileText size={32} />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Gaurav Guddeti - Resume
              </h3>
              <p className="text-gray-400 mb-4">
                B.Tech Computer Science | AI/ML Enthusiast | Full Stack Developer
              </p>
              <p className="text-sm text-gray-500">
                Last updated: January 2025
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <HoverTooltip 
                content="Download Resume"
                joke={jokes.resume}
                className="relative"
              >
                <a
                  href="/Gaurav_Guddeti_Resume.pdf"
                  download="Gaurav_Guddeti_Resume.pdf"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </HoverTooltip>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="glassmorphism rounded-xl p-6 border border-gray-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">B.Tech</div>
            <div className="text-gray-400">Computer Science</div>
          </div>
          <div className="glassmorphism rounded-xl p-6 border border-gray-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">AI/ML</div>
            <div className="text-gray-400">Specialization</div>
          </div>
          <div className="glassmorphism rounded-xl p-6 border border-gray-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">Full Stack</div>
            <div className="text-gray-400">Development</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
