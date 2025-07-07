'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy components
const FloatingBrainCluster = dynamic(() => import('@/components/ui/FloatingBrainCluster').then(mod => ({ default: mod.FloatingBrainCluster })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-2xl border border-primary-400/20 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading Neural Network...</div>
    </div>
  )
})

const AboutMeVisual = dynamic(() => import('@/components/ui/AboutMeVisual').then(mod => ({ default: mod.AboutMeVisual })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-2xl border border-primary-400/20 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading Visual Interface...</div>
    </div>
  )
})

const TypewriterGlitch = dynamic(() => import('@/components/ui/TypewriterGlitch').then(mod => ({ default: mod.TypewriterGlitch })), {
  ssr: false,
  loading: () => (
    <div className="h-12 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent animate-pulse">
      Loading...
    </div>
  )
})

export {
  FloatingBrainCluster,
  AboutMeVisual,
  TypewriterGlitch
}
