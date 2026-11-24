import { useCallback } from 'react'
import { useSettings } from '../store/settingsStore'

// Gentle phone vibration, only if the Vibration setting is on.
export function useHaptics() {
  const enabled = useSettings((state) => state.vibration)

  return useCallback(
    (pattern: number | number[] = 20) => {
      if (enabled && 'vibrate' in navigator) navigator.vibrate(pattern)
    },
    [enabled],
  )
}