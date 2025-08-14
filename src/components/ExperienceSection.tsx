import { motion } from 'framer-motion'
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaRocket, FaCode, FaBrain } from 'react-icons/fa'
import { SiOpenai } from 'react-icons/si'

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: "ChatMaven",
      position: "AI Developer Intern",
      duration: "July 2025 - Present",
      location: "Remote",
      type: "Internship",
      description: "Working on cutting-edge AI development projects, focusing on conversational AI and machine learning solutions.",
      highlights: [
        "Developing AI-powered chatbot solutions using modern ML frameworks",
        "Collaborating with cross-functional teams on AI product development",
        "Implementing natural language processing features and optimizations",
        "Contributing to scalable AI architecture and deployment strategies"
      ],
      technologies: ["Python", "AI/ML", "NLP", "TensorFlow", "PyTorch"],
      icon: <SiOpenai className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
      current: true
    }
  ]

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Gaining hands-on industry experience while continuing my Computer Science studies
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 opacity-30" />
              
              {/* Experience Card */}
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all ml-16 relative">
                {/* Timeline Dot */}
                <div className="absolute -left-20 top-8 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white">
                  {experience.icon}
                </div>
                
                {/* Current Badge */}
                {experience.current && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full"
                  >
                    Current
                  </motion.div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {experience.position}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <FaBriefcase className="text-blue-400" />
                      <span className="text-xl font-semibold text-blue-400">
                        {experience.company}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                        {experience.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-gray-300 space-y-1">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-purple-400" />
                      <span className="font-medium">{experience.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-purple-400" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {experience.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FaRocket className="text-blue-400 mr-2" />
                    Key Contributions
                  </h4>
                  <ul className="space-y-3">
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <motion.li
                        key={highlightIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.1 + highlightIndex * 0.1 
                        }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3 text-gray-300"
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2" />
                        <span className="leading-relaxed">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FaCode className="text-purple-400 mr-2" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.2 + techIndex * 0.05 
                        }}
                        viewport={{ once: true }}
                        className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm hover:bg-slate-600 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
            <FaBrain className="text-4xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-white">
              Always Learning, Always Growing
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Balancing academic excellence with real-world experience. Every project is an opportunity to apply classroom knowledge 
              and explore new possibilities in AI and software development while pursuing my Computer Science degree.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-gray-300 flex items-center">
                <FaBriefcase className="mr-2 text-blue-400" />
                1+ Month Industry Experience
              </span>
              <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-gray-300 flex items-center">
                <FaCode className="mr-2 text-purple-400" />
                3rd Year CS Student
              </span>
              <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-gray-300 flex items-center">
                <FaRocket className="mr-2 text-green-400" />
                AI/ML Focus
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection
