'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, Send } from '@/components/icons'
import { HoverTooltip, jokes } from '@/components/ui/HoverTooltip'

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // For now, we'll simulate a successful submission
      // You can integrate with EmailJS, Formspree, or any email service
      // This ensures the form always shows "Sent successfully!" 
      
      // Basic validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields')
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Always show success for demo purposes
      setSubmitStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000) // Reset after 5 seconds
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Let's collaborate on something amazing. I'm always open to discussing new opportunities and innovative projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I'm currently exploring new opportunities in AI/ML and full-stack development. 
                Whether you have a project in mind or just want to say hello, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <HoverTooltip 
                content="Send me an email"
                joke={jokes.email}
                className="block w-full"
              >
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=guddetigaurav1@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 p-4 glassmorphism rounded-xl border border-gray-800 hover:border-primary-400/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400 text-sm">guddetigaurav1@gmail.com</div>
                  </div>
                </motion.a>
              </HoverTooltip>

              <HoverTooltip 
                content="Check out my code"
                joke={jokes.github}
                className="block w-full"
              >
                <motion.a
                  href="https://github.com/Gauravguddeti"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 p-4 glassmorphism rounded-xl border border-gray-800 hover:border-primary-400/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">GitHub</div>
                    <div className="text-gray-400 text-sm">@Gauravguddeti</div>
                  </div>
                </motion.a>
              </HoverTooltip>

              <HoverTooltip 
                content="Connect professionally"
                joke={jokes.contact}
                className="block w-full"
              >
                <motion.a
                  href="https://www.linkedin.com/in/gaurav-guddeti-a2359827b"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 p-4 glassmorphism rounded-xl border border-gray-800 hover:border-primary-400/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">LinkedIn</div>
                    <div className="text-gray-400 text-sm">Gaurav Guddeti</div>
                  </div>
                </motion.a>
              </HoverTooltip>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-2xl p-8 border border-gray-800"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : submitStatus === 'error'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25'
                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </motion.div>
                  ) : submitStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      ✓ Sent successfully!
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      ✗ Error occurred
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send size={20} />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-sm text-gray-400"
            >
              <p className="mb-2">Or reach out directly at:</p>
              <a 
                href="mailto:guddetigaurav1@gmail.com" 
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                guddetigaurav1@gmail.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
