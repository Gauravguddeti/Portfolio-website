'use client'

import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number
  category: string
  icon: string
}

const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', level: 95, category: 'Languages', icon: '🐍' },
  { name: 'JavaScript', level: 90, category: 'Languages', icon: '📜' },
  { name: 'TypeScript', level: 85, category: 'Languages', icon: '📘' },
  { name: 'Java', level: 80, category: 'Languages', icon: '☕' },
  
  // Frameworks & Libraries
  { name: 'React', level: 92, category: 'Frontend', icon: '⚛️' },
  { name: 'Next.js', level: 88, category: 'Frontend', icon: '▲' },
  { name: 'Node.js', level: 85, category: 'Backend', icon: '🟢' },
  { name: 'Express.js', level: 82, category: 'Backend', icon: '🚂' },
  
  // AI/ML
  { name: 'TensorFlow', level: 88, category: 'AI/ML', icon: '🧠' },
  { name: 'PyTorch', level: 85, category: 'AI/ML', icon: '🔥' },
  { name: 'OpenAI APIs', level: 90, category: 'AI/ML', icon: '🤖' },
  { name: 'Langchain', level: 78, category: 'AI/ML', icon: '🔗' },
  
  // Databases
  { name: 'MongoDB', level: 85, category: 'Database', icon: '🍃' },
  { name: 'PostgreSQL', level: 80, category: 'Database', icon: '🐘' },
  { name: 'Redis', level: 75, category: 'Database', icon: '📊' },
  
  // Tools & DevOps
  { name: 'Git', level: 90, category: 'Tools', icon: '📋' },
  { name: 'Docker', level: 78, category: 'Tools', icon: '🐳' },
  { name: 'AWS', level: 75, category: 'Tools', icon: '☁️' },
  { name: 'Vercel', level: 85, category: 'Tools', icon: '▲' },
]

const categories = ['Languages', 'Frontend', 'Backend', 'AI/ML', 'Database', 'Tools']

export const ProfessionalSkillsGrid = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-3xl font-bold text-white mb-4">Technical Expertise</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and proficiency levels across different domains
        </p>
      </motion.div>

      {categories.map((category, categoryIndex) => {
        const categorySkills = skills.filter(skill => skill.category === category)
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-semibold text-primary-400 mb-4">{category}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-white font-medium">{skill.name}</span>
                    </div>
                    <span className="text-primary-400 text-sm font-semibold">{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
      
      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center pt-8 border-t border-gray-800"
      >
        <p className="text-gray-400 text-sm">
          Continuously learning and adapting to new technologies and industry best practices
        </p>
      </motion.div>
    </div>
  )
}
