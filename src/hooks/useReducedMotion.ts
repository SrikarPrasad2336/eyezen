import { useEffect, useState } from 'react'
import { useSettings } from '../store/settingsStore'

const QUERY = '(prefers-reduced-motion: reduce)'

// True if the app setting is on OR the phone/computer asks for less motion.
export function useReducedMotion(): boolean {
  const setting = useSettings((state) => state.reduceMotion)
  const [system, setSystem] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const onChange = () => setSystem(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return setting || system
}