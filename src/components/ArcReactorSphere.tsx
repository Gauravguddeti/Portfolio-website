import { motion } from 'framer-motion'
import IconSphereGrid, { type IconData } from './ui/icon-sphere'
import { 
  SiReact, SiPython, SiJavascript, SiTypescript, SiNodedotjs, SiMongodb, 
  SiMysql, SiFirebase, SiTailwindcss, SiTensorflow, SiPytorch, SiStreamlit,
  SiFlutter, SiKotlin, SiCss3, SiHtml5, SiGit
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

/**
 * ArcReactorSphere - 3D Interactive Tech Stack Sphere
 * 
 * An enhanced Arc Reactor component that displays tech stack icons in a 3D sphere.
 * Features drag-to-rotate, auto-rotation, and hover effects without clickable actions.
 */

const ArcReactorSphere = () => {
  // Tech stack with icons and colors
  const techIcons: IconData[] = [
    { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB' },
    { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { id: 'tailwind', name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { id: 'html5', name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { id: 'css3', name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { id: 'python', name: 'Python', icon: SiPython, color: '#3776AB' },
    { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { id: 'java', name: 'Java', icon: FaJava, color: '#ED8B00' },
    { id: 'mongodb', name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { id: 'mysql', name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { id: 'firebase', name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { id: 'tensorflow', name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
    { id: 'pytorch', name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
    { id: 'streamlit', name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
    { id: 'flutter', name: 'Flutter', icon: SiFlutter, color: '#02569B' },
    { id: 'kotlin', name: 'Kotlin', icon: SiKotlin, color: '#0095D5' },
    { id: 'git', name: 'Git', icon: SiGit, color: '#F05032' },
  ]

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-12">
      {/* Section Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Tech Universe
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-gray-400 text-center mb-12 max-w-2xl px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Explore my technology stack in 3D. Drag to rotate, hover to discover each technology.
      </motion.p>

      {/* 3D Sphere Container */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {/* Arc Reactor Core (center glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <motion.div 
            className="w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, #1e40af 70%, #1e3a8a 100%)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.3)',
            }}
            animate={{
              boxShadow: [
                '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.3)',
                '0 0 50px rgba(59, 130, 246, 0.9), inset 0 0 40px rgba(59, 130, 246, 0.5)',
                '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.3)',
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
        </div>

        {/* Orbit rings (subtle guides) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <div className="w-[350px] h-[350px] border border-cyan-500/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-purple-500/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-blue-500/10 rounded-full" />
        </div>

        {/* 3D Sphere with Tech Icons */}
        <div className="relative z-10">
          <IconSphereGrid
            icons={techIcons}
            containerSize={600}
            sphereRadius={250}
            dragSensitivity={0.8}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            baseIconSize={70}
            hoverScale={1.3}
            perspective={1000}
            autoRotate={true}
            autoRotateSpeed={0.2}
            className="mx-auto"
          />
        </div>

        {/* Removed TechIconOverlay - icons are now part of the sphere itself */}
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="mt-8 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p>💫 Drag to explore • Hover for details</p>
      </motion.div>
    </div>
  )
}

export default ArcReactorSphere
