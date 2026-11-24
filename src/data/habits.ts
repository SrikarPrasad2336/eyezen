import type { MessageKey } from '../i18n/en'

export type HabitId = 'water' | 'screen' | 'sleep' | 'outdoor'

export interface HabitDef {
  id: HabitId
  nameKey: MessageKey
  unitKey: MessageKey
  kind: 'goal' | 'limit' // goal: reach it. limit: stay under it.
  goal: number
  step: number // how much one tap adds or removes
  max: number
}

export const WATER_GOAL = 8
export const BREAKS_GOAL = 3
export const EXERCISE_GOAL_MINUTES = 5

export const HABITS: HabitDef[] = [
  {
    id: 'water',
    nameKey: 'habit.water',
    unitKey: 'unit.glasses',
    kind: 'goal',
    goal: WATER_GOAL,
    step: 1,
    max: 20,
  },
  {
    id: 'screen',
    nameKey: 'habit.screen',
    unitKey: 'unit.hours',
    kind: 'limit',
    goal: 8,
    step: 1,
    max: 24,
  },
  {
    id: 'sleep',
    nameKey: 'habit.sleep',
    unitKey: 'unit.hours',
    kind: 'goal',
    goal: 7,
    step: 0.5,
    max: 14,
  },
  {
    id: 'outdoor',
    nameKey: 'habit.outdoor',
    unitKey: 'unit.minutes',
    kind: 'goal',
    goal: 30,
    step: 15,
    max: 480,
  },
]

// How "complete" is a habit, from 0 to 1?
export function habitFraction(def: HabitDef, value: number): number {
  if (value <= 0) return 0
  if (def.kind === 'goal') return Math.min(1, value / def.goal)
  // A limit: logged and within the limit is great. Over the limit slowly lowers it.
  if (value <= def.goal) return 1
  return Math.max(0, 1 - (value - def.goal) / def.goal)
}