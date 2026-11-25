import type { MessageKey } from './en'
import { teCore } from './teCore'

// Later parts add more files here (exercises, games, nutrition...)
export const te: Partial<Record<MessageKey, string>> = {
  ...teCore,
}