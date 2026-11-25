import { en } from './en'
import type { MessageKey } from './en'
import { hi } from './hi'
import { te } from './te'
import { useSettings } from '../store/settingsStore'
import type { Language } from '../store/settingsStore'

type Messages = Partial<Record<MessageKey, string>>

const MESSAGES: Record<Language, Messages> = { en, hi, te }

export const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिन्दी (Hindi)' },
  { id: 'te', label: 'తెలుగు (Telugu)' },
]

// Usage inside a component:  const t = useT();  t('nav.home')
// Any word that is not translated yet shows in English.
export function useT() {
  const language = useSettings((state) => state.language)
  const messages = MESSAGES[language] ?? en
  return (key: MessageKey): string => messages[key] ?? en[key]
}