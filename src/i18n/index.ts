import { en } from './en'
import type { MessageKey } from './en'
import { useSettings } from '../store/settingsStore'
import type { Language } from '../store/settingsStore'

type Messages = Record<MessageKey, string>

const MESSAGES: Record<Language, Messages> = { en }

export const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'en', label: 'English' },
]

// Usage inside a component:  const t = useT();  t('nav.home')
export function useT() {
  const language = useSettings((state) => state.language)
  const messages = MESSAGES[language] ?? en
  return (key: MessageKey): string => messages[key] ?? en[key]
}