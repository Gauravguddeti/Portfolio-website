import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AudioProvider } from '@/components/providers/AudioProvider'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LowPowerIndicator } from '@/components/ui/LowPowerIndicator'
import { PhysicsCursor } from '@/components/ui/PhysicsCursor'
import { VisualFallbackManager } from '@/components/utils/VisualFallbackManager'
import { PerformanceTracker } from '@/components/utils/PerformanceTracker'
import { ServiceWorkerRegistration } from '@/components/utils/ServiceWorkerRegistration'
import { 
  DynamicBackgroundMusic 
} from '@/components/utils/DynamicComponents'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gaurav Guddeti - AI/ML Developer',
  description: 'Portfolio of Gaurav Guddeti - B.Tech Computer Science student focused on AI/ML and full-stack development',
  keywords: ['AI', 'Machine Learning', 'Full Stack', 'Developer', 'Portfolio'],
  authors: [{ name: 'Gaurav Guddeti' }],
  creator: 'Gaurav Guddeti',
  openGraph: {
    title: 'Gaurav Guddeti - AI/ML Developer',
    description: 'Building tools with code, curiosity, and cold coffee.',
    url: 'https://gaurav-portfolio.vercel.app',
    siteName: 'Gaurav Guddeti Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaurav Guddeti - AI/ML Developer',
    description: 'Building tools with code, curiosity, and cold coffee.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-900 text-white overflow-x-hidden`}>
        <VisualFallbackManager />
        <PerformanceTracker />
        <ServiceWorkerRegistration />
        <LowPowerIndicator />
        <PhysicsCursor />
        <ThemeProvider>
          <AudioProvider>
            <DynamicBackgroundMusic />
            <ThemeToggle />
            {children}
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
