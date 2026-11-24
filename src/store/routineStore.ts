import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CustomRoutine {
  id: string
  name: string
  exerciseIds: string[]
}

interface RoutineState {
  custom: CustomRoutine[]
  addRoutine: (name: string, exerciseIds: string[]) => string
  removeRoutine: (id: string) => void
}

// Your own routines, saved on this device only.
export const useRoutines = create<RoutineState>()(
  persist(
    (set) => ({
      custom: [],
      addRoutine: (name, exerciseIds) => {
        const id = `custom-${Date.now()}`
        set((state) => ({ custom: [...state.custom, { id, name, exerciseIds }] }))
        return id
      },
      removeRoutine: (id) =>
        set((state) => ({ custom: state.custom.filter((routine) => routine.id !== id) })),
    }),
    { name: 'eyezen-routines' },
  ),
)