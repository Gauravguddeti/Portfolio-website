import { motion } from 'framer-motion'
import { useRef } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  
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
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-12 overflow-hidden">
      {/* Dramatic Orbit Rings - Responsive with transform-based centering */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ perspective: '1000px' }}
      >
        {/* Outer ring - 70% of container */}
        <motion.div 
          className="absolute border-2 border-[#60D5FA]/20 rounded-full"
          style={{
            width: 'min(70vw, 340px)',
            height: 'min(70vw, 340px)',
            maxWidth: '340px',
            maxHeight: '340px',
            willChange: 'transform',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
        />
        {/* Middle ring - 55% of container */}
        <motion.div 
          className="absolute border-2 border-[#456882]/20 rounded-full"
          style={{
            width: 'min(55vw, 270px)',
            height: 'min(55vw, 270px)',
            maxWidth: '270px',
            maxHeight: '270px',
            willChange: 'transform',
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        />
        {/* Inner ring - 40% of container */}
        <motion.div 
          className="absolute border-2 border-[#234C6A]/20 rounded-full"
          style={{
            width: 'min(40vw, 200px)',
            height: 'min(40vw, 200px)',
            maxWidth: '200px',
            maxHeight: '200px',
            willChange: 'transform',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>

      {/* 3D Sphere Container - scroll transforms only on sphere */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Arc Reactor Core (center glow) - Enhanced */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
      >
          <motion.div 
            className="w-20 h-20 md:w-24 md:h-24 rounded-full"
            style={{
              background: 'radial-gradient(circle, #60D5FA 0%, #234C6A 70%, #1B3C53 100%)',
              boxShadow: '0 0 30px rgba(96, 213, 250, 0.6), inset 0 0 30px rgba(96, 213, 250, 0.3)',
            }}
            animate={{
              boxShadow: [
                '0 0 30px rgba(96, 213, 250, 0.6), inset 0 0 30px rgba(96, 213, 250, 0.3)',
                '0 0 80px rgba(96, 213, 250, 1), inset 0 0 50px rgba(96, 213, 250, 0.7)',
                '0 0 30px rgba(96, 213, 250, 0.6), inset 0 0 30px rgba(96, 213, 250, 0.3)',
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner glow */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#60D5FA] to-[#234C6A] opacity-80" />
            {/* Energy pulses */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-[#60D5FA]/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </div>

        {/* 3D Sphere with Tech Icons */}
        <div className="relative z-10">
          <IconSphereGrid
            icons={techIcons}
            containerSize={400}
            sphereRadius={150}
            dragSensitivity={0.8}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            baseIconSize={50}
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
