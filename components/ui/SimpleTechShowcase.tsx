'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  icon: string
  color: string
  category: string
  level: number
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', color: '#61DAFB', category: 'Frontend', level: 95 },
  { name: 'Next.js', icon: '▲', color: '#000000', category: 'Frontend', level: 90 },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', category: 'Frontend', level: 85 },
  { name: 'Tailwind', icon: '🎨', color: '#06B6D4', category: 'Frontend', level: 88 },
  
  // Backend
  { name: 'Python', icon: '🐍', color: '#3776AB', category: 'Backend', level: 95 },
  { name: 'Node.js', icon: '🟢', color: '#339933', category: 'Backend', level: 85 },
  { name: 'Express', icon: '🚂', color: '#000000', category: 'Backend', level: 80 },
  
  // AI/ML
  { name: 'TensorFlow', icon: '🧠', color: '#FF6F00', category: 'AI/ML', level: 88 },
  { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', category: 'AI/ML', level: 85 },
  { name: 'OpenAI', icon: '🤖', color: '#412991', category: 'AI/ML', level: 90 },
  
  // Database
  { name: 'MongoDB', icon: '🍃', color: '#47A248', category: 'Database', level: 85 },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791', category: 'Database', level: 80 },
  
  // DevOps
  { name: 'Docker', icon: '🐳', color: '#2496ED', category: 'DevOps', level: 78 },
  { name: 'AWS', icon: '☁️', color: '#FF9900', category: 'DevOps', level: 75 },
  { name: 'Git', icon: '📋', color: '#F05032', category: 'DevOps', level: 90 },
]

const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'Database', 'DevOps']

export const SimpleTechShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Tech Arsenal
        </h3>
        <p className="text-gray-400 mb-6">
          My technology stack and expertise levels
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="relative group"
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
          >
            <motion.div
              className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 h-full"
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: `0 20px 40px ${skill.color}20`
              }}
              style={{
                background: hoveredSkill === skill.name 
                  ? `linear-gradient(135deg, ${skill.color}10, transparent)`
                  : undefined
              }}
            >
              {/* Icon and Name */}
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold"
                  style={{ 
                    backgroundColor: skill.color + '20',
                    color: skill.color,
                    border: `2px solid ${skill.color}40`
                  }}
                  animate={{
                    rotateY: hoveredSkill === skill.name ? 180 : 0
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {skill.icon}
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{skill.name}</h4>
                  <p className="text-gray-400 text-sm">{skill.category}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Proficiency</span>
                  <span className="text-primary-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${skill.color}15, transparent 70%)`,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {categories.slice(1).map((category) => {
          const count = skills.filter(skill => skill.category === category).length
          const avgLevel = Math.round(
            skills.filter(skill => skill.category === category)
              .reduce((sum, skill) => sum + skill.level, 0) / count
          )
          
          return (
            <div
              key={category}
              className="bg-dark-800/50 rounded-lg p-4 text-center border border-gray-700/50"
            >
              <div className="text-2xl font-bold text-primary-400">{count}</div>
              <div className="text-gray-400 text-xs mb-1">{category}</div>
              <div className="text-xs text-gray-500">{avgLevel}% avg</div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
