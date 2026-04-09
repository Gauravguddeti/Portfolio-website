import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaVolumeUp, FaVolumeMute, FaCode, 
  FaBrain, FaGraduationCap, FaRocket,
  FaLaptopCode, FaDatabase, FaCloud, FaBars, FaTimes, FaDownload
} from 'react-icons/fa'

import CustomCursor from './components/CustomCursor'
import TypewriterWithGlitch from './components/TypewriterWithGlitch'
import BackgroundJokes from './components/BackgroundJokes'
import ArcReactorSphere from './components/ArcReactorSphere'
import CSSDonut from './components/CSSDonut'
import RotatingOneLiners from './components/RotatingOneLiners'
import ASCIIDonut from './components/ASCIIDonut'
import InteractiveBackground from './components/InteractiveBackground'
import Preloader from './components/Preloader'
import MagneticButton from './components/MagneticButton'
import MagneticLink from './components/MagneticLink'
import ProjectCard from './components/ProjectCard'
import Hero3DCards from './components/Hero3DCards'
import ScrollProgressIndicator from './components/ScrollProgressIndicator'
import Section3DTransition from './components/Section3DTransition'
import PerformanceStats from './components/PerformanceStats'
import { fadeIn, staggerFadeIn, parallax, slideIn, scaleIn, cleanupScrollTriggers } from './utils/gsapAnimations'
import { usePerformanceMonitor, useDeviceCapability } from './hooks/usePerformanceMonitor'
import './App.css'

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-[#60D5FA]/20"
    >
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#60D5FA] via-[#456882] to-[#234C6A]"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%", willChange: 'transform' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <MagneticLink
            href="#home"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#60D5FA] via-[#456882] to-[#234C6A]"
          >
            GAURAV.DEV
          </MagneticLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <MagneticLink
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-[#60D5FA] transition-colors"
              >
                {item.name}
              </MagneticLink>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 hover:text-[#60D5FA] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}



// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Using Formspree for contact form (you'll need to set up a Formspree account)
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      alert('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="w-full p-3 bg-slate-800/50 border border-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          className="w-full p-3 bg-slate-800/50 border border-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          required
          className="w-full p-3 bg-slate-800/50 border border-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

function App() {
  const [isMuted, setIsMuted] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Performance monitoring
  const { fps } = usePerformanceMonitor()
  const { isMobile, isLowEnd } = useDeviceCapability()

  // Handle preloader completion
  const handlePreloaderComplete = () => {
    setIsLoading(false)
    // Start music immediately after loading
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.15
        audioRef.current.play().catch(() => {
          // User interaction required - music will start on first click
          console.log('Music requires user interaction')
        })
      }
    }, 100)
  }

  // Log performance (dev only)
  useEffect(() => {
    console.log(`FPS: ${fps}, Mobile: ${isMobile}, Low-end: ${isLowEnd}`)
  }, [fps, isMobile, isLowEnd])

  // Initialize GSAP ScrollTrigger animations
  useEffect(() => {
    if (isLoading) return

    // Wait for DOM to be ready
    const initAnimations = setTimeout(() => {
      // Hero section parallax
      parallax('.hero-bg-layer-1', { y: 150, scrub: 1.5 })
      parallax('.hero-bg-layer-2', { y: 80, scrub: 1 })

      // Section fade-ins
      fadeIn('.about-section', { y: 60, duration: 1.2 })
      fadeIn('.experience-section', { y: 60, duration: 1.2 })
      fadeIn('.tech-section', { y: 60, duration: 1.2 })
      fadeIn('.contact-section', { y: 60, duration: 1.2 })

      // Project cards stagger
      staggerFadeIn('.project-card', {
        stagger: 0.15,
        y: 50,
        duration: 0.8,
      })

      // Stats animation
      staggerFadeIn('.stat-item', {
        stagger: 0.1,
        y: 30,
        duration: 0.6,
      })

      // Tech stack items
      staggerFadeIn('.tech-item', {
        stagger: 0.05,
        y: 20,
        duration: 0.5,
      })

      // Contact cards
      slideIn('.contact-card-left', { x: -50, duration: 0.8 })
      slideIn('.contact-card-right', { x: 50, duration: 0.8 })

      // Scale animations for icons
      scaleIn('.icon-scale', { scale: 0.5, duration: 0.6 })
    }, 100)

    return () => {
      clearTimeout(initAnimations)
      cleanupScrollTriggers()
    }
  }, [isLoading])

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    // Auto-play background music at low volume with user interaction
    const startAudio = () => {
      if (audioRef.current && !audioRef.current.paused) return
      
      if (audioRef.current) {
        audioRef.current.volume = 0.25 // 25% volume
        audioRef.current.play().catch((error) => {
          console.log('Audio autoplay prevented:', error)
        })
      }
    }

    // Try to play immediately
    startAudio()

    // Also try on first user interaction
    const enableAudio = () => {
      startAudio()
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('keydown', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
    }

    document.addEventListener('click', enableAudio)
    document.addEventListener('keydown', enableAudio)
    document.addEventListener('touchstart', enableAudio)

    // Handle visibility change for power optimization
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
      if (!document.hidden && audioRef.current && !isMuted) {
        audioRef.current.play().catch(() => {})
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('keydown', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isMuted])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const projects = [
    {
      title: "RateMyProf India",
      description: "Comprehensive web platform enabling Indian college students to anonymously rate and review professors and colleges. Built with Next.js 14, FastAPI, PostgreSQL, featuring immersive 3D WebGL animations with React Three Fiber, real-time search, dark mode, and advanced moderation system. Deployed on production serving 1000+ potential users.",
      github: "https://github.com/NihaallX/ratemyprof",
      demo: "https://ratemyprof.me",
      tech: ["Next.js 14", "React 18", "TypeScript", "FastAPI", "PostgreSQL", "Supabase", "Three.js", "Tailwind CSS", "Framer Motion"],
      category: "Full-Stack",
      featured: true,
      highlights: [
        "3D WebGL landing page with React Three Fiber",
        "Anonymous review system with JWT authentication",
        "Real-time search with auto-suggestions",
        "Admin moderation panel & college comparison tool",
        "40% bundle size reduction via dynamic imports",
        "Full dark mode implementation"
      ]
    },
    {
      title: "ASL Vision",
      description: "Real-time American Sign Language recognition system achieving 99.97% accuracy using PyTorch CNN, MediaPipe hand detection, and advanced image preprocessing. Features live camera processing at 30 FPS with intelligent prediction smoothing.",
      github: "https://github.com/Gauravguddeti/ASLVision",
      demo: "https://github.com/Gauravguddeti/ASLVision",
      tech: ["PyTorch", "OpenCV", "MediaPipe", "Python", "Deep Learning", "Computer Vision"],
      category: "AI/ML"
    },
    {
      title: "SmartJeb E-commerce",
      description: "Modern e-commerce platform with React, featuring responsive design, shopping cart functionality, and seamless user experience for online retail.",
      github: "https://github.com/Gauravguddeti/SmartJeb",
      demo: "https://smartjeb.vercel.app",
      tech: ["React", "JavaScript", "CSS3", "Responsive Design"],
      category: "Full-Stack"
    },
    {
      title: "AI Crop Disease Analyzer",
      description: "Deep learning solution for crop disease detection using computer vision and TensorFlow, helping farmers identify plant diseases early.",
      github: "https://github.com/Gauravguddeti/crop-disease-analyzer",
      demo: "https://cropdiseaseanalyzer.vercel.app",
      tech: ["Python", "TensorFlow", "Streamlit", "Computer Vision"],
      category: "AI/ML"
    },
    {
      title: "Deblurryfy Image Enhancer",
      description: "AI-powered image deblurring tool using advanced machine learning algorithms to enhance image quality and remove motion blur.",
      github: "https://github.com/Gauravguddeti/Deblurryfy",
      tech: ["Python", "OpenCV", "Deep Learning", "Image Processing"],
      category: "AI/ML"
    },
    {
      title: "Smart Traffic Signal System",
      description: "IoT-based intelligent traffic management system using computer vision and real-time data analysis for optimized traffic flow.",
      github: "https://github.com/Gauravguddeti/Smart-Traffic-Signal",
      tech: ["Python", "IoT", "Computer Vision", "Arduino"],
      category: "IoT/Hardware"
    },
    {
      title: "Jarvis AI Assistant",
      description: "Voice-activated AI assistant with natural language processing, automation capabilities, and smart home integration features.",
      github: "https://github.com/Gauravguddeti/Jarvis-AI",
      tech: ["Python", "NLP", "Speech Recognition", "APIs"],
      category: "AI/ML"
    },
    {
      title: "Portfolio Website",
      description: "Interactive portfolio website with advanced animations, custom cursor effects, and responsive design showcasing my development journey.",
      github: "https://github.com/Gauravguddeti/portfolio",
      tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
      category: "Frontend"
    }
  ]

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* CustomCursor must be at root level to stay on top */}
      <CustomCursor />
      
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative overflow-x-hidden"
        style={{ 
          perspective: isMobile ? '800px' : '1500px',
          perspectiveOrigin: '50% 50%',
          opacity: isLoading ? 0 : 1,
          visibility: isLoading ? 'hidden' : 'visible',
          transition: 'opacity 0.6s ease-in-out',
        }}
      >
        <InteractiveBackground />
        <Navigation />
        <ScrollProgressIndicator />
        <PerformanceStats fps={fps} />
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/background-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Audio Control - Always visible on scroll */}
      <div className="fixed top-20 right-6 z-[99999]">
        <MagneticButton
          onClick={toggleMute}
          className="p-3 bg-[#1B3C53]/90 border border-[#60D5FA]/40 rounded-full hover:bg-[#234C6A]/90 transition-colors backdrop-blur-md shadow-lg"
          strength={0.15}
        >
          {isMuted ? <FaVolumeMute className="text-[#D2C1B6]" /> : <FaVolumeUp className="text-[#60D5FA]" />}
        </MagneticButton>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 snap-start">
        <div className="hero-bg-layer-1 absolute inset-0 z-0 pointer-events-none">
          <ASCIIDonut />
        </div>
        <div className="hero-bg-layer-2 absolute inset-0 z-0 pointer-events-none">
          <CSSDonut />
        </div>
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <BackgroundJokes isTabVisible={isTabVisible} />
        </div>
        
        <div className="relative z-10 flex items-center justify-center" style={{ width: '100%' }}>
          <Hero3DCards isLoaded={!isLoading}>
            <div className="text-center z-10 max-w-4xl w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-8xl font-bold text-white">
                <TypewriterWithGlitch text="GAURAV GUDDETI" />
              </h1>
              <RotatingOneLiners />
            </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#60D5FA] to-[#456882] font-semibold mb-2">
              Engineer of Tomorrow's Intelligent Tools
            </h2>
            <p className="text-lg text-[#60D5FA]">
              Full-Stack Developer | AI/ML Enthusiast
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex justify-center items-center space-x-8 text-3xl mb-6"
          >
            <a
              href="https://github.com/Gauravguddeti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#60D5FA] transition-all duration-300 inline-block"
              style={{ cursor: 'pointer' }}
              onClick={(e) => console.log('GitHub clicked', e)}
              onMouseEnter={() => console.log('GitHub hover')}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="drop-shadow-lg" />
              </motion.div>
            </a>
            <a
              href="https://linkedin.com/in/gaurav-guddeti-a2359827b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#60D5FA] transition-all duration-300 inline-block"
              style={{ cursor: 'pointer' }}
              onClick={(e) => console.log('LinkedIn clicked', e)}
              onMouseEnter={() => console.log('LinkedIn hover')}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin className="drop-shadow-lg" />
              </motion.div>
            </a>
            <a
              href="mailto:guddetigaurav1@gmail.com"
              className="text-gray-300 hover:text-[#60D5FA] transition-all duration-300 inline-block"
              style={{ cursor: 'pointer' }}
              onClick={(e) => console.log('Email clicked', e)}
              onMouseEnter={() => console.log('Email hover')}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEnvelope className="drop-shadow-lg" />
              </motion.div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={(e) => {
                console.log('Button clicked!', e);
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onMouseEnter={() => console.log('Button hover')}
              type="button"
              className="px-8 py-4 bg-gradient-to-r from-[#234C6A] to-[#456882] rounded-full font-semibold hover:from-[#1B3C53] hover:to-[#234C6A] transition-all shadow-lg hover:shadow-xl text-white inline-block"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(96, 213, 250, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: 'pointer' }}
            >
              Explore My Journey
            </motion.button>
          </motion.div>
          </div>
        </Hero3DCards>
        
        </div>
      </section>

      {/* About This Human Section */}
      <section id="about" className="about-section py-32 px-6 bg-gradient-to-r from-slate-800/50 to-blue-900/30 snap-start">
        <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0, margin: "0px 0px -80% 0px" }}
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#60D5FA] to-[#456882]"
        >
          About This Human
        </motion.h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0, margin: "0px 0px -80% 0px" }}
            className="space-y-6"
          >
              <div className="prose prose-lg text-gray-300">
                <p className="text-lg leading-relaxed mb-6">
                  Hey there! I'm <span className="text-blue-400 font-semibold">Gaurav</span>, a passionate 3rd-year Computer Science student 
                  who believes in building technology that makes a difference. Currently working as an 
                  <span className="text-purple-400 font-semibold"> AI Developer Intern at ChatMaven</span>, 
                  where I'm diving deep into conversational AI and intelligent systems.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  My journey in tech started with curiosity and has evolved into a love for creating solutions 
                  that blend <span className="text-blue-400">cutting-edge AI</span> with 
                  <span className="text-purple-400"> intuitive user experiences</span>. 
                  From building e-commerce platforms to developing AI-powered crop disease analyzers, 
                  I enjoy tackling challenges across the full technology spectrum.
                </p>

                <p className="text-lg leading-relaxed">
                  When I'm not coding, you'll find me grinding Valorant, binge-watching Friends for the hundredth time,
                  exploring new frameworks, or diving deep into the latest tech innovations. 
                  I believe in continuous learning and the power of technology to solve real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="stat-item text-center p-4 bg-slate-800/50 rounded-xl border border-blue-400/30">
                  <FaGraduationCap className="icon-scale text-3xl text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold">Education</h3>
                  <p className="text-sm text-gray-400">Computer Science</p>
                </div>
                <div className="stat-item text-center p-4 bg-slate-800/50 rounded-xl border border-blue-400/30">
                  <FaRocket className="icon-scale text-3xl text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold">Experience</h3>
                  <p className="text-sm text-gray-400">AI Developer Intern</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0, margin: "0px 0px -80% 0px" }}
              className="space-y-6"
            >
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-400/30">
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="stat-item flex justify-between items-center">
                    <span>Lines of Code Written</span>
                    <span className="text-blue-400 font-bold">50,000+</span>
                  </div>
                  <div className="stat-item flex justify-between items-center">
                    <span>Projects Completed</span>
                    <span className="text-purple-400 font-bold">15+</span>
                  </div>
                  <div className="stat-item flex justify-between items-center">
                    <span>Technologies Mastered</span>
                    <span className="text-green-400 font-bold">20+</span>
                  </div>
                  <div className="stat-item flex justify-between items-center">
                    <span>Coffee Cups Consumed</span>
                    <span className="text-yellow-400 font-bold">∞</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-400/30">
                <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Fun Fact
                </h3>
                <p className="text-gray-300">
                  I still get excited when my code works on the first try... which happens roughly 12% of the time. 
                  The other 88% is what makes programming an adventure! 🎢💻
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <Section3DTransition intensity="bold" direction="left">
      <section id="experience" className="experience-section py-32 px-6 snap-start">
          <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Professional Journey
          </h2>
          
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-slate-800/80 to-blue-900/40 rounded-3xl p-12 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 hover-lift gpu-accelerated"
          >
            <div className="flex items-start space-x-8">
              <motion.div 
                className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <FaBrain className="text-3xl text-white" />
              </motion.div>
              
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-semibold mb-3 text-white">AI Developer Intern</h3>
                  <p className="text-xl text-blue-400 mb-4 font-semibold">ChatMaven • July 2025 - Present</p>
                  <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-6 border border-green-400/30">
                    Currently Active
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    Developing cutting-edge IVR calling systems using <span className="text-blue-400 font-semibold">RAG (Retrieval-Augmented Generation)</span> and 
                    <span className="text-purple-400 font-semibold"> LangGraph</span> technologies. 
                    Creating intelligent conversational AI systems that revolutionize customer interactions through advanced natural language processing and contextual understanding.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-blue-400/20">
                      <h4 className="font-semibold text-blue-400 mb-2">Key Responsibilities</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• IVR system architecture & development</li>
                        <li>• RAG implementation for intelligent responses</li>
                        <li>• LangGraph workflow optimization</li>
                        <li>• AI model integration & testing</li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-blue-400/20">
                      <h4 className="font-semibold text-purple-400 mb-2">Impact & Results</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Enhanced customer interaction quality</li>
                        <li>• Reduced response time by 40%</li>
                        <li>• Improved conversation flow accuracy</li>
                        <li>• Scalable AI architecture design</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {['Python', 'RAG', 'LangGraph', 'IVR Systems', 'AI/ML', 'NLP', 'Conversational AI'].map((tech) => (
                      <motion.span 
                        key={tech} 
                        className="tech-item px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30 hover:border-blue-400/60 transition-all cursor-default"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Section3DTransition>

      {/* Tech Arsenal */}
      <Section3DTransition intensity="bold" direction="up">
      <section className="tech-section py-32 px-6 bg-gradient-to-r from-[#1B3C53]/20 to-[#234C6A]/20 snap-start overflow-visible">
        <div className="max-w-6xl mx-auto text-center overflow-visible">
          <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#60D5FA] to-[#456882]">
            Tech Arsenal
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#D2C1B6] mb-16 max-w-2xl mx-auto"
          >
            My technological toolkit spanning frontend, backend, AI/ML, and mobile development
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="gpu-accelerated"
          >
            <ArcReactorSphere />
          </motion.div>
        </div>
      </section>
    </Section3DTransition>

      {/* Projects */}
      <Section3DTransition intensity="bold" direction="right">
      <section id="projects" className="py-32 px-6 snap-start">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Featured Projects
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            A showcase of my journey through full-stack development, AI/ML applications, and innovative solutions
          </motion.p>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <MagneticButton 
              href="https://github.com/Gauravguddeti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rounded-full font-semibold transition-all border border-blue-400/30 hover:border-blue-400/60 text-white"
            >
              <FaGithub className="text-xl" />
              <span>View All Projects on GitHub</span>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </Section3DTransition>

      {/* Contact */}
      <Section3DTransition intensity="bold" direction="up">
      <section id="contact" className="contact-section py-32 px-6 bg-gradient-to-r from-slate-800/50 to-blue-900/30 snap-start">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Let's Build Something Amazing
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Ready to turn your ideas into reality? Whether it's a complex AI system, a sleek web application, 
            or an innovative mobile solution, let's collaborate and create something extraordinary together.
          </motion.p>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="contact-card-left space-y-8"
            >
              <div className="space-y-6">
                <MagneticButton
                  href="mailto:guddetigaurav1@gmail.com"
                  className="flex items-center space-x-4 p-6 bg-slate-800/80 border border-blue-400/30 rounded-2xl hover:border-blue-400/60 transition-all hover-lift group w-full text-left"
                  strength={0.25}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">Email</h3>
                    <p className="text-gray-400">guddetigaurav1@gmail.com</p>
                  </div>
                </MagneticButton>

                <MagneticButton
                  href="https://linkedin.com/in/gaurav-guddeti-a2359827b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-6 bg-slate-800/80 border border-blue-400/30 rounded-2xl hover:border-blue-400/60 transition-all hover-lift group w-full text-left"
                  strength={0.25}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaLinkedin className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                    <p className="text-gray-400">Connect professionally</p>
                  </div>
                </MagneticButton>

                <MagneticButton
                  href="https://github.com/Gauravguddeti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-6 bg-slate-800/80 border border-blue-400/30 rounded-2xl hover:border-blue-400/60 transition-all hover-lift group w-full text-left"
                  strength={0.25}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaGithub className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">GitHub</h3>
                    <p className="text-gray-400">View my repositories</p>
                  </div>
                </MagneticButton>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-400/30">
                <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  What I Can Help With
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <FaLaptopCode />, text: "Full-Stack Development" },
                    { icon: <FaBrain />, text: "AI/ML Solutions" },
                    { icon: <FaRocket />, text: "AI Tools Development" },
                    { icon: <FaCloud />, text: "Cloud Integration" },
                    { icon: <FaDatabase />, text: "Database Design" },
                    { icon: <FaCode />, text: "Backend Optimization" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                      <div className="text-blue-400">{item.icon}</div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="contact-card-right"
            >
              <div className="bg-slate-800/80 rounded-2xl p-8 border border-blue-400/30">
                <h3 className="text-2xl font-semibold mb-6 text-white">Send a Message</h3>
                
                {/* Download Resume Button */}
                <a
                  href="/GAURAV_GUDDETI_CSE-AIML-RESUME.pdf"
                  download="Gaurav_Guddeti_Resume.pdf"
                  className="flex items-center justify-center space-x-3 w-full p-4 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                >
                  <FaDownload className="text-lg group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </a>
                
                <ContactForm />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="flex justify-center space-x-8 text-4xl">
              <MagneticLink 
                href="https://github.com/Gauravguddeti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaGithub />
              </MagneticLink>
              <MagneticLink 
                href="https://linkedin.com/in/gaurav-guddeti-a2359827b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin />
              </MagneticLink>
              <MagneticLink 
                href="mailto:guddetigaurav1@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaEnvelope />
              </MagneticLink>
            </div>
          </motion.div>
        </div>
      </section>
    </Section3DTransition>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-blue-400/30 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                GAURAV.DEV
              </div>
              <p className="text-gray-400 text-sm">
                Crafting intelligent solutions for tomorrow's challenges
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-400 mb-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#home" className="hover:text-blue-400 transition-colors block">Home</a>
                  <a href="#about" className="hover:text-blue-400 transition-colors block">About</a>
                  <a href="#projects" className="hover:text-blue-400 transition-colors block">Projects</a>
                  <a href="#contact" className="hover:text-blue-400 transition-colors block">Contact</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Technologies</h4>
                <div className="space-y-2">
                  <span className="block">React & TypeScript</span>
                  <span className="block">Python & AI/ML</span>
                  <span className="block">Full-Stack Development</span>
                  <span className="block">Mobile Applications</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Connect</h4>
                <div className="space-y-2">
                  <a href="mailto:guddetigaurav1@gmail.com" className="hover:text-blue-400 transition-colors block">Email</a>
                  <a href="https://linkedin.com/in/gaurav-guddeti-a2359827b" className="hover:text-blue-400 transition-colors block" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com/Gauravguddeti" className="hover:text-blue-400 transition-colors block" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-400/20 pt-8">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Gaurav Guddeti. Made with{' '}
                <span className="text-red-500 animate-pulse">♥</span>{' '}
                and a lot of{' '}
                <span className="text-yellow-500">☕</span>{' '}
                using React, TypeScript & Framer Motion
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Designed & Developed with passion for creating exceptional digital experiences
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
