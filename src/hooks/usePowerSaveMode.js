import { useEffect, useState } from 'react'

function getDevicePowerHint() {
  if (typeof window === 'undefined') return false

  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 640px)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4)
  )
}

export default function usePowerSaveMode() {
  const [isPowerSaveMode, setIsPowerSaveMode] = useState(getDevicePowerHint)

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(max-width: 640px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]
    let battery = null
    let disposed = false

    const updateMode = () => {
      const hasLowDeviceCapacity = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4
      const isOnBattery = battery ? !battery.charging : false
      setIsPowerSaveMode(hasLowDeviceCapacity || isOnBattery || mediaQueries.some((query) => query.matches))
    }

    mediaQueries.forEach((query) => query.addEventListener('change', updateMode))
    window.addEventListener('resize', updateMode, { passive: true })

    const getBattery = navigator.getBattery
    if (typeof getBattery === 'function') {
      getBattery.call(navigator).then((nextBattery) => {
        if (disposed) return
        battery = nextBattery
        battery.addEventListener('chargingchange', updateMode)
        updateMode()
      }).catch(() => {})
    }

    updateMode()

    return () => {
      disposed = true
      mediaQueries.forEach((query) => query.removeEventListener('change', updateMode))
      window.removeEventListener('resize', updateMode)
      if (battery) battery.removeEventListener('chargingchange', updateMode)
    }
  }, [])

  return isPowerSaveMode
}
