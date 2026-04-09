import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaBrain, FaLaptopCode, FaCode } from 'react-icons/fa'
import MagneticButton from './MagneticButton'

interface ProjectCardProps {
  title: string
  description: string
  github: string
  demo?: string
  tech: string[]
  category: string
  index: number
}

const ProjectCard = ({ title, description, github, demo, tech, category, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -10
    const rotateYValue = (mouseX / (rect.width / 2)) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const getCategoryIcon = () => {
    switch (category) {
      case 'AI/ML':
        return <FaBrain className="text-blue-400" />
      case 'Full-Stack':
        return <FaLaptopCode className="text-purple-400" />
      default:
        return <FaCode className="text-green-400" />
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="project-card bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-blue-400/30 hover:border-blue-400/60 transition-all backdrop-blur-sm relative overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          transform: 'translateZ(1px)',
        }}
      />

      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
            {category}
          </span>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-400/30"
          >
            {getCategoryIcon()}
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-white hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {tech.map(techItem => (
            <span
              key={techItem}
              className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm border border-gray-600/30"
            >
              {techItem}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <MagneticButton
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-gray-600/30 hover:border-gray-500/50 ${
              demo ? 'flex-1' : 'w-full'
            } justify-center text-white`}
          >
            <FaGithub />
            <span>Code</span>
          </MagneticButton>
          {demo && (
            <MagneticButton
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-colors flex-1 justify-center text-white"
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </MagneticButton>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
