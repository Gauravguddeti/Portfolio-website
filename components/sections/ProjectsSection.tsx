'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from '@/components/icons'
import { HoverTooltip, jokes } from '@/components/ui/HoverTooltip'

const projects = [
  {
    title: "SmartJeb",
    description: "An intelligent job portal with AI-powered recommendations and skill matching",
    longDescription: "SmartJeb leverages machine learning algorithms to match candidates with ideal job opportunities based on skills, experience, and preferences. Features include intelligent resume parsing, skill gap analysis, and personalized job recommendations.",
    demo: "https://smartjeb.vercel.app",
    github: "https://github.com/Gauravguddeti/SmartJeb",
    tags: ["React", "Next.js", "AI", "Machine Learning", "NLP"],
    status: "Live",
    impact: "10k+ users"
  },
  {
    title: "Crop Analyzer",
    description: "Disease detection system for agricultural crops using computer vision",
    longDescription: "Advanced computer vision system that identifies crop diseases from plant images with 92% accuracy. Provides farmers with instant diagnosis and treatment recommendations, supporting sustainable agriculture practices.",
    demo: "https://cropdiseaseanalyzer.vercel.app",
    github: "https://github.com/Gauravguddeti/CropDiseaseDetector",
    tags: ["Python", "OpenCV", "Deep Learning", "Agriculture", "TensorFlow"],
    status: "Live",
    impact: "92% accuracy"
  },
  {
    title: "Deblurryfy",
    description: "Image deblurring application using advanced AI algorithms",
    longDescription: "State-of-the-art image deblurring tool using deep learning models. Restores clarity to blurred images with minimal artifacts, supporting multiple blur types including motion and gaussian blur.",
    demo: null,
    github: "https://github.com/Gauravguddeti/deblurryfy",
    tags: ["Python", "Computer Vision", "AI", "Image Processing", "GAN"],
    status: "Beta",
    impact: "15x faster"
  },
  {
    title: "Smart Traffic System",
    description: "Intelligent traffic management system with real-time optimization",
    longDescription: "IoT-based traffic management system that optimizes signal timing based on real-time traffic density. Reduces average wait times by 30% through intelligent scheduling and adaptive control algorithms.",
    demo: null,
    github: "https://github.com/Gauravguddeti/smart-traffic-signal",
    tags: ["IoT", "Python", "Optimization", "Smart City", "Arduino"],
    status: "Prototype",
    impact: "30% faster"
  },
  {
    title: "Khaaozy",
    description: "Smart Canteen Management System for educational institutions",
    longDescription: "A comprehensive multi-platform canteen management solution featuring AI-powered menu parsing, real-time order management, and role-based access control. Streamlines canteen operations with intelligent inventory tracking and automated billing systems.",
    demo: null,
    github: "https://github.com/Gauravguddeti/khaaozy/tree/main",
    tags: ["React", "Node.js", "AI", "Management System", "Real-time", "MongoDB"],
    status: "Live",
    impact: "Multi-platform"
  },
  {
    title: "Jarvis AI",
    description: "Personal AI assistant with voice recognition and task automation",
    longDescription: "Multi-modal AI assistant capable of voice recognition, natural language processing, and task automation. Integrates with various APIs and services for comprehensive personal productivity management.",
    demo: null,
    github: "https://github.com/Gauravguddeti/jarvis",
    tags: ["Python", "NLP", "Voice Recognition", "AI", "APIs"],
    status: "Development",
    impact: "Multi-modal"
  }
]

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of projects showcasing my passion for AI, machine learning, and full-stack development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                data-cursor="project"
                title={`${project.title} - ${project.description}`}
              >
              <div className="h-full glassmorphism rounded-xl p-6 border border-gray-800 hover:border-primary-400/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary-500/10 hover:bg-gray-800/30">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      project.status === 'Development' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="text-xs text-primary-300 font-medium">
                    Impact: {project.impact}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full border border-primary-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                  {project.demo && (
                    <HoverTooltip 
                      content="Live Demo"
                      joke={jokes.demo}
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                        data-cursor="button"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    </HoverTooltip>
                  )}
                  <HoverTooltip 
                    content="Source Code"
                    joke={jokes.github}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors"
                      data-cursor="button"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  </HoverTooltip>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
