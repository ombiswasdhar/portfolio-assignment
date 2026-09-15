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
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback if IntersectionObserver is not supported
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
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

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isVisible]
}
