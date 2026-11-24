import { CONDITIONS_A } from './conditionsA'
import { CONDITIONS_B } from './conditionsB'
import type { Condition } from './conditionTypes'

export type { Condition, ConditionGroup } from './conditionTypes'

export const CONDITIONS: Condition[] = [...CONDITIONS_A, ...CONDITIONS_B]

export function getCondition(id: string): Condition | undefined {
  return CONDITIONS.find((condition) => condition.id === id)
}

// Shown on every page. Each condition can add its own on top.
export const COMMON_URGENT: string[] = [
  'A sudden loss of vision, or a sudden change in your vision',
  'Eye pain, especially with a red eye',
  'Flashes of light, a sudden shower of new floaters, or a shadow or curtain across your vision',
  'An eye injury, or something splashed in your eye (especially a chemical)',
  'Double vision that starts suddenly',
]