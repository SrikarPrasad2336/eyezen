import type { Session } from '../store/progressStore'

// Everything the badges look at
export interface RewardStats {
  totalSessions: number
  totalMinutes: number
  byExercise: Record<string, number>
  distinctExercises: number
  currentStreak: number
  longestStreak: number
  waterDays: number
  weekMinutes: number
  weeklyGoal: number
}

export interface BadgeDef {
  id: string
  name: string
  description: string
  target: number
  value: (stats: RewardStats) => number
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first-calm',
    name: 'First Calm',
    description: 'Finish your very first exercise.',
    target: 1,
    value: (s) => s.totalSessions,
  },
  {
    id: 'blink-master',
    name: 'Blink Master',
    description: 'Finish Blink Training 10 times.',
    target: 10,
    value: (s) => s.byExercise['blink-training'] ?? 0,
  },
  {
    id: 'steady-start',
    name: 'Steady Start',
    description: 'Look after your eyes 3 days in a row.',
    target: 3,
    value: (s) => s.longestStreak,
  },
  {
    id: 'seven-day-glow',
    name: '7-Day Glow',
    description: 'Look after your eyes 7 days in a row.',
    target: 7,
    value: (s) => s.longestStreak,
  },
  {
    id: 'month-of-calm',
    name: 'Month of Calm',
    description: 'Look after your eyes 30 days in a row.',
    target: 30,
    value: (s) => s.longestStreak,
  },
  {
    id: 'palm-peace',
    name: 'Palm Peace',
    description: 'Finish Palming 5 times.',
    target: 5,
    value: (s) => s.byExercise['palming'] ?? 0,
  },
  {
    id: 'calm-breather',
    name: 'Calm Breather',
    description: 'Finish Box Breathing 5 times.',
    target: 5,
    value: (s) => s.byExercise['box-breathing'] ?? 0,
  },
  {
    id: 'break-champion',
    name: 'Break Champion',
    description: 'Finish 20 of the 20-20-20 breaks.',
    target: 20,
    value: (s) => s.byExercise['twenty-20-20'] ?? 0,
  },
  {
    id: 'hydration-hero',
    name: 'Hydration Hero',
    description: 'Reach your water goal on 3 different days.',
    target: 3,
    value: (s) => s.waterDays,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Try 8 different exercises.',
    target: 8,
    value: (s) => s.distinctExercises,
  },
  {
    id: 'hour-of-calm',
    name: 'Hour of Calm',
    description: 'Spend 60 minutes in total on calm exercises.',
    target: 60,
    value: (s) => s.totalMinutes,
  },
  {
    id: 'weekly-winner',
    name: 'Weekly Winner',
    description: 'Reach a weekly goal of 20 minutes or more.',
    target: 1,
    value: (s) => (s.weeklyGoal >= 20 && s.weekMinutes >= s.weeklyGoal ? 1 : 0),
  },
]

/* ---------- Points ---------- */
export const BADGE_BONUS = 25

export function sessionPoints(session: Session): number {
  return 10 + 2 * Math.round(session.seconds / 60)
}

export function totalPoints(sessions: Session[], badgeCount: number): number {
  return sessions.reduce((sum, session) => sum + sessionPoints(session), 0) + badgeCount * BADGE_BONUS
}

/* ---------- Levels ---------- */
const LEVELS = [
  { name: 'Seedling', at: 0 },
  { name: 'Sprout', at: 60 },
  { name: 'Leaf', at: 150 },
  { name: 'Blossom', at: 300 },
  { name: 'Lotus', at: 500 },
  { name: 'Calm River', at: 800 },
  { name: 'Still Lake', at: 1200 },
  { name: 'Moon Garden', at: 1800 },
  { name: 'Ocean Calm', at: 2600 },
  { name: 'Zen Master', at: 3600 },
]

export interface LevelInfo {
  level: number // 1, 2, 3...
  name: string
  nextName: string | null
  fraction: number // 0 to 1 toward the next level
  pointsToNext: number
}

export function levelInfo(points: number): LevelInfo {
  let index = 0
  for (let i = 0; i < LEVELS.length; i++) {
    if (points >= LEVELS[i].at) index = i
  }
  const current = LEVELS[index]
  const next = LEVELS[index + 1]
  if (!next) {
    return { level: index + 1, name: current.name, nextName: null, fraction: 1, pointsToNext: 0 }
  }
  return {
    level: index + 1,
    name: current.name,
    nextName: next.name,
    fraction: (points - current.at) / (next.at - current.at),
    pointsToNext: next.at - points,
  }
}

/* ---------- Weekly goal ---------- */
export const WEEKLY_GOAL_OPTIONS = [10, 20, 30, 45, 60]
export const DEFAULT_WEEKLY_GOAL = 20