import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const REMINDER_MINUTES = 20
const MINUTE = 60 * 1000

interface ReminderState {
  enabled: boolean
  nextAt: number // when the next reminder is due (a timestamp)
  due: boolean // is the reminder showing right now?
  enable: () => void
  disable: () => void
  fire: () => void
  snooze: (minutes: number) => void
  restart: () => void
}

export const useReminder = create<ReminderState>()(
  persist(
    (set) => ({
      enabled: false,
      nextAt: 0,
      due: false,
      enable: () =>
        set({ enabled: true, due: false, nextAt: Date.now() + REMINDER_MINUTES * MINUTE }),
      disable: () => set({ enabled: false, due: false }),
      fire: () => set({ due: true }),
      snooze: (minutes) => set({ due: false, nextAt: Date.now() + minutes * MINUTE }),
      restart: () => set({ due: false, nextAt: Date.now() + REMINDER_MINUTES * MINUTE }),
    }),
    {
      name: 'eyezen-reminder',
      // Save only these two. "due" always starts fresh.
      partialize: (state) => ({ enabled: state.enabled, nextAt: state.nextAt }),
    },
  ),
)