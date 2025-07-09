'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { Footer } from '@/components/sections/Footer'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { SectionBackground } from '@/components/ui/SectionBackground'
import { ScrollAnimationWrapper } from '@/components/ui/ScrollAnimationWrapper'

// Lazy load heavy sections with better loading states
const AboutSection = dynamic(() => import('@/components/sections/AboutSection2').then(mod => ({ default: mod.AboutSection })), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[50vh] bg-gradient-to-b from-dark-800 to-dark-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
    </div>
  )
})

const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection').then(mod => ({ default: mod.ProjectsSection })), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[50vh] bg-gradient-to-b from-dark-900 to-dark-800 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
    </div>
  )
})

const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection2').then(mod => ({ default: mod.SkillsSection })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-b from-dark-800 to-dark-900 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading Skills...</div>
    </div>
  )
})

const ResumeSection = dynamic(() => import('@/components/sections/ResumeSection').then(mod => ({ default: mod.ResumeSection })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gradient-to-b from-dark-800 to-dark-900 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading Resume...</div>
    </div>
  )
})

const ContactSection = dynamic(() => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-b from-dark-900 to-dark-800 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading Contact...</div>
    </div>
  )
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <SectionBackground variant="gradient" className="min-h-screen">
        <HeroSection />
      </SectionBackground>
      
      <SectionDivider type="wave" />
      
      <ScrollAnimationWrapper animation="fade" delay={0.1}>
        <SectionBackground variant="dots" className="min-h-screen">
          <Suspense fallback={<div className="w-full h-screen bg-dark-800 animate-pulse" />}>
            <AboutSection />
          </Suspense>
        </SectionBackground>
      </ScrollAnimationWrapper>
      
      <SectionDivider type="diagonal" flip />
      
      <ScrollAnimationWrapper animation="slideUp" delay={0.2}>
        <SectionBackground variant="grid" className="min-h-screen">
          <Suspense fallback={<div className="w-full h-screen bg-dark-900 animate-pulse" />}>
            <ProjectsSection />
          </Suspense>
        </SectionBackground>
      </ScrollAnimationWrapper>
      
      <SectionDivider type="curve" />
      
      <ScrollAnimationWrapper animation="fade" delay={0.1}>
        <SectionBackground variant="waves" className="min-h-screen">
          <Suspense fallback={<div className="w-full h-screen bg-dark-800 animate-pulse" />}>
            <SkillsSection />
          </Suspense>
        </SectionBackground>
      </ScrollAnimationWrapper>
      
      <SectionDivider type="zigzag" flip />
      
      <ScrollAnimationWrapper animation="slideUp" delay={0.1}>
        <SectionBackground variant="gradient" className="min-h-64">
          <Suspense fallback={<div className="w-full h-64 bg-dark-900 animate-pulse" />}>
            <ResumeSection />
          </Suspense>
        </SectionBackground>
      </ScrollAnimationWrapper>
      
      <SectionDivider type="particles" />
      
      <ScrollAnimationWrapper animation="fade" delay={0.2}>
        <SectionBackground variant="dots" className="min-h-screen">
          <Suspense fallback={<div className="w-full h-screen bg-dark-800 animate-pulse" />}>
            <ContactSection />
          </Suspense>
        </SectionBackground>
      </ScrollAnimationWrapper>
      
      <Footer />
    </main>
  )
}
