import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingJoke {
  id: number
  text: string
  x: number
  y: number
  duration: number
}

interface BackgroundJokesProps {
  isTabVisible?: boolean
}

const BackgroundJokes = ({ isTabVisible = true }: BackgroundJokesProps) => {
  const [jokes, setJokes] = useState<FloatingJoke[]>([])
  const nextIdRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const jokeTexts = [
    "Could this BE any more interactive? 🤔",
    "I'm not great at advice. Can I interest you in a sarcastic comment?",
    "I make jokes when I'm uncomfortable... so prepare for a lot of jokes.",
    "This portfolio is like my coding skills - it gets better with time! ⏰",
    "I use humor to deflect serious questions about my code architecture 😅",
    "My GitHub commits are like my jokes - frequent and questionable quality",
    "I don't just write code, I write comedy... tragically, both need debugging",
    "Could I BE any more of a developer? *types frantically*",
    "I'm not saying I'm Batman, but have you ever seen me and Batman debug code together? 🦇",
    "My code is like fine wine... it gets better with age and debugging 🍷",
    "I speak three languages: English, Sarcasm, and JavaScript",
    "My relationship status: In a committed relationship with my IDE",
    "I don't always test my code, but when I do, I do it in production",
    "404: Sleep not found",
    "There are only 10 types of people: those who understand binary and those who don't",
    "I would tell you a UDP joke, but you might not get it",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "I'm not lazy, I'm just using energy-efficient coding methods",
    "My code works on my machine ¯\\_(ツ)_/¯",
    "Debugging is like being a detective in a crime movie where you're also the murderer",
    "Programming is 10% writing code and 90% figuring out why it doesn't work",
    "I turn coffee into code, bugs into features",
    "My favorite data structure? The snack stack 🥨",
    "I'm fluent in over 6 million forms of confusing error messages",
    "My code is self-documenting... unfortunately, it's written in hieroglyphics",
    "I don't need Google, I have Stack Overflow bookmarked",
    "Roses are red, violets are blue, unexpected '}' on line 42",
    "I'm not procrastinating, I'm doing extensive requirements analysis",
    "My code has more issues than a magazine subscription",
    "I solve problems you didn't know you had in ways you don't understand",
    "Programmer (noun): An organism that converts caffeine into software",
    "My git history is like my browser history - better left unexplored"
  ]

  useEffect(() => {
    // Don't spawn jokes if tab is not visible
    if (!isTabVisible) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const spawnRate = prefersReducedMotion ? 8000 : 2500 // Slower spawn rate if reduced motion

    const spawnJoke = () => {
      if (jokes.length >= 12) return // Max concurrent limit

      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const randomText = jokeTexts[Math.floor(Math.random() * jokeTexts.length)]
      
      const newJoke: FloatingJoke = {
        id: nextIdRef.current++,
        text: randomText,
        x: Math.random() * (rect.width - 300), // Account for text width
        y: Math.random() * (rect.height - 100), // Account for text height
        duration: 8 + Math.random() * 4 // 8-12 seconds for longer visibility
      }

      setJokes(prev => [...prev, newJoke])

      // Auto-remove after duration
      setTimeout(() => {
        setJokes(prev => prev.filter(joke => joke.id !== newJoke.id))
      }, newJoke.duration * 1000)
    }

    // First joke after 3 seconds
    const firstTimer = setTimeout(spawnJoke, 3000)
    
    // Then regular intervals
    const interval = setInterval(spawnJoke, spawnRate + Math.random() * 2000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [jokes.length, isTabVisible])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      <AnimatePresence>
        {jokes.map((joke) => (
          <motion.div
            key={joke.id}
            initial={{
              opacity: 0,
              scale: 0.8,
              x: joke.x,
              y: joke.y,
            }}
            animate={{
              opacity: [0, 0.25, 0.3, 0.25, 0],
              scale: [0.8, 1, 1, 1, 0.9],
              y: joke.y - 50, // Float upward
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            transition={{
              duration: joke.duration,
              ease: "easeInOut",
            }}
            className="absolute max-w-xs text-xs text-blue-200/60 font-medium select-none"
            style={{
              textShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
            }}
          >
            {joke.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default BackgroundJokes
