import { useEffect, useMemo } from 'react'
import { BADGES } from '../data/rewards'
import { useHabits } from '../store/habitStore'
import { useProgress } from '../store/progressStore'
import { useRewards } from '../store/rewardsStore'
import { buildStats } from '../utils/rewardStats'

// Watches your progress and awards any badge you have just earned.
export function useBadgeWatcher() {
  const sessions = useProgress((state) => state.sessions)
  const entries = useHabits((state) => state.entries)
  const weeklyGoal = useRewards((state) => state.weeklyGoal)
  const earned = useRewards((state) => state.earned)
  const award = useRewards((state) => state.award)

  const stats = useMemo(
    () => buildStats(sessions, entries, weeklyGoal),
    [sessions, entries, weeklyGoal],
  )

  useEffect(() => {
    const fresh = BADGES.filter(
      (badge) => !earned[badge.id] && badge.value(stats) >= badge.target,
    ).map((badge) => badge.id)
    if (fresh.length > 0) award(fresh)
  }, [stats, earned, award])
}