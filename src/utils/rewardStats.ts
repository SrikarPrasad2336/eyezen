import { WATER_GOAL } from '../data/habits'
import type { RewardStats } from '../data/rewards'
import type { DayHabits } from '../store/habitStore'
import type { Session } from '../store/progressStore'
import { startOfWeek } from './date'
import { currentStreak, longestStreak, weekSummary } from './stats'

export function buildStats(
  sessions: Session[],
  entries: Record<string, DayHabits>,
  weeklyGoal: number,
): RewardStats {
  const byExercise: Record<string, number> = {}
  let seconds = 0
  for (const session of sessions) {
    byExercise[session.exerciseId] = (byExercise[session.exerciseId] ?? 0) + 1
    seconds += session.seconds
  }

  const waterDays = Object.values(entries).filter((day) => day.water >= WATER_GOAL).length
  const week = weekSummary(sessions, entries, startOfWeek())

  return {
    totalSessions: sessions.length,
    totalMinutes: seconds / 60,
    byExercise,
    distinctExercises: Object.keys(byExercise).length,
    currentStreak: currentStreak(sessions),
    longestStreak: longestStreak(sessions),
    waterDays,
    weekMinutes: week.minutes,
    weeklyGoal,
  }
}