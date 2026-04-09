import { motion } from 'framer-motion'
import { 
  SiReact, SiPython, SiJavascript, SiTypescript, SiNodedotjs, SiMongodb, 
  SiMysql, SiFirebase, SiTailwindcss, SiTensorflow, SiPytorch, SiStreamlit,
  SiFlutter, SiKotlin, SiCss3, SiHtml5, SiGit
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const ArcReactor = () => {
  const techCategories = {
    frontend: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    ],
    backend: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    ],
    ai: [
      { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
      { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
      { name: 'Kotlin', icon: SiKotlin, color: '#0095D5' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
    ]
  }

  const TechRing = ({ 
    technologies, 
    radius, 
    duration, 
    reverse = false 
  }: { 
    technologies: Array<{ name: string; icon: any; color: string }>;
    radius: number;
    duration: number;
    reverse?: boolean;
  }) => {
    const angleStep = 360 / technologies.length

    return (
      <motion.div
        className="absolute inset-0 overflow-visible"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {technologies.map((tech, index) => {
          const angle = (index * angleStep) * (Math.PI / 180)
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={tech.name}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
            >
              <motion.div
                className="flex flex-col items-center group cursor-pointer relative z-30"
                whileHover={{ scale: 1.2 }}
                animate={{ rotate: reverse ? 360 : -360 }}
                transition={{
                  rotate: {
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 0.2,
                  },
                }}
              >
                <div 
                  className="p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${tech.color}20`,
                    border: `3px solid ${tech.color}60`,
                  }}
                >
                  <tech.icon 
                    size={28} 
                    style={{ color: tech.color }}
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                  <div 
                    className="text-xs font-medium px-3 py-2 rounded-lg border-2 whitespace-nowrap"
                    style={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      color: tech.color,
                      borderColor: `${tech.color}60`,
                      boxShadow: `0 4px 12px rgba(0,0,0,0.4), 0 0 20px ${tech.color}30`
                    }}
                  >
                    {tech.name}
                    <div 
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 border-t-2 border-l-2"
                      style={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        borderColor: `${tech.color}60`
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className="relative w-[600px] h-[600px] mx-auto mb-20 overflow-visible">
      {/* Core center */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, #1e40af 70%, #1e3a8a 100%)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3)',
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3)',
            '0 0 40px rgba(59, 130, 246, 0.9), inset 0 0 30px rgba(59, 130, 246, 0.5)',
            '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 opacity-80" />
      </motion.div>

      {/* Ring guides (subtle) */}
      <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-cyan-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-purple-500/15 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[480px] h-[480px] border border-blue-500/10 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

      {/* Tech rings */}
      <TechRing 
        technologies={techCategories.ai}
        radius={130}
        duration={25}
        reverse={false}
      />
      
      <TechRing 
        technologies={techCategories.backend}
        radius={180}
        duration={35}
        reverse={true}
      />
      
      <TechRing 
        technologies={techCategories.frontend}
        radius={230}
        duration={45}
        reverse={false}
      />

      {/* Category labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-blue-300 text-sm font-semibold tracking-wider">
          FRONTEND
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-purple-300 text-sm font-semibold tracking-wider origin-center">
          BACKEND
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-cyan-300 text-sm font-semibold tracking-wider">
          AI & TOOLS
        </div>
      </div>
    </div>
  )
}

export default ArcReactor
