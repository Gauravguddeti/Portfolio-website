import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Loading component for dynamic imports
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
  </div>
)

// Dynamically import heavy components with loading states
export const DynamicSkillsSection = dynamic(
  () => import('@/components/sections/SkillsSection').then(mod => ({ default: mod.SkillsSection })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false // Disable SSR for performance-heavy components
  }
)

export const DynamicASCIIDonut = dynamic(
  () => import('@/components/ui/ASCIIDonut').then(mod => ({ default: mod.ASCIIDonut })),
  {
    loading: () => null, // No loading state for background elements
    ssr: false
  }
)

export const DynamicInteractiveCursorBackground = dynamic(
  () => import('@/components/ui/InteractiveCursorBackground').then(mod => ({ default: mod.InteractiveCursorBackground })),
  {
    loading: () => null,
    ssr: false
  }
)

export const DynamicOptimizedCursor = dynamic(
  () => import('@/components/ui/OptimizedCursor').then(mod => ({ default: mod.OptimizedCursor })),
  {
    loading: () => null,
    ssr: false
  }
)

export const DynamicBackgroundMusic = dynamic(
  () => import('@/components/ui/BackgroundMusic').then(mod => ({ default: mod.BackgroundMusic })),
  {
    loading: () => null,
    ssr: false
  }
)

// Lazy load 3D components only when needed (if they exist)
// export const Dynamic3DComponents = dynamic(
//   () => import('@/components/3d/Scene3D').then(mod => ({ default: mod.Scene3D })),
//   {
//     loading: () => <LoadingSpinner />,
//     ssr: false
//   }
// )

// Performance-aware component wrapper
export function withPerformanceCheck<T extends {}>(Component: ComponentType<T>) {
  return function PerformanceCheckedComponent(props: T) {
    // Only render on client-side and check for visual fallback
    if (typeof window === 'undefined') return null
    
    const isLowPerformance = document.body.classList.contains('visual-fallback')
    
    // Skip heavy components in low-performance mode
    if (isLowPerformance) {
      return null
    }
    
    return <Component {...props} />
  }
}
