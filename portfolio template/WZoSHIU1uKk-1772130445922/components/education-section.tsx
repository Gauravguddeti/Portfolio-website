"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Award, BookOpen } from "lucide-react"

const education = [
  {
    degree: "B.Tech in Computer Science (AI & ML)",
    institution: "Vishwakarma University",
    location: "Pune, India",
    period: "2023 - 2027 (Expected)",
    grade: "CGPA: 8.15",
    icon: GraduationCap,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Vishwakarma College of Arts, Commerce & Science",
    location: "Pune, India",
    period: "2023",
    grade: "70%",
    icon: BookOpen,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Sardar Dastur Hormazdiar High School",
    location: "Pune, India",
    period: "2021",
    grade: "70%",
    icon: BookOpen,
    gradient: "from-green-600 to-emerald-600",
  },
]

const certifications = [
  { name: "Generative AI Fundamentals", issuer: "Google", year: "2023" },
  { name: "AI For India 2.0", issuer: "GUVI", year: "2023" },
  { name: "The Complete Python Bootcamp", issuer: "Udemy", year: "2023" },
  { name: "Introduction to Software Engineering", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Introduction to Cloud Computing", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Introduction to HTML, CSS & JavaScript", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Getting Started with Git & GitHub", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Developing Front-End Apps with React", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Developing Back-End Apps with Node.js & Express", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Python for Data Science, AI & Development", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Developing AI Applications with Python & Flask", issuer: "IBM Skills Network (Coursera)", year: "2025" },
  { name: "Django Application Development with SQL & Databases", issuer: "IBM Skills Network (Coursera)", year: "2025" },
]

export default function EducationSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section ref={sectionRef} className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Education & Certifications
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Continuous learning and academic excellence
          </p>
        </motion.div>

        {/* Education */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="space-y-6">
            {education.map((edu, index) => {
              const Icon = edu.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-gray-950/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all hover:scale-105"
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${edu.gradient} flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                          <p className="text-lg text-blue-400">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.location}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm inline-block">
                            {edu.period}
                          </span>
                          <p className="text-green-400 font-semibold mt-2">{edu.grade}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-orange-400" />
              Professional Certifications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="bg-gray-950/50 backdrop-blur-sm border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition-all hover:scale-105 group"
                >
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1 group-hover:text-orange-300 transition-colors" />
                    <div>
                      <h4 className="text-white font-semibold mb-1 leading-snug">{cert.name}</h4>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                      <p className="text-blue-400 text-xs mt-1">{cert.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
