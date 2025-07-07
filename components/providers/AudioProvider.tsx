'use client'

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react'

interface AudioContextType {
  isPlaying: boolean
  volume: number
  toggleAudio: () => void
  setVolume: (volume: number) => void
  canPlay: boolean
  isFading: boolean
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.05)
  const [canPlay, setCanPlay] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Set canPlay to true immediately
    setCanPlay(true)
    
    const handleFirstInteraction = () => {
      // Auto-play music after first interaction with proper volume
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume // Set proper volume before playing
          audioRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(console.error)
        }
      }, 500)
    }

    // Try to autoplay immediately (some browsers allow this)
    const tryAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.volume = volume // Set proper volume before playing
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // If autoplay fails, wait for user interaction
          document.addEventListener('click', handleFirstInteraction, { once: true })
          document.addEventListener('touchstart', handleFirstInteraction, { once: true })
          document.addEventListener('keydown', handleFirstInteraction, { once: true })
        })
      }
    }

    // Try autoplay after a short delay
    setTimeout(tryAutoplay, 1000)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  const toggleAudio = async () => {
    if (!audioRef.current || !canPlay) return

    try {
      if (isPlaying) {
        // Fade out
        setIsFading(true)
        const fadeSteps = 20
        const fadeInterval = 100
        const volumeStep = volume / fadeSteps
        
        for (let i = fadeSteps; i >= 0; i--) {
          await new Promise(resolve => setTimeout(resolve, fadeInterval))
          if (audioRef.current) {
            audioRef.current.volume = Math.max(0, volumeStep * i)
          }
        }
        
        audioRef.current.pause()
        setIsFading(false)
        
        // Reset volume for next play
        if (audioRef.current) {
          audioRef.current.volume = volume
        }
      } else {
        // Fade in
        setIsFading(true)
        if (audioRef.current) {
          audioRef.current.volume = 0
        }
        
        await audioRef.current.play()
        
        const fadeSteps = 20
        const fadeInterval = 100
        const volumeStep = volume / fadeSteps
        
        for (let i = 0; i <= fadeSteps; i++) {
          await new Promise(resolve => setTimeout(resolve, fadeInterval))
          if (audioRef.current) {
            audioRef.current.volume = Math.min(volume, volumeStep * i)
          }
        }
        
        setIsFading(false)
      }
    } catch (error) {
      console.log('Audio play failed:', error)
      setIsFading(false)
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, volume, toggleAudio, setVolume, canPlay, isFading }}>
      {children}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.log('Audio error:', e)}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume
          }
        }}
      />
    </AudioContext.Provider>
  )
}
