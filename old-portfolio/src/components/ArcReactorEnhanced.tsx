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
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; radius: number; speed: number }>>([])

  // Initialize energy particles
  useEffect(() => {
    const particleCount = 40
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / particleCount,
      radius: 50 + Math.random() * 250,
      speed: 0.5 + Math.random() * 2
    }))
    setParticles(newParticles)
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
    ringColor,
    label,
    labelAngle = 0
  }: { 
    technologies: Technology[]
    radius: number
    speed: number
    reverse?: boolean
    ringColor: string
    label: string
    labelAngle?: number
  }) => {
    const iconSizes = { sm: 24, md: 32, lg: 40 }
    
    return (
      <>
        {/* Rotating orbit */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: reverse ? -360 : 360 }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ willChange: 'transform' }}
        >
          {/* Orbital ring with metallic look */}
          <div 
            className="absolute top-1/2 left-1/2 rounded-full border opacity-20"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              transform: 'translate(-50%, -50%)',
              borderColor: ringColor,
              borderWidth: '1px',
              boxShadow: `0 0 20px ${ringColor}30, inset 0 0 20px ${ringColor}15`
            }}
          />
          
          {/* Technology icons on orbit */}
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
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  willChange: 'transform'
                }}
                whileHover={{ scale: 1.4, zIndex: 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon container with glow */}
                <motion.div
                  className="relative flex items-center justify-center rounded-full p-2"
                  style={{
                    background: `radial-gradient(circle, ${tech.color}25 0%, transparent 70%)`,
                    boxShadow: `0 0 15px ${tech.color}60`
                  }}
                  animate={{
                    rotate: reverse ? 360 : -360
                  }}
                  transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <tech.icon 
                    size={size} 
                    color={tech.color}
                    style={{ 
                      filter: `drop-shadow(0 0 8px ${tech.color})`,
                      willChange: 'transform'
                    }}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-xs font-semibold px-3 py-1 rounded-full pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${tech.color}40, ${tech.color}20)`,
                      color: tech.color,
                      boxShadow: `0 4px 15px ${tech.color}30`,
                      border: `1px solid ${tech.color}50`
                    }}
                  >
                    {tech.name}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Category label */}
        <div 
          className="absolute text-xs font-bold tracking-[0.2em] px-3 py-1.5 rounded-full pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${labelAngle}deg) translateY(-${radius + 35}px) rotate(-${labelAngle}deg)`,
            color: ringColor,
            textShadow: `0 0 15px ${ringColor}, 0 0 30px ${ringColor}`,
            background: `radial-gradient(ellipse, ${ringColor}15 0%, transparent 70%)`,
            border: `1px solid ${ringColor}30`
          }}
        >
          {label}
        </div>
      </>
    )
  }

  return (
    <div className="relative w-full max-w-[800px] h-[800px] mx-auto my-20" style={{ willChange: 'transform' }}>
      {/* Energy particles */}
      {particles.map((particle) => {
        const baseX = particle.radius * Math.cos(particle.angle)
        const baseY = particle.radius * Math.sin(particle.angle)
        
        return (
          <motion.div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)',
              boxShadow: '0 0 8px #60A5FA',
              x: baseX,
              y: baseY,
              translateX: '-50%',
              translateY: '-50%',
              willChange: 'transform, opacity'
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
              rotate: 360
            }}
            transition={{
              opacity: {
                duration: 2,
                repeat: Infinity,
                delay: particle.id * 0.1
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                delay: particle.id * 0.1
              },
              rotate: {
                duration: 20 / particle.speed,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        )
      })}

      {/* Arc Reactor Core - Hexagonal design */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-40 h-40"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity'
        }}
      >
        {/* Outer hexagonal glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, #60A5FA, #3B82F6, #2563EB, #1D4ED8, #1E40AF, #60A5FA)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            filter: 'blur(12px)',
            opacity: 0.7
          }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            rotate: 360
          }}
          transition={{
            opacity: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />

        {/* Middle hexagon */}
        <div
          className="absolute inset-4"
          style={{
            background: 'radial-gradient(circle, #60A5FA 0%, #3B82F6 40%, #1E40AF 80%, transparent 100%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            boxShadow: '0 0 50px #60A5FA, inset 0 0 40px #3B82F6'
          }}
        />

        {/* Inner bright core */}
        <motion.div 
          className="absolute inset-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, #FFFFFF 0%, #60A5FA 50%, #3B82F6 100%)',
            boxShadow: '0 0 60px #FFFFFF, 0 0 100px #60A5FA, inset 0 0 40px #FFFFFF'
          }}
          animate={{
            boxShadow: [
              '0 0 60px #FFFFFF, 0 0 100px #60A5FA, inset 0 0 40px #FFFFFF',
              '0 0 80px #FFFFFF, 0 0 140px #60A5FA, inset 0 0 50px #FFFFFF',
              '0 0 60px #FFFFFF, 0 0 100px #60A5FA, inset 0 0 40px #FFFFFF'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Center white dot */}
        <div 
          className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, #FFFFFF 0%, #60A5FA 100%)',
            boxShadow: '0 0 25px #FFFFFF'
          }}
        />
      </motion.div>

      {/* Tech orbits with labels */}
      <TechOrbit 
        technologies={techCategories.frontend}
        radius={300}
        speed={45}
        reverse={false}
        ringColor="#60A5FA"
        label="FRONTEND"
        labelAngle={0}
      />
      
      <TechOrbit 
        technologies={techCategories.backend}
        radius={210}
        speed={38}
        reverse={true}
        ringColor="#A855F7"
        label="BACKEND"
        labelAngle={90}
      />
      
      <TechOrbit 
        technologies={techCategories.ai}
        radius={130}
        speed={32}
        reverse={false}
        ringColor="#06B6D4"
        label="AI & TOOLS"
        labelAngle={180}
      />

      {/* Outer structural ring */}
      <div 
        className="absolute top-1/2 left-1/2 rounded-full border-2 opacity-10"
        style={{
          width: '750px',
          height: '750px',
          transform: 'translate(-50%, -50%)',
          borderColor: '#60A5FA',
          boxShadow: '0 0 30px #60A5FA20, inset 0 0 30px #60A5FA10'
        }}
      />
    </div>
  )
}

export default ArcReactorEnhanced
