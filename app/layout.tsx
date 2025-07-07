import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AudioProvider } from '@/components/providers/AudioProvider'
import { OptimizedCursor } from '@/components/ui/OptimizedCursor'
import { BackgroundMusic } from '@/components/ui/BackgroundMusic'
import { InteractiveCursorBackground } from '@/components/ui/InteractiveCursorBackground'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

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
        <ThemeProvider>
          <AudioProvider>
            <InteractiveCursorBackground />
            <OptimizedCursor />
            <BackgroundMusic />
            <ThemeToggle />
            {children}
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
