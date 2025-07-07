'use client'

export const smoothScrollToTop = () => {
  const currentScroll = window.pageYOffset
  const targetScroll = 0
  const distance = currentScroll - targetScroll
  const duration = 1200 // Animation duration in ms
  const startTime = performance.now()

  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  }

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeInOutQuart(progress)
    
    const currentPosition = currentScroll - (distance * easedProgress)
    window.scrollTo(0, currentPosition)
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

export default smoothScrollToTop
