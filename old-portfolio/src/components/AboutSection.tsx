import { motion } from 'framer-motion'
import { FaRocket, FaGraduationCap, FaCode, FaLightbulb } from 'react-icons/fa'

const AboutSection = () => {
  const highlights = [
    {
      icon: <FaRocket className="text-2xl" />,
      title: "AI/ML Enthusiast",
      description: "Passionate about building intelligent systems and exploring cutting-edge ML technologies"
    },
    {
      icon: <FaCode className="text-2xl" />,
      title: "Full Stack Developer",
      description: "Experienced in React, Python, Java, and modern web technologies"
    },
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Continuous Learner",
      description: "Always staying updated with the latest tech trends and best practices"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Problem Solver",
      description: "Love tackling complex challenges and turning ideas into reality"
    }
  ]

  return (
    <section id="about" className="py-20 px-6 bg-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer and 3rd year Computer Science student with a strong focus on AI/ML technologies. 
            Currently working as an AI Dev Intern at ChatMaven while pursuing my studies, 
            building innovative projects that bridge the gap between traditional software development and artificial intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:bg-slate-700/80 transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 text-white">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {highlight.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4 text-white">
              When I'm not coding...
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              You'll find me strategizing in Valorant, exploring new AI research papers, 
              or experimenting with the latest web technologies. I believe in balancing 
              technical growth with creative problem-solving.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-gray-300">
                🎮 Gaming
              </span>
              <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-gray-300">
                📚 Research
              </span>
              <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-gray-300">
                ☕ Coffee
              </span>
              <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-gray-300">
                🔬 Experimentation
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
