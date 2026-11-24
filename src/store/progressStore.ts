import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { todayKey } from '../utils/date'

export interface Session {
  exerciseId: string
  date: string // "2026-11-21"
  seconds: number
  at: number // timestamp
}

interface ProgressState {
  sessions: Session[]
  addSession: (exerciseId: string, seconds: number) => void
}

// Saved on this device only. Later phases use this for score, streaks and charts.
export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (exerciseId, seconds) =>
        set((state) => ({
          sessions: [
            ...state.sessions,
            { exerciseId, date: todayKey(), seconds, at: Date.now() },
          ].slice(-1000),
        })),
    }),
    { name: 'eyezen-progress' },
  ),
)