import { useEffect, useState, useRef } from 'react'

/**
 * Custom hook for triggering smooth scroll-reveal animations
 * when an element enters the viewport.
 * 
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0 to 1)
 * @param {string} options.rootMargin - Margin around the root viewport
 * @param {boolean} options.triggerOnce - Whether to only animate once
 */
export function useScrollReveal({
  threshold = 0.05,
  rootMargin = '80px 0px 80px 0px',
  triggerOnce = true,
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Immediately check if already visible in viewport
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
      if (triggerOnce) return
    }

    // Fallback if IntersectionObserver is not supported
    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => setIsVisible(true), 0)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(el)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    // Safety fallback: ensure section is never left invisible or black
    const safetyTimer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => {
      observer.disconnect()
      clearTimeout(safetyTimer)
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isVisible]
}
