'use client'

import { motion } from 'framer-motion'
import { DevToolsTable } from '@/components/ui/DevToolsTable'
import { FloatingQuotes } from '@/components/ui/FloatingQuotes'

const skills = [
  { name: "Python", icon: "🐍", description: "AI/ML powerhouse", color: "#3776ab" },
  { name: "TensorFlow", icon: "🧠", description: "Deep learning framework", color: "#ff6f00" },
  { name: "PyTorch", icon: "🔥", description: "Research-grade ML", color: "#ee4c2c" },
  { name: "React", icon: "⚛️", description: "Frontend mastery", color: "#61dafb" },
  { name: "Next.js", icon: "▲", description: "Full-stack React", color: "#000000" },
  { name: "Node.js", icon: "🟢", description: "JavaScript runtime", color: "#339933" },
  { name: "Docker", icon: "�", description: "Containerization", color: "#2496ed" },
  { name: "MongoDB", icon: "🍃", description: "NoSQL database", color: "#47a248" },
  { name: "PostgreSQL", icon: "�", description: "Relational database", color: "#336791" },
  { name: "AWS", icon: "☁️", description: "Cloud computing", color: "#ff9900" },
  { name: "Git", icon: "📚", description: "Version control", color: "#f05032" },
  { name: "OpenCV", icon: "�️", description: "Computer vision", color: "#5c3ee8" },
  { name: "Pandas", icon: "🐼", description: "Data manipulation", color: "#150458" },
  { name: "NumPy", icon: "�", description: "Numerical computing", color: "#013243" },
  { name: "Scikit-learn", icon: "🤖", description: "Machine learning", color: "#f7931e" },
  { name: "FastAPI", icon: "⚡", description: "Modern API framework", color: "#009688" },
  { name: "Streamlit", icon: "�", description: "ML app deployment", color: "#ff4b4b" },
  { name: "Jupyter", icon: "📊", description: "Data science notebook", color: "#f37626" },
  { name: "VS Code", icon: "💻", description: "IDE of choice", color: "#007acc" },
  { name: "Linux", icon: "�", description: "Operating system", color: "#fcc624" }
]

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Technologies I Use
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent applications and solving complex problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Skills Grid */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="group tech-item"
                data-cursor="tech"
                title={`${skill.name} - ${skill.description}`}
              >
                <div className="glassmorphism rounded-xl p-4 border border-gray-800 hover:border-primary-400/50 transition-all duration-300 hover:shadow-lg text-center relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: skill.color }}
                  />
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform relative z-10">
                    {skill.icon}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-primary-400 transition-colors relative z-10">
                    {skill.name}
                  </div>
                  <div className="text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors mt-1 relative z-10">
                    {skill.description}
                  </div>
                  
                  {/* Hover effect particles */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary-400 rounded-full animate-ping"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Skills Cloud Placeholder */}
          <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
            <div className="relative">
              {skills.slice(0, 8).map((skill, index) => (
                <div
                  key={skill.name}
                  className={`absolute w-16 h-16 glassmorphism rounded-full flex items-center justify-center text-2xl animate-float`}
                  style={{
                    transform: `rotate(${index * 45}deg) translate(80px) rotate(-${index * 45}deg)`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {skill.icon}
                </div>
              ))}
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                AI
              </div>
            </div>
          </div>
        </div>

        {/* Skill Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary-400 mb-4">Frontend</h3>
            <p className="text-gray-400 text-sm">
              React, Next.js, Tailwind CSS, JavaScript, HTML5, CSS3
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary-400 mb-4">Backend & Data</h3>
            <p className="text-gray-400 text-sm">
              Python, Java, Node.js, MongoDB, MySQL, Firebase
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary-400 mb-4">AI & ML</h3>
            <p className="text-gray-400 text-sm">
              TensorFlow, PyTorch, OpenCV, Pandas, NumPy, Scikit-learn
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
