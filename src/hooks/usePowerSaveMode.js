import { useEffect, useState } from 'react'
import { getDeviceTier, subscribeDeviceTier } from '../utils/deviceTier'

function checkIsPowerSave() {
  if (typeof window === 'undefined') return false
  const tier = getDeviceTier()
  if (tier === 'low') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  return false
}

export default function usePowerSaveMode() {
  const [isPowerSaveMode, setIsPowerSaveMode] = useState(checkIsPowerSave)

  useEffect(() => {
    let battery = null
    let disposed = false

    const updateMode = () => {
      const tier = getDeviceTier()
      if (tier === 'low') {
        setIsPowerSaveMode(true)
        return
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsPowerSaveMode(true)
        return
      }
      // If mid or high tier, only enter power-save if battery is critically low (<15%) and discharging
      if (battery && !battery.charging && battery.level <= 0.15) {
        setIsPowerSaveMode(true)
        return
      }
      setIsPowerSaveMode(false)
    }

    const unsubTier = subscribeDeviceTier(() => updateMode())

    const getBattery = navigator.getBattery
    if (typeof getBattery === 'function') {
      getBattery.call(navigator).then((nextBattery) => {
        if (disposed) return
        battery = nextBattery
        battery.addEventListener('chargingchange', updateMode)
        battery.addEventListener('levelchange', updateMode)
        updateMode()
      }).catch(() => {})
    }

    updateMode()

    return () => {
      disposed = true
      unsubTier()
      if (battery) {
        battery.removeEventListener('chargingchange', updateMode)
        battery.removeEventListener('levelchange', updateMode)
      }
    }
  }, [])

  return isPowerSaveMode
}
