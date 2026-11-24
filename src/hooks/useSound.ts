import { useCallback } from 'react'
import { useSettings } from '../store/settingsStore'

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext }

// One shared sound engine for the whole app
let sharedContext: AudioContext | null = null

function playNotes(frequencies: number[], gap: number, peak: number) {
  const context = sharedContext
  if (!context) return
  try {
    void context.resume()
    const now = context.currentTime
    frequencies.forEach((frequency, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const start = now + index * gap
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.06)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.2)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(start)
      oscillator.stop(start + 2.3)
    })
  } catch {
    // Sound is a bonus. If it fails, the app still works.
  }
}

// Soft sounds made with the browser's own sound engine (no sound files).
// They only play if the Sound setting is on.
export function useSound() {
  const enabled = useSettings((state) => state.sound)

  // Call this from a button tap. Browsers only allow sound after a tap.
  const prepare = useCallback(() => {
    if (!enabled) return
    try {
      const Ctor = window.AudioContext || (window as AudioWindow).webkitAudioContext
      if (!Ctor) return
      if (!sharedContext) sharedContext = new Ctor()
      void sharedContext.resume()
    } catch {
      // Ignore sound errors
    }
  }, [enabled])

  // Three gentle notes (end of an exercise)
  const chime = useCallback(() => {
    if (enabled) playNotes([523.25, 659.25, 783.99], 0.35, 0.12)
  }, [enabled])

  // Two soft, higher notes (a new badge)
  const sparkle = useCallback(() => {
    if (enabled) playNotes([783.99, 1046.5], 0.28, 0.08)
  }, [enabled])

  return { prepare, chime, sparkle }
}