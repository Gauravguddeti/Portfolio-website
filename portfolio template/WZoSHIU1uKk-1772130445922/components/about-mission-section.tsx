"use client"

import { motion } from "framer-motion"
import { Sparkles, Code, Cpu, Rocket } from "lucide-react"

export default function AboutMissionSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mission & Vision
              </span>
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Transforming ideas into intelligent solutions through cutting-edge AI and innovative technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Code,
              title: "Code Excellence",
              description:
                "Writing clean, efficient, and scalable code that solves real-world problems and creates meaningful impact.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: Cpu,
              title: "AI Innovation",
              description:
                "Leveraging artificial intelligence and machine learning to build intelligent systems that push boundaries.",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: Rocket,
              title: "Continuous Growth",
              description:
                "Constantly learning, experimenting, and staying ahead of the curve in emerging technologies and methodologies.",
              gradient: "from-orange-500 to-red-500",
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all hover:scale-105 group"
              >
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-r ${item.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-2xl p-8">
            <blockquote className="text-2xl md:text-3xl font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text leading-relaxed">
              "The intersection of AI and human creativity is where magic happens. I'm here to make that magic a
              reality."
            </blockquote>
            <p className="text-gray-400 mt-4 text-lg">— Gaurav Guddeti</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
