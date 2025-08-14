import { useState, useEffect, useRef } from 'react'

interface TypewriterProps {
  text?: string
  texts?: string[]
  className?: string
  speed?: number
  rotateDelay?: number
}

const TypewriterWithGlitch = ({ 
  text, 
  texts = [], 
  className = '', 
  speed = 70,
  rotateDelay = 4000 
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const glitchTimeoutRef = useRef<number | null>(null)
  const rotateTimeoutRef = useRef<number | null>(null)
  const originalTextRef = useRef('')

  // Use either single text or array of texts
  const textArray = texts.length > 0 ? texts : (text ? [text] : [])
  const currentText = textArray[currentTextIndex] || ''

  // Glitch characters for subtle effect
  const glitchChars = ['@', '#', '$', '%', '&', '*', '!', '?', '+', '-', '=']

  useEffect(() => {
    if (textArray.length === 0) return

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < currentText.length) {
        setDisplayText(currentText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
        originalTextRef.current = currentText
        scheduleNextGlitch()
        
        // Schedule text rotation if multiple texts
        if (textArray.length > 1) {
          rotateTimeoutRef.current = setTimeout(() => {
            setIsTypingComplete(false)
            setDisplayText('')
            setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
          }, rotateDelay) as unknown as number
        }
      }
    }, speed)

    return () => {
      clearInterval(typingInterval)
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current)
      }
      if (rotateTimeoutRef.current) {
        clearTimeout(rotateTimeoutRef.current)
      }
    }
  }, [currentText, speed, rotateDelay, textArray.length])

  const scheduleNextGlitch = () => {
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current)
    }
    
    // Schedule next glitch in 3-6 seconds
    const delay = 3000 + Math.random() * 3000
    glitchTimeoutRef.current = setTimeout(() => {
      triggerGlitch()
    }, delay)
  }

  const triggerGlitch = () => {
    if (!isTypingComplete) return

    const originalText = originalTextRef.current
    let glitchedText = originalText

    // Replace 1-2 random characters with glitch symbols
    const numGlitches = Math.floor(Math.random() * 2) + 1
    const positions: number[] = []

    for (let i = 0; i < numGlitches; i++) {
      let position: number
      do {
        position = Math.floor(Math.random() * originalText.length)
      } while (positions.includes(position) || originalText[position] === ' ')
      
      positions.push(position)
    }

    // Apply glitch effect
    positions.forEach(pos => {
      const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
      glitchedText = glitchedText.substring(0, pos) + glitchChar + glitchedText.substring(pos + 1)
    })

    setDisplayText(glitchedText)

    // Revert back to original after 100-150ms
    setTimeout(() => {
      setDisplayText(originalText)
      scheduleNextGlitch()
    }, 100 + Math.random() * 50)
  }

  return (
    <span className={`font-orbitron font-black tracking-wider ${className}`}>
      {displayText}
      {!isTypingComplete && (
        <span className="animate-pulse text-blue-400">|</span>
      )}
    </span>
  )
}

export default TypewriterWithGlitch
