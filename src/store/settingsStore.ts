import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'night-calm'
export type TextSize = 'small' | 'medium' | 'large' | 'xlarge'
// Later we will write: 'en' | 'hi' | 'te'
export type Language = 'en'

export interface SettingsValues {
  theme: Theme
  textSize: TextSize
  highContrast: boolean
  reduceMotion: boolean
  sound: boolean
  vibration: boolean
  language: Language
  consentAccepted: boolean
}

interface SettingsState extends SettingsValues {
  update: (patch: Partial<SettingsValues>) => void
  acceptConsent: () => void
  showConsentAgain: () => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      textSize: 'medium',
      highContrast: false,
      reduceMotion: false,
      sound: false,
      vibration: true,
      language: 'en',
      consentAccepted: false,

      update: (patch) => set(patch),
      acceptConsent: () => set({ consentAccepted: true }),
      showConsentAgain: () => set({ consentAccepted: false }),
    }),
    { name: 'eyezen-settings' },
  ),
)