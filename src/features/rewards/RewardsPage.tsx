import { useMemo } from 'react'
import { Award, Flame, Lock, Target, Trophy } from 'lucide-react'
import { Card, ProgressRing } from '../../components/ui'
import { BADGES, WEEKLY_GOAL_OPTIONS, levelInfo, totalPoints } from '../../data/rewards'
import { useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import { useHabits } from '../../store/habitStore'
import { useProgress } from '../../store/progressStore'
import { useRewards } from '../../store/rewardsStore'
import { addDays, startOfWeek } from '../../utils/date'
import { buildStats } from '../../utils/rewardStats'
import { currentStreak, longestStreak, weekSummary } from '../../utils/stats'
import { BADGE_ICONS } from './rewardIcons'
import './rewards.css'

function round1(value: number): number {
  return Math.round(value * 10) / 10
}

export default function RewardsPage() {
  const t = useT()
  const sessions = useProgress((state) => state.sessions)
  const entries = useHabits((state) => state.entries)
  const earned = useRewards((state) => state.earned)
  const weeklyGoal = useRewards((state) => state.weeklyGoal)
  const setWeeklyGoal = useRewards((state) => state.setWeeklyGoal)

  const points = totalPoints(sessions, Object.keys(earned).length)
  const level = levelInfo(points)

  const streak = useMemo(() => currentStreak(sessions), [sessions])
  const bestStreak = useMemo(() => longestStreak(sessions), [sessions])
  const week = useMemo(() => weekSummary(sessions, entries, startOfWeek()), [sessions, entries])
  const lastWeek = useMemo(
    () => weekSummary(sessions, entries, addDays(startOfWeek(), -7)),
    [sessions, entries],
  )
  const stats = useMemo(
    () => buildStats(sessions, entries, weeklyGoal),
    [sessions, entries, weeklyGoal],
  )

  const goalMet = week.minutes >= weeklyGoal

  let compare: MessageKey | null = null
  if (week.minutes > 0 || lastWeek.minutes > 0) {
    const difference = week.minutes - lastWeek.minutes
    compare = Math.abs(difference) < 0.5 ? 'rw.same' : difference > 0 ? 'rw.up' : 'rw.down'
  }

  const bestDayText = week.best
    ? `${week.best.date.toLocaleDateString(undefined, { weekday: 'long' })} · ${round1(week.best.minutes)} ${t('unit.minutes')}`
    : t('rw.none')

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
        <h1>{t('rw.title')}</h1>
        <p className="ez-muted">{t('rw.intro')}</p>
      </div>

      {/* Level and points */}
      <Card variant="glass">
        <div className="ez-level">
          <ProgressRing value={level.fraction * 100} size={120} stroke={11} label={t('rw.level')}>
            <span className="ez-sub">{t('rw.level')}</span>
            <span className="ez-num">{level.level}</span>
          </ProgressRing>
          <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
            <div className="ez-row">
              <Trophy size={22} color="var(--color-primary)" aria-hidden="true" />
              <h2>{level.name}</h2>
            </div>
            <p>
              <strong>{points}</strong> {t('rw.points')}
            </p>
            <p className="ez-muted">
              {level.nextName
                ? `${level.pointsToNext} ${t('rw.toNext')} ${level.nextName}`
                : t('rw.top')}
            </p>
            <p className="ez-sub">{t('rw.howPoints')}</p>
          </div>
        </div>
      </Card>

      {/* Streak */}
      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <div className="ez-row">
            <Flame size={22} color="var(--color-coral)" aria-hidden="true" />
            <h2>{t('rw.streak')}</h2>
          </div>
          <div className="ez-stats">
            <div className="ez-stat">
              <span className="ez-stat__num">{streak}</span>
              <span className="ez-sub">
                {t('rw.current')} · {t('rw.days')}
              </span>
            </div>
            <div className="ez-stat">
              <span className="ez-stat__num">{bestStreak}</span>
              <span className="ez-sub">
                {t('rw.longest')} · {t('rw.days')}
              </span>
            </div>
          </div>
          <p className="ez-sub">{t('rw.streakHint')}</p>
        </div>
      </Card>

      {/* Weekly goal and summary */}
      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-4)' }}>
          <div>
            <div className="ez-row">
              <Target size={22} color="var(--color-primary)" aria-hidden="true" />
              <h2>{t('rw.weekly')}</h2>
            </div>
            <p className="ez-sub">{t('rw.weeklyHint')}</p>
          </div>

          <div className="ez-row" role="group" aria-label={t('rw.weekly')}>
            {WEEKLY_GOAL_OPTIONS.map((minutes) => (
              <button
                key={minutes}
                type="button"
                className="ez-chip"
                aria-pressed={weeklyGoal === minutes}
                onClick={() => setWeeklyGoal(minutes)}
              >
                {minutes} {t('unit.minutes')}
              </button>
            ))}
          </div>

          <div className="ez-level">
            <ProgressRing
              value={(week.minutes / weeklyGoal) * 100}
              size={112}
              stroke={10}
              color="var(--color-sage)"
              label={t('rw.thisWeek')}
            >
              <span className="ez-num">{round1(week.minutes)}</span>
              <span className="ez-sub">
                {t('habit.of')} {weeklyGoal} {t('unit.minutes')}
              </span>
            </ProgressRing>
            <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
              <h3>{t('rw.thisWeek')}</h3>
              {goalMet ? <span className="ez-pill">{t('rw.goalMet')}</span> : null}
              {compare ? <p className="ez-muted">{t(compare)}</p> : null}
              <p className="ez-sub">
                {t('rw.last')}: {round1(lastWeek.minutes)} {t('unit.minutes')}
              </p>
            </div>
          </div>

          <div className="ez-stats">
            <div className="ez-stat">
              <span className="ez-stat__num">{week.sessions}</span>
              <span className="ez-sub">{t('rw.sessions')}</span>
            </div>
            <div className="ez-stat">
              <span className="ez-stat__num">{week.activeDays}</span>
              <span className="ez-sub">{t('rw.activeDays')}</span>
            </div>
            <div className="ez-stat">
              <span className="ez-stat__num">{week.waterDays}</span>
              <span className="ez-sub">{t('rw.waterDays')}</span>
            </div>
            <div className="ez-stat">
              <span className="ez-stat__text">{bestDayText}</span>
              <span className="ez-sub">{t('rw.bestDay')}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Badges */}
      <section className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <h2>
          {t('rw.badges')} · {Object.keys(earned).length} / {BADGES.length}
        </h2>
        <ul className="ez-badges">
          {BADGES.map((badge) => {
            const Icon = BADGE_ICONS[badge.id] ?? Award
            const earnedAt = earned[badge.id]
            const value = Math.min(badge.target, Math.floor(badge.value(stats)))
            const percent = Math.round((value / badge.target) * 100)

            return (
              <li key={badge.id} className={`ez-badge ${earnedAt ? 'is-earned' : ''}`}>
                <span className="ez-badge__icon" aria-hidden="true">
                  <Icon size={26} />
                </span>
                <span className="ez-badge__name">{badge.name}</span>
                <span className="ez-sub">{badge.description}</span>
                {earnedAt ? (
                  <span className="ez-sub ez-badge__status">
                    {t('rw.earned')}{' '}
                    {new Date(earnedAt).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                ) : (
                  <>
                    <div
                      className="ez-badge__bar"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={percent}
                      aria-label={badge.name}
                    >
                      <div className="ez-badge__fill" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="ez-sub ez-badge__status">
                      <Lock size={14} aria-hidden="true" /> {value} / {badge.target}
                    </span>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}