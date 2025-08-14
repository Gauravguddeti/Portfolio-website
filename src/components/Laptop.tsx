import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import { SiReact, SiTensorflow } from 'react-icons/si'

interface LaptopProps {
  isDarkMode: boolean
}

const Laptop: React.FC<LaptopProps> = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects = [
    {
      title: "GitHub Profile",
      icon: <FaGithub className="text-4xl" />,
      url: "https://github.com/Gauravguddeti",
      description: "Explore my code repositories and contributions",
      color: isDarkMode ? "text-white hover:text-neonGreen" : "text-lightNavy hover:text-coffeeBrown"
    },
    {
      title: "SmartJeb Website",
      icon: <SiReact className="text-4xl" />,
      url: "https://smartjeb.vercel.app",
      description: "Modern web application built with React",
      color: isDarkMode ? "text-blue-400 hover:text-neonBlue" : "text-blue-600 hover:text-blue-800"
    },
    {
      title: "Crop Analyzer",
      icon: <SiTensorflow className="text-4xl" />,
      url: "https://cropdiseaseanalyzer.vercel.app",
      description: "AI-powered crop disease detection system",
      color: isDarkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-800"
    }
  ]

  return (
    <>
      {/* Laptop */}
      <motion.div
        className={`relative w-96 h-64 rounded-2xl shadow-2xl cursor-pointer interactive-cursor ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Screen */}
        <div className={`absolute top-6 left-6 right-6 bottom-20 rounded-xl ${
          isDarkMode 
            ? 'bg-gray-900 border border-gray-600' 
            : 'bg-black'
        }`}>
          {/* Screen Content */}
          <div className="p-6 h-full flex flex-col justify-center items-center">
            <motion.div
              className={`text-3xl font-bold mb-4 ${
                isDarkMode ? 'text-neonGreen' : 'text-green-400'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &gt; Hello World
            </motion.div>
            <div className="text-gray-400 text-center">
              Click to explore my projects
            </div>
          </div>
        </div>
        
        {/* Keyboard */}
        <div className={`absolute bottom-3 left-10 right-10 h-14 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}>
          <div className="grid grid-cols-15 gap-1 p-3">
            {Array(15).fill(0).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-sm ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className={`relative w-full max-w-4xl mx-4 p-8 rounded-3xl shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Modal Content */}
              <div className="text-center mb-8">
                <h2 className={`text-4xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-lightNavy'
                }`}>
                  My Projects
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Explore my work and contributions
                </p>
              </div>

              {/* Project Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.a
                    key={project.title}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`${project.color} mb-4 text-center`}>
                      {project.icon}
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm font-medium">
                      <span className={isDarkMode ? 'text-neonGreen' : 'text-coffeeBrown'}>
                        Visit
                      </span>
                      <FaExternalLinkAlt className="text-xs" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Laptop
