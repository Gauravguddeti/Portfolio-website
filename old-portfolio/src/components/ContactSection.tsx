import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-xl" />,
      title: "Email",
      value: "gauravguddeti@gmail.com",
      link: "mailto:gauravguddeti@gmail.com",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://www.linkedin.com/in/gaurav-guddeti-a2359827b",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaGithub className="text-xl" />,
      title: "GitHub",
      value: "View my code",
      link: "https://github.com/Gauravguddeti",
      color: "from-gray-500 to-gray-600"
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      title: "Location",
      value: "India",
      link: null,
      color: "from-green-500 to-emerald-500"
    }
  ]

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-2xl" />,
      url: "https://www.linkedin.com/in/gaurav-guddeti-a2359827b",
      label: "LinkedIn",
      color: "#0077B5"
    },
    {
      icon: <FaGithub className="text-2xl" />,
      url: "https://github.com/Gauravguddeti",
      label: "GitHub",
      color: "#333"
    },
    {
      icon: <SiGmail className="text-2xl" />,
      url: "mailto:gauravguddeti@gmail.com",
      label: "Email",
      color: "#EA4335"
    }
  ]

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm always open to new opportunities and interesting projects. 
            Let's connect and discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Let's Connect!
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Whether you're looking to collaborate on a project, need help with development, 
                or just want to say hello, I'd love to hear from you. Feel free to reach out 
                through any of the channels below.
              </p>
            </div>

            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                {contact.link ? (
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all group-hover:bg-slate-800/80"
                  >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${contact.color} text-white`}>
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {contact.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${contact.color} text-white`}>
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {contact.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <motion.a
                href="#" // Add your resume link here
                download
                className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="text-lg" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social Links & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Follow My Journey
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Currently working as an AI Developer Intern at ChatMaven, building intelligent solutions and exploring the latest in AI/ML technology. 
                Let's connect and collaborate on innovative projects!
              </p>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4 mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-gray-300 hover:text-white transition-all"
                    style={{ '--hover-color': social.color } as any}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: social.color + '20',
                      borderColor: social.color
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                >
                  <div className="text-2xl font-bold text-blue-400 mb-1">10+</div>
                  <div className="text-sm text-gray-300">Projects</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                >
                  <div className="text-2xl font-bold text-purple-400 mb-1">1+</div>
                  <div className="text-sm text-gray-300">Mo. Experience</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                >
                  <div className="text-2xl font-bold text-green-400 mb-1">AI</div>
                  <div className="text-sm text-gray-300">Focus</div>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-gray-300 mb-4">
                  Ready to start a project together?
                </p>
                <motion.a
                  href="mailto:gauravguddeti@gmail.com"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="text-lg" />
                  <span>Send Message</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
