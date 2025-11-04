import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { IconType } from 'react-icons'
import { 
  FaPython, FaDocker, FaJava
} from 'react-icons/fa'
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiTensorflow,
  SiPytorch, SiGraphql, SiTailwindcss, SiVite,
  SiFirebase, SiFlutter, SiOpencv,
  SiNextdotjs, SiStreamlit, SiKotlin, SiMysql, SiJavascript,
  SiHtml5, SiCss3, SiGit, SiReact, SiNodedotjs
} from 'react-icons/si'

interface Technology {
  name: string
  icon: IconType
  color: string
  size?: 'sm' | 'md' | 'lg'
}

const ArcReactorEnhanced = () => {
  const [rotation, setRotation] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; radius: number; speed: number }>>([])

  // Initialize energy particles
  useEffect(() => {
    const particleCount = 30
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / particleCount,
      radius: 50 + Math.random() * 200,
      speed: 0.5 + Math.random() * 1.5
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const techCategories = {
    frontend: [
      { name: 'React', icon: SiReact, color: '#61DAFB', size: 'lg' as const },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', size: 'lg' as const },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', size: 'md' as const },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', size: 'md' as const },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', size: 'md' as const },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26', size: 'sm' as const },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6', size: 'sm' as const },
      { name: 'Vite', icon: SiVite, color: '#646CFF', size: 'sm' as const }
    ],
    backend: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933', size: 'lg' as const },
      { name: 'Python', icon: FaPython, color: '#3776AB', size: 'lg' as const },
      { name: 'Java', icon: FaJava, color: '#ED8B00', size: 'md' as const },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', size: 'md' as const },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1', size: 'md' as const },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', size: 'sm' as const },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098', size: 'sm' as const },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', size: 'sm' as const }
    ],
    ai: [
      { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', size: 'lg' as const },
      { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', size: 'lg' as const },
      { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8', size: 'md' as const },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B', size: 'md' as const },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B', size: 'md' as const },
      { name: 'Kotlin', icon: SiKotlin, color: '#0095D5', size: 'sm' as const },
      { name: 'Git', icon: SiGit, color: '#F05032', size: 'sm' as const },
      { name: 'Docker', icon: FaDocker, color: '#2496ED', size: 'sm' as const }
    ]
  }

  const TechOrbit = ({ 
    technologies, 
    radius, 
    speed, 
    reverse = false,
    ringColor 
  }: { 
    technologies: Technology[]
    radius: number
    speed: number
    reverse?: boolean
    ringColor: string
  }) => {
    const iconSizes = { sm: 20, md: 26, lg: 32 }
    
    return (
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Orbital ring with glow */}
        <div 
          className="absolute top-1/2 left-1/2 rounded-full border-2 opacity-30"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            transform: 'translate(-50%, -50%)',
            borderColor: ringColor,
            boxShadow: `0 0 20px ${ringColor}40, inset 0 0 20px ${ringColor}20`
          }}
        />
        
        {technologies.map((tech, index) => {
          const angle = (Math.PI * 2 * index) / technologies.length
          const x = radius * Math.cos(angle)
          const y = radius * Math.sin(angle)
          const size = iconSizes[tech.size || 'md']

          return (
            <motion.div
              key={tech.name}
              className="absolute top-1/2 left-1/2 group cursor-pointer"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
              whileHover={{ scale: 1.3, zIndex: 50 }}
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{
                rotate: {
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 0.2
                }
              }}
            >
              <div 
                className="p-3 rounded-full backdrop-blur-md transition-all duration-300 relative"
                style={{
                  backgroundColor: `${tech.color}15`,
                  border: `2px solid ${tech.color}50`,
                  boxShadow: `0 0 20px ${tech.color}40`
                }}
              >
                <tech.icon size={size} style={{ color: tech.color }} />
                
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: tech.color }}
                />
              </div>
              
              {/* Tooltip */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                style={{
                  backgroundColor: `${tech.color}20`,
                  border: `2px solid ${tech.color}`,
                  color: tech.color,
                  boxShadow: `0 4px 20px ${tech.color}40`
                }}
              >
                {tech.name}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className="relative w-full max-w-[700px] h-[700px] mx-auto my-20">
      {/* Energy particles */}
      {particles.map((particle) => {
        const x = particle.radius * Math.cos(particle.angle + rotation * 0.05)
        const y = particle.radius * Math.sin(particle.angle + rotation * 0.05)
        
        return (
          <motion.div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)',
              boxShadow: '0 0 8px #60A5FA',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.id * 0.1
            }}
          />
        )
      })}

      {/* Core center with pulsing glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #60A5FA 0%, #3B82F6 30%, #1E40AF 70%, transparent 100%)',
          boxShadow: '0 0 60px #60A5FA, 0 0 120px #3B82F6, inset 0 0 40px #FFFFFF40'
        }}
        animate={{
          boxShadow: [
            '0 0 60px #60A5FA, 0 0 120px #3B82F6, inset 0 0 40px #FFFFFF40',
            '0 0 80px #60A5FA, 0 0 160px #3B82F6, inset 0 0 60px #FFFFFF60',
            '0 0 60px #60A5FA, 0 0 120px #3B82F6, inset 0 0 40px #FFFFFF40'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Inner core */}
        <div 
          className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, #FFFFFF 0%, #60A5FA 100%)',
            boxShadow: '0 0 30px #FFFFFF, inset 0 0 20px #60A5FA'
          }}
        />
      </motion.div>

      {/* Tech orbits */}
      <TechOrbit 
        technologies={techCategories.frontend}
        radius={280}
        speed={40}
        reverse={false}
        ringColor="#60A5FA"
      />
      
      <TechOrbit 
        technologies={techCategories.backend}
        radius={200}
        speed={35}
        reverse={true}
        ringColor="#A855F7"
      />
      
      <TechOrbit 
        technologies={techCategories.ai}
        radius={120}
        speed={30}
        reverse={false}
        ringColor="#06B6D4"
      />

      {/* Category labels with glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold tracking-wider px-4 py-2 rounded-full"
          style={{
            color: '#60A5FA',
            textShadow: '0 0 10px #60A5FA, 0 0 20px #60A5FA',
            background: 'radial-gradient(ellipse, #60A5FA20 0%, transparent 70%)'
          }}
        >
          FRONTEND
        </div>
        <div 
          className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-sm font-bold tracking-wider px-4 py-2 rounded-full origin-center"
          style={{
            color: '#A855F7',
            textShadow: '0 0 10px #A855F7, 0 0 20px #A855F7',
            background: 'radial-gradient(ellipse, #A855F720 0%, transparent 70%)'
          }}
        >
          BACKEND
        </div>
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold tracking-wider px-4 py-2 rounded-full"
          style={{
            color: '#06B6D4',
            textShadow: '0 0 10px #06B6D4, 0 0 20px #06B6D4',
            background: 'radial-gradient(ellipse, #06B6D420 0%, transparent 70%)'
          }}
        >
          AI & TOOLS
        </div>
      </div>
    </div>
  )
}

export default ArcReactorEnhanced
