import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { HabitId } from '../data/habits'

export type DayHabits = Record<HabitId, number>

// One shared "empty day" so screens do not rebuild it every time
export const EMPTY_DAY: DayHabits = { water: 0, screen: 0, sleep: 0, outdoor: 0 }

const KEEP_DAYS = 120

interface HabitState {
  entries: Record<string, DayHabits> // key is a date like "2026-11-22"
  change: (date: string, id: HabitId, delta: number, max: number) => void
}

// Saved on this device only.
export const useHabits = create<HabitState>()(
  persist(
    (set) => ({
      entries: {},
      change: (date, id, delta, max) =>
        set((state) => {
          const day = state.entries[date] ?? EMPTY_DAY
          const value = Math.min(max, Math.max(0, day[id] + delta))
          const next = { ...state.entries, [date]: { ...day, [id]: value } }
          // Keep the saved data small: drop the oldest days
          const keys = Object.keys(next).sort()
          for (const key of keys.slice(0, Math.max(0, keys.length - KEEP_DAYS))) {
            delete next[key]
          }
          return { entries: next }
        }),
    }),
    { name: 'eyezen-habits' },
  ),
)