import {
  BREAKS_GOAL,
  EXERCISE_GOAL_MINUTES,
  HABITS,
  WATER_GOAL,
  habitFraction,
} from '../data/habits'
import type { DayHabits } from '../store/habitStore'
import type { Session } from '../store/progressStore'
import { addDays, lastDays, todayKey } from './date'

export interface DayMinutes {
  key: string
  date: Date
  minutes: number
}

// Minutes of exercise for each of the last `count` days (oldest first)
export function dailyMinutes(sessions: Session[], count: number): DayMinutes[] {
  const seconds: Record<string, number> = {}
  for (const session of sessions) {
    seconds[session.date] = (seconds[session.date] ?? 0) + session.seconds
  }
  return lastDays(count).map((date) => {
    const key = todayKey(date)
    return { key, date, minutes: (seconds[key] ?? 0) / 60 }
  })
}

// Days in a row with at least one finished exercise.
// If today has none yet, we count back from yesterday.
export function currentStreak(sessions: Session[]): number {
  const days = new Set(sessions.map((session) => session.date))
  const now = new Date()
  let offset = days.has(todayKey(now)) ? 0 : 1
  let streak = 0
  while (offset < 400) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset)
    if (!days.has(todayKey(day))) break
    streak += 1
    offset += 1
  }
  return streak
}

// The longest run of days in a row, ever
export function longestStreak(sessions: Session[]): number {
  const keys = Array.from(new Set(sessions.map((session) => session.date))).sort()
  let best = 0
  let run = 0
  let previous: Date | null = null
  for (const key of keys) {
    const [year, month, day] = key.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    if (previous && Math.round((date.getTime() - previous.getTime()) / 86400000) === 1) {
      run += 1
    } else {
      run = 1
    }
    best = Math.max(best, run)
    previous = date
  }
  return best
}

// Half from calm minutes, half from habits. A gentle number from 0 to 100.
export function dailyScore(minutes: number, habits: DayHabits, breaks: number): number {
  const exercise = Math.min(1, minutes / EXERCISE_GOAL_MINUTES)
  const fractions = [
    ...HABITS.map((habit) => habitFraction(habit, habits[habit.id])),
    Math.min(1, breaks / BREAKS_GOAL),
  ]
  const habitAverage = fractions.reduce((sum, value) => sum + value, 0) / fractions.length
  return Math.round(50 * exercise + 50 * habitAverage)
}

export interface WeekSummary {
  minutes: number
  sessions: number
  activeDays: number
  waterDays: number
  best: { date: Date; minutes: number } | null
}

// A summary of the 7 days starting at `start` (a Monday)
export function weekSummary(
  sessions: Session[],
  entries: Record<string, DayHabits>,
  start: Date,
): WeekSummary {
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index))
  const keys = new Set(days.map((day) => todayKey(day)))

  const secondsByDay: Record<string, number> = {}
  let count = 0
  for (const session of sessions) {
    if (!keys.has(session.date)) continue
    count += 1
    secondsByDay[session.date] = (secondsByDay[session.date] ?? 0) + session.seconds
  }

  let totalSeconds = 0
  let activeDays = 0
  let waterDays = 0
  let best: WeekSummary['best'] = null
  for (const day of days) {
    const key = todayKey(day)
    const seconds = secondsByDay[key] ?? 0
    totalSeconds += seconds
    if (seconds > 0) activeDays += 1
    if ((entries[key]?.water ?? 0) >= WATER_GOAL) waterDays += 1
    if (seconds > 0 && (!best || seconds / 60 > best.minutes)) {
      best = { date: day, minutes: seconds / 60 }
    }
  }

  return { minutes: totalSeconds / 60, sessions: count, activeDays, waterDays, best }
}