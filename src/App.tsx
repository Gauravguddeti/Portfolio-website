import { motion } from 'framer-motion'
import ProjectShowcase from './components/ProjectShowcase'
import SkillsDisplay from './components/SkillsDisplay'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-white">
              Gaurav Guddeti
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6 text-gray-300">
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 text-white">
              Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Developer</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
              3rd Year CS Student | AI Developer Intern at ChatMaven | Building intelligent systems and elegant web experiences with modern technologies. 
              Passionate about AI/ML and creating impactful digital solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-lg font-medium border-2 border-gray-600 text-gray-300 hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Tech Stack Preview */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {['React', 'Python', 'TypeScript', 'AI/ML', 'Node.js', 'Docker'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-gray-300 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <SkillsDisplay />

      {/* Projects Section */}
      <ProjectShowcase />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400">
            © 2025 Gaurav Guddeti. Crafted with React, TypeScript, and ❤️
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
