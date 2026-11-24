import { getExercise, getExerciseWithRounds, getTotalSeconds } from './exercises'
import type { Exercise } from './exercises'
import type { CustomRoutine } from '../store/routineStore'

export interface RoutineItem {
  exerciseId: string
  rounds?: number // how many repeats (leave out for the normal amount)
}

export interface Routine {
  id: string
  name: string
  tagline: string
  items: RoutineItem[]
}

export const ROUTINES: Routine[] = [
  {
    id: 'quick-reset',
    name: 'Quick 2-min Reset',
    tagline: 'A fast refresh between tasks.',
    items: [
      { exerciseId: 'blink-training', rounds: 7 },
      { exerciseId: 'near-far-focus', rounds: 3 },
      { exerciseId: 'palming', rounds: 2 },
    ],
  },
  {
    id: 'work-break',
    name: 'Work Break 5-min',
    tagline: 'Step away, loosen up, refocus.',
    items: [
      { exerciseId: 'twenty-20-20' },
      { exerciseId: 'blink-training', rounds: 4 },
      { exerciseId: 'figure-8', rounds: 2 },
      { exerciseId: 'neck-shoulder', rounds: 4 },
      { exerciseId: 'near-far-focus', rounds: 4 },
      { exerciseId: 'palming', rounds: 4 },
    ],
  },
  {
    id: 'bedtime',
    name: 'Bedtime 10-min',
    tagline: 'Slow down your body and eyes before sleep.',
    items: [
      { exerciseId: 'neck-shoulder', rounds: 3 },
      { exerciseId: 'circles', rounds: 3 },
      { exerciseId: 'eye-massage' },
      { exerciseId: 'warm-compress', rounds: 6 },
      { exerciseId: 'palming', rounds: 7 },
      { exerciseId: 'box-breathing', rounds: 6 },
    ],
  },
  {
    id: 'deep-relax',
    name: 'Deep Relax 15-min',
    tagline: 'A full, unhurried reset for body and eyes.',
    items: [
      { exerciseId: 'twenty-20-20' },
      { exerciseId: 'neck-shoulder', rounds: 4 },
      { exerciseId: 'blink-training', rounds: 7 },
      { exerciseId: 'near-far-focus', rounds: 6 },
      { exerciseId: 'figure-8', rounds: 3 },
      { exerciseId: 'circles', rounds: 3 },
      { exerciseId: 'tracking', rounds: 2 },
      { exerciseId: 'eye-massage' },
      { exerciseId: 'warm-compress', rounds: 6 },
      { exerciseId: 'palming', rounds: 8 },
      { exerciseId: 'box-breathing', rounds: 7 },
    ],
  },
]

// Turn the list of items into real exercises (skipping any unknown ones)
export function resolveItems(items: RoutineItem[]): Exercise[] {
  const result: Exercise[] = []
  for (const item of items) {
    const exercise = item.rounds
      ? getExerciseWithRounds(item.exerciseId, item.rounds)
      : getExercise(item.exerciseId)
    if (exercise) result.push(exercise)
  }
  return result
}

export function getRoutineSeconds(items: RoutineItem[]): number {
  return resolveItems(items).reduce((sum, exercise) => sum + getTotalSeconds(exercise), 0)
}

export function customToRoutine(custom: CustomRoutine): Routine {
  return {
    id: custom.id,
    name: custom.name,
    tagline: 'Your own routine',
    items: custom.exerciseIds.map((exerciseId) => ({ exerciseId })),
  }
}

export function findRoutine(id: string | undefined, custom: CustomRoutine[]): Routine | undefined {
  if (!id) return undefined
  const builtIn = ROUTINES.find((routine) => routine.id === id)
  if (builtIn) return builtIn
  const saved = custom.find((routine) => routine.id === id)
  return saved ? customToRoutine(saved) : undefined
}