"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Award, Trophy, Users } from "lucide-react"

const experiences = [
  {
    type: "work",
    title: "Data Science & AI Intern",
    company: "ChatMaven.ai",
    location: "Remote / Pune, India",
    period: "June 2025 – Oct 2025",
    achievements: [
      "Built AI-driven IVR system leveraging RAG and LangGraph for intelligent query handling",
      "Contributed to AI model integration and backend optimizations",
      "Deployed AI/ML applications in production with focus on scalability",
      "Collaborated with cross-functional teams to enhance chatbot intelligence",
    ],
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
  },
]

const leadership = [
  {
    title: "Research Paper Publication",
    description: "Published and presented research on Smart Door Lock System at Delhi conference",
    icon: Award,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Hackathon Moderator",
    description: "Coordinated major college event and awarded Gold Medal for excellence",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Valorant National Champion",
    description: "Winner of National Championship, showcasing leadership and teamwork",
    icon: Trophy,
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Visionary Club - Core Member",
    description: "Active member of college tech & innovation group",
    icon: Users,
    color: "from-green-500 to-emerald-500",
  },
]

export default function ExperienceTimeline() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience & Leadership
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional journey and achievements that shaped my career
          </p>
        </motion.div>

        {/* Work Experience */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-400" />
            Professional Experience
          </h3>
          {experiences.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent" />

                {/* Timeline dot */}
                <div className={`absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color}`} />

                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">{exp.title}</h4>
                      <p className="text-lg text-blue-400 mb-1">{exp.company}</p>
                      <p className="text-gray-500 text-sm">{exp.location}</p>
                    </div>
                    <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400">
                        <span className="text-blue-400 mt-1">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Leadership & Achievements */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Leadership & Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {leadership.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all hover:scale-105"
                >
                  <div className={`inline-block p-3 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
