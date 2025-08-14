import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode, FaBrain, FaDesktop } from 'react-icons/fa'
import { SiReact, SiTensorflow, SiPython, SiJavascript, SiMongodb, SiFirebase, SiStreamlit } from 'react-icons/si'

const ProjectShowcase = () => {
  const projects = [
    {
      id: 1,
      title: "SmartJeb E-commerce Platform",
      description: "A comprehensive e-commerce solution with modern UI/UX, shopping cart functionality, and secure payment integration. Built with React and responsive design principles.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "JavaScript", "CSS3", "Responsive Design"],
      icons: [<SiReact />, <SiJavascript />, <FaDesktop />],
      githubUrl: "https://github.com/Gauravguddeti/SmartJeb",
      liveUrl: "https://smartjeb.vercel.app",
      category: "Web Development",
      featured: true
    },
    {
      id: 2,
      title: "AI Crop Disease Analyzer",
      description: "Intelligent crop disease detection system using computer vision and deep learning. Helps farmers identify plant diseases early with high accuracy predictions.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "TensorFlow", "OpenCV", "Streamlit"],
      icons: [<SiPython />, <SiTensorflow />, <SiStreamlit />],
      githubUrl: "https://github.com/Gauravguddeti/crop-disease-analyzer",
      liveUrl: "https://cropdiseaseanalyzer.vercel.app",
      category: "AI/ML",
      featured: true
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my projects and skills. Built with React, TypeScript, and Framer Motion for smooth animations.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      icons: [<SiReact />, <FaCode />, <FaDesktop />],
      githubUrl: "https://github.com/Gauravguddeti/portfolio",
      liveUrl: "#",
      category: "Web Development",
      featured: false
    },
    {
      id: 4,
      title: "Task Management App",
      description: "A full-stack task management application with real-time updates, user authentication, and collaborative features. Perfect for team productivity.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      icons: [<SiReact />, <SiMongodb />, <FaCode />],
      githubUrl: "https://github.com/Gauravguddeti/task-manager",
      liveUrl: "#",
      category: "Full Stack",
      featured: false
    },
    {
      id: 5,
      title: "Weather Analytics Dashboard",
      description: "Interactive weather data visualization dashboard with predictive analytics and historical trends. Built with modern data visualization libraries.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "Streamlit", "Plotly", "Pandas"],
      icons: [<SiPython />, <SiStreamlit />, <FaBrain />],
      githubUrl: "https://github.com/Gauravguddeti/weather-dashboard",
      liveUrl: "#",
      category: "Data Science",
      featured: false
    },
    {
      id: 6,
      title: "Firebase Chat App",
      description: "Real-time chat application with user authentication, message encryption, and file sharing capabilities. Built with modern web technologies.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Firebase", "CSS3", "JavaScript"],
      icons: [<SiReact />, <SiFirebase />, <FaCode />],
      githubUrl: "https://github.com/Gauravguddeti/firebase-chat",
      liveUrl: "#",
      category: "Web Development",
      featured: false
    }
  ]

  return (
    <section id="projects" className="py-20 px-6 bg-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of projects that showcase my skills in web development, AI/ML, and full-stack solutions
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-white">⭐ Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all group"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <div className="flex space-x-4 text-4xl text-white/50">
                      {project.icons.map((icon, iconIndex) => (
                        <span key={iconIndex}>{icon}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    <div className="flex space-x-2">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub className="text-lg" />
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt className="text-lg" />
                      </motion.a>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-white">🚀 All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all group"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <div className="flex space-x-2 text-2xl text-white/50">
                      {project.icons.slice(0, 2).map((icon, iconIndex) => (
                        <span key={iconIndex}>{icon}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                    <div className="flex space-x-1">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-gray-300 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub className="text-sm" />
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-blue-500 hover:bg-blue-600 rounded-md text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt className="text-sm" />
                      </motion.a>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    {project.description.substring(0, 100)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-slate-700 text-gray-300 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Want to see more?
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Check out my GitHub for more projects and contributions
            </p>
            <motion.a
              href="https://github.com/Gauravguddeti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="text-xl" />
              <span>Visit GitHub</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectShowcase
