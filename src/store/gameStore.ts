import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Level } from '../data/games'

// After this many seconds of play, we gently suggest a rest
export const BREAK_AFTER_SECONDS = 5 * 60
// If you stop playing for this long, the play-time count starts over
const FORGET_AFTER_MS = 10 * 60 * 1000

export function bestKey(gameId: string, level: Level): string {
  return `${gameId}:${level}`
}

interface GameState {
  bests: Record<string, number> // personal best for each game and level
  plays: number
  playSeconds: number // time played since your last rest (not saved)
  lastPlayAt: number // (not saved)
  recordResult: (gameId: string, level: Level, score: number) => boolean
  addPlaySecond: () => void
  resetPlayTime: () => void
}

// Saved on this device only.
export const useGames = create<GameState>()(
  persist(
    (set, get) => ({
      bests: {},
      plays: 0,
      playSeconds: 0,
      lastPlayAt: 0,

      // Returns true if this is a new personal best
      recordResult: (gameId, level, score) => {
        const key = bestKey(gameId, level)
        const previous = get().bests[key] ?? 0
        const isBest = score > previous
        set((state) => ({
          plays: state.plays + 1,
          bests: isBest ? { ...state.bests, [key]: score } : state.bests,
        }))
        return isBest
      },

      addPlaySecond: () =>
        set((state) => {
          const now = Date.now()
          const base = now - state.lastPlayAt > FORGET_AFTER_MS ? 0 : state.playSeconds
          return { playSeconds: base + 1, lastPlayAt: now }
        }),

      resetPlayTime: () => set({ playSeconds: 0 }),
    }),
    {
      name: 'eyezen-games',
      partialize: (state) => ({ bests: state.bests, plays: state.plays }),
    },
  ),
)