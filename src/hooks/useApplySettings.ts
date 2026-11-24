import { useEffect } from 'react'
import { useSettings } from '../store/settingsStore'
import type { Theme } from '../store/settingsStore'

const THEME_COLORS: Record<Theme, string> = {
  light: '#fbf6ec',
  dark: '#0b1d28',
  'night-calm': '#1c1511',
}

// Copies the saved settings onto <html> so our CSS can react to them.
export function useApplySettings() {
  const theme = useSettings((state) => state.theme)
  const textSize = useSettings((state) => state.textSize)
  const highContrast = useSettings((state) => state.highContrast)
  const reduceMotion = useSettings((state) => state.reduceMotion)
  const language = useSettings((state) => state.language)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.dataset.textSize = textSize
    root.dataset.contrast = highContrast ? 'high' : 'normal'
    root.dataset.motion = reduceMotion ? 'reduced' : 'normal'
    root.lang = language
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])
  }, [theme, textSize, highContrast, reduceMotion, language])
}