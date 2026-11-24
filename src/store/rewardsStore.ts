import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_WEEKLY_GOAL } from '../data/rewards'

interface RewardsState {
  earned: Record<string, number> // badge id -> when it was earned
  weeklyGoal: number // calm minutes per week
  pending: string[] // badges waiting for their celebration (not saved)
  award: (ids: string[]) => void
  dismiss: () => void
  setWeeklyGoal: (minutes: number) => void
}

// Saved on this device only.
export const useRewards = create<RewardsState>()(
  persist(
    (set) => ({
      earned: {},
      weeklyGoal: DEFAULT_WEEKLY_GOAL,
      pending: [],

      award: (ids) =>
        set((state) => {
          const earned = { ...state.earned }
          const added: string[] = []
          const now = Date.now()
          for (const id of ids) {
            if (!earned[id]) {
              earned[id] = now
              added.push(id)
            }
          }
          if (added.length === 0) return {}
          return { earned, pending: [...state.pending, ...added] }
        }),

      dismiss: () => set((state) => ({ pending: state.pending.slice(1) })),
      setWeeklyGoal: (minutes) => set({ weeklyGoal: minutes }),
    }),
    {
      name: 'eyezen-rewards',
      partialize: (state) => ({ earned: state.earned, weeklyGoal: state.weeklyGoal }),
    },
  ),
)