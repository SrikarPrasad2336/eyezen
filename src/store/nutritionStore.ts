import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface GroceryItem {
  id: string
  text: string
  done: boolean
}

const KEEP_DAYS = 30
const MAX_ITEMS = 100
const MAX_LENGTH = 60

function newId(): string {
  return `g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

interface NutritionState {
  plate: Record<string, string[]> // date -> ticked Eye Plate groups
  grocery: GroceryItem[]
  togglePlate: (date: string, id: string) => void
  addGrocery: (texts: string[]) => number // returns how many were really added
  toggleGrocery: (id: string) => void
  removeGrocery: (id: string) => void
  clearDone: () => void
}

// Saved on this device only.
export const useNutrition = create<NutritionState>()(
  persist(
    (set, get) => ({
      plate: {},
      grocery: [],

      togglePlate: (date, id) =>
        set((state) => {
          const day = state.plate[date] ?? []
          const nextDay = day.includes(id) ? day.filter((item) => item !== id) : [...day, id]
          const next = { ...state.plate, [date]: nextDay }
          // Keep the saved data small: drop the oldest days
          const keys = Object.keys(next).sort()
          for (const key of keys.slice(0, Math.max(0, keys.length - KEEP_DAYS))) {
            delete next[key]
          }
          return { plate: next }
        }),

      addGrocery: (texts) => {
        const current = get().grocery
        const known = new Set(current.map((item) => item.text.toLowerCase()))
        const added: GroceryItem[] = []
        for (const raw of texts) {
          const text = raw.trim().slice(0, MAX_LENGTH)
          if (!text || known.has(text.toLowerCase())) continue
          if (current.length + added.length >= MAX_ITEMS) break
          known.add(text.toLowerCase())
          added.push({ id: newId(), text, done: false })
        }
        if (added.length > 0) set({ grocery: [...current, ...added] })
        return added.length
      },

      toggleGrocery: (id) =>
        set((state) => ({
          grocery: state.grocery.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item,
          ),
        })),

      removeGrocery: (id) =>
        set((state) => ({ grocery: state.grocery.filter((item) => item.id !== id) })),

      clearDone: () => set((state) => ({ grocery: state.grocery.filter((item) => !item.done) })),
    }),
    { name: 'eyezen-nutrition' },
  ),
)