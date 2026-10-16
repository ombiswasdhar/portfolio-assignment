import { useEffect } from 'react'

let lockCount = 0
let savedScrollY = 0

/**
 * Foolproof body scroll lock for mobile (iOS Safari & Android Chrome) and desktop.
 * Uses the position: fixed + top offset technique which guarantees the underlying
 * page cannot be scrolled or rubber-banded while modals are open.
 */
export function lockBodyScroll() {
  if (typeof window === 'undefined') return

  if (lockCount === 0) {
    savedScrollY = window.scrollY || window.pageYOffset || 0
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.setAttribute('data-modal-open', 'true')
  }
  lockCount += 1
}

export function unlockBodyScroll() {
  if (typeof window === 'undefined') return

  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.documentElement.style.overflow = ''
    document.documentElement.style.overscrollBehavior = ''
    document.body.style.overflow = ''
    document.body.style.overscrollBehavior = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    document.body.removeAttribute('data-modal-open')
    window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' })
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
