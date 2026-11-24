import type { Level } from '../../data/games'
import type { MessageKey } from '../../i18n/en'

// What every game receives from the game shell
export interface GameProps {
  level: Level
  paused: boolean
  reduced: boolean // "reduce motion" is on
  seed: number // a different number each round
  onFinish: (score: number) => void
}

export const LEVEL_KEYS: Record<Level, MessageKey> = {
  easy: 'game.level.easy',
  medium: 'game.level.medium',
  hard: 'game.level.hard',
}