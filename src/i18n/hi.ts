import type { MessageKey } from './en'
import { hiCore } from './hiCore'

// Later parts add more files here (exercises, games, nutrition...)
export const hi: Partial<Record<MessageKey, string>> = {
  ...hiCore,
}