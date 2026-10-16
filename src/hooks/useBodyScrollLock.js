import { useEffect } from 'react'

let lockCount = 0
let savedScrollY = 0
let wheelListener = null
let keyListener = null

// Helper to determine if target element is inside a scrollable modal container
function findScrollableContainer(target) {
  let el = target
  while (el && el !== document.body && el !== document.documentElement) {
    if (el.scrollHeight > el.clientHeight) {
      const overflowY = window.getComputedStyle(el).overflowY
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return el
      }
    }
    el = el.parentElement
  }
  return null
}

// Intercept mouse wheel scrolling on desktop to prevent background page movement
function handleWheel(e) {
  const container = findScrollableContainer(e.target)
  if (!container) {
    // Mouse wheel over modal header, backdrop, or unscrollable element -> block background scroll
    e.preventDefault()
    return
  }

  // Inside a scrollable container: allow scrolling inside, but prevent chaining at boundaries
  const delta = e.deltaY
  const scrollTop = container.scrollTop
  const maxScroll = container.scrollHeight - container.clientHeight

  if (delta < 0 && scrollTop <= 0) {
    // Reached top and scrolling up -> prevent bubbling
    e.preventDefault()
  } else if (delta > 0 && Math.ceil(scrollTop) >= maxScroll) {
    // Reached bottom and scrolling down -> prevent bubbling
    e.preventDefault()
  }
}

// Intercept scroll-triggering keys on desktop when modals are open
function handleKeyDown(e) {
  const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space']
  if (!scrollKeys.includes(e.code)) return

  // Do not intercept if typing in an input or textarea
  const tag = e.target && e.target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return

  const container = findScrollableContainer(e.target)
  if (!container) {
    e.preventDefault()
  }
}

/**
 * Universal body scroll lock for both Desktop (Mouse/Wheel) and Mobile (Touch).
 * - On Desktop: Locks html/body overflow, compensates scrollbar layout shift,
 *   and intercepts wheel/keyboard events to prevent background movement.
 * - On Mobile: Uses position: fixed + top offset to physically prevent iOS/Android rubber-banding.
 */
export function lockBodyScroll() {
  if (typeof window === 'undefined') return

  if (lockCount === 0) {
    savedScrollY = window.scrollY || window.pageYOffset || 0
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    // 1. Compensate scrollbar width to prevent horizontal layout shift on desktop
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    // 2. Lock document overflow
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'

    // 3. For mobile touch devices, pin body with position: fixed to eliminate rubber-banding
    const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    if (isTouch) {
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
    }

    // 4. On desktop, attach active non-passive listeners to catch wheel and keyboard scroll chaining
    wheelListener = handleWheel
    keyListener = handleKeyDown
    window.addEventListener('wheel', wheelListener, { passive: false })
    window.addEventListener('keydown', keyListener, { passive: false })

    document.body.setAttribute('data-modal-open', 'true')
  }
  lockCount += 1
}

export function unlockBodyScroll() {
  if (typeof window === 'undefined') return

  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    if (wheelListener) {
      window.removeEventListener('wheel', wheelListener)
      wheelListener = null
    }
    if (keyListener) {
      window.removeEventListener('keydown', keyListener)
      keyListener = null
    }

    const wasPositionFixed = document.body.style.position === 'fixed'

    document.documentElement.style.overflow = ''
    document.documentElement.style.overscrollBehavior = ''
    document.body.style.overflow = ''
    document.body.style.overscrollBehavior = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    document.body.style.paddingRight = ''
    document.body.removeAttribute('data-modal-open')

    if (wasPositionFixed) {
      window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' })
    }
  }
}

export function useBodyScrollLock(isLocked = true) {
  useEffect(() => {
    if (!isLocked) return

    lockBodyScroll()
    return () => {
      unlockBodyScroll()
    }
  }, [isLocked])
}
