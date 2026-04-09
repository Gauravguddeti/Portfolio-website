"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "PyTorch", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "OpenCV", level: 88 },
      { name: "Hugging Face", level: 82 },
      { name: "LangGraph", level: 85 },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 80 },
      { name: "C++", level: 78 },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Web Development",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "FastAPI", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Tailwind CSS", level: 93 },
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Docker", level: 82 },
      { name: "Git", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "Firebase", level: 83 },
      { name: "Supabase", level: 88 },
    ],
    color: "from-orange-500 to-red-500",
  },
]

export default function TechSkillsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mastering cutting-edge technologies to build intelligent solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: categoryIndex * 0.15 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {["AI", "ML", "Web3", "Cloud", "DevOps", "Full-Stack"].map((badge) => (
            <span
              key={badge}
              className="px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400 font-medium text-sm hover:scale-110 transition-transform cursor-default"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
