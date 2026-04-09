import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Check for reduced motion preference
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Fade in animation
export const fadeIn = (
  element: string | Element,
  options: {
    delay?: number
    duration?: number
    y?: number
    trigger?: string | Element
    start?: string
    end?: string
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 })
    return
  }

  const {
    delay = 0,
    duration = 1,
    y = 50,
    trigger = element,
    start = 'top 80%',
    end = 'top 20%',
  } = options

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: y,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// Stagger animation for multiple elements
export const staggerFadeIn = (
  elements: string,
  options: {
    stagger?: number
    delay?: number
    duration?: number
    y?: number
    trigger?: string | Element
    start?: string
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 })
    return
  }

  const {
    stagger = 0.1,
    delay = 0,
    duration = 0.8,
    y = 30,
    trigger,
    start = 'top 80%',
  } = options

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: y,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      stagger: stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || elements,
        start: start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// Parallax effect
export const parallax = (
  element: string | Element,
  options: {
    y?: number
    trigger?: string | Element
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) => {
  if (prefersReducedMotion()) return

  const {
    y = 100,
    trigger = element,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
  } = options

  gsap.fromTo(
    element,
    {
      y: -y,
    },
    {
      y: y,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        scrub: scrub,
      },
    }
  )
}

// Scale animation on scroll
export const scaleIn = (
  element: string | Element,
  options: {
    delay?: number
    duration?: number
    scale?: number
    trigger?: string | Element
    start?: string
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { scale: 1, opacity: 1 })
    return
  }

  const {
    delay = 0,
    duration = 1,
    scale = 0.8,
    trigger = element,
    start = 'top 80%',
  } = options

  gsap.fromTo(
    element,
    {
      scale: scale,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// Slide in from side
export const slideIn = (
  element: string | Element,
  options: {
    delay?: number
    duration?: number
    x?: number
    trigger?: string | Element
    start?: string
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { x: 0, opacity: 1 })
    return
  }

  const {
    delay = 0,
    duration = 1,
    x = 100,
    trigger = element,
    start = 'top 80%',
  } = options

  gsap.fromTo(
    element,
    {
      x: x,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// Rotate in animation
export const rotateIn = (
  element: string | Element,
  options: {
    delay?: number
    duration?: number
    rotation?: number
    trigger?: string | Element
    start?: string
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { rotation: 0, opacity: 1, scale: 1 })
    return
  }

  const {
    delay = 0,
    duration = 1,
    rotation = 15,
    trigger = element,
    start = 'top 80%',
  } = options

  gsap.fromTo(
    element,
    {
      rotation: rotation,
      scale: 0.5,
      opacity: 0,
    },
    {
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// Cleanup function
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

export { gsap, ScrollTrigger }
