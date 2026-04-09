"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Linkedin, Github, Code2 } from "lucide-react"

export default function ContactFooter() {
  const contactInfo = [
    { icon: MapPin, text: "Pune, India", label: "Location" },
    { icon: Phone, text: "+91 7276082005", label: "Phone", href: "tel:+917276082005" },
    { icon: Mail, text: "guddetigaurav1@gmail.com", label: "Email", href: "mailto:guddetigaurav1@gmail.com" },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/gaurav-guddeti-a2359827b",
      color: "hover:text-blue-400",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Gauravguddeti",
      color: "hover:text-purple-400",
    },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0e_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left column - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Gaurav Guddeti
                </h3>
                <p className="text-gray-400">AI Engineer & Full-Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Passionate about building intelligent solutions that make a difference. Specializing in AI/ML, Full-Stack
              Development, and innovative tech solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800 rounded-lg transition-all ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Right column - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h4>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon
                const content = (
                  <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all group">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                      <p className="text-white font-medium">{info.text}</p>
                    </div>
                  </div>
                )

                if (info.href) {
                  return (
                    <a key={info.label} href={info.href} className="block">
                      {content}
                    </a>
                  )
                }
                return <div key={info.label}>{content}</div>
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-500">
            © {new Date().getFullYear()} Gaurav Guddeti. Crafted with{" "}
            <span className="text-red-500">❤️</span> and <span className="text-blue-400">AI</span>
          </p>
          <p className="text-gray-600 text-sm mt-2">Building the future, one line of code at a time.</p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    </footer>
  )
}
