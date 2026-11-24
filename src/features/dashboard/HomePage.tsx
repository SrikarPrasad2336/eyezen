import { useMemo, useState } from 'react'
import {
  BarChart3,
  Droplets,
  Flame,
  Hand,
  Lightbulb,
  Moon,
  Play,
  RefreshCw,
  Sparkles,
  Timer,
  Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, EmptyState, ProgressRing } from '../../components/ui'
import { EyeLogo, NatureWaves, Particles } from '../../components/illustrations'
import { getExercise } from '../../data/exercises'
import {
  BREAKS_GOAL,
  EXERCISE_GOAL_MINUTES,
  WATER_GOAL,
} from '../../data/habits'
import { ROUTINES } from '../../data/routines'
import { TIPS } from '../../data/tips'
import { useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import { EMPTY_DAY, useHabits } from '../../store/habitStore'
import { useProgress } from '../../store/progressStore'
import { dayOfYear, todayKey } from '../../utils/date'
import { currentStreak, dailyMinutes, dailyScore } from '../../utils/stats'
import { EXERCISE_ICONS, ROUTINE_ICONS } from '../exercises/exerciseIcons'
import ActivityChart from './ActivityChart'
import HabitTracker from './HabitTracker'
import BadgeStrip from '../rewards/BadgeStrip'
import './dashboard.css'

function greetingKey(): MessageKey {
  const hour = new Date().getHours()
  if (hour < 12) return 'home.greeting.morning'
  if (hour < 18) return 'home.greeting.afternoon'
  return 'home.greeting.evening'
}

function round1(value: number): number {
  return Math.round(value * 10) / 10
}

interface Recommendation {
  title: MessageKey
  text: MessageKey
  button: MessageKey
  icon: LucideIcon
  run: () => void
}

const QUICK_EXERCISES = ['twenty-20-20', 'palming', 'box-breathing']

export default function HomePage() {
  const t = useT()
  const navigate = useNavigate()
  const sessions = useProgress((state) => state.sessions)
  const entries = useHabits((state) => state.entries)
  const change = useHabits((state) => state.change)

  const [range, setRange] = useState<7 | 30>(7)
  const [tipShift, setTipShift] = useState(0)

  const today = todayKey()
  const values = entries[today] ?? EMPTY_DAY

  // Today's numbers from your finished exercises
  const todays = useMemo(() => {
    const key = todayKey()
    let seconds = 0
    let breaks = 0
    for (const session of sessions) {
      if (session.date !== key) continue
      seconds += session.seconds
      if (session.exerciseId === 'twenty-20-20') breaks += 1
    }
    return { minutes: seconds / 60, breaks }
  }, [sessions])

  const streak = useMemo(() => currentStreak(sessions), [sessions])
  const series = useMemo(() => dailyMinutes(sessions, range), [sessions, range])

  const score = dailyScore(todays.minutes, values, todays.breaks)
  const rangeTotal = series.reduce((sum, day) => sum + day.minutes, 0)
  const activeDays = series.filter((day) => day.minutes > 0).length

  const logHabit = (id: Parameters<typeof change>[1], delta: number, max: number) =>
    change(today, id, delta, max)

  // What should the person do next?
  const hour = new Date().getHours()
  let recommendation: Recommendation
  if (todays.minutes === 0) {
    recommendation =
      hour >= 20
        ? {
            title: 'rec.evening.title',
            text: 'rec.evening.text',
            button: 'rec.evening.button',
            icon: Moon,
            run: () => navigate('/exercises/routine/bedtime'),
          }
        : {
            title: 'rec.first.title',
            text: 'rec.first.text',
            button: 'rec.first.button',
            icon: Sparkles,
            run: () => navigate('/exercises/routine/quick-reset'),
          }
  } else if (hour >= 20 && todays.minutes < 10) {
    recommendation = {
      title: 'rec.evening.title',
      text: 'rec.evening.text',
      button: 'rec.evening.button',
      icon: Moon,
      run: () => navigate('/exercises/routine/bedtime'),
    }
  } else if (todays.breaks < BREAKS_GOAL) {
    recommendation = {
      title: 'rec.breaks.title',
      text: 'rec.breaks.text',
      button: 'rec.breaks.button',
      icon: Timer,
      run: () => navigate('/exercises/twenty-20-20'),
    }
  } else if (values.water < WATER_GOAL) {
    recommendation = {
      title: 'rec.water.title',
      text: 'rec.water.text',
      button: 'rec.water.button',
      icon: Droplets,
      run: () => logHabit('water', 1, 20),
    }
  } else {
    recommendation = {
      title: 'rec.done.title',
      text: 'rec.done.text',
      button: 'rec.done.button',
      icon: Hand,
      run: () => navigate('/exercises/palming'),
    }
  }
  const RecIcon = recommendation.icon

  // The tip changes each day. "Another tip" lets you browse.
  const tip = TIPS[(dayOfYear() + tipShift) % TIPS.length]

  // Quick-start buttons
  const quickReset = ROUTINES.find((routine) => routine.id === 'quick-reset')
  const QuickResetIcon = ROUTINE_ICONS['quick-reset'] ?? Sparkles

  const minutesText = round1(todays.minutes)
  const chartLabel = `${t('chart.title')}: ${round1(rangeTotal)} ${t('unit.minutes')}, ${activeDays} ${t('chart.activeDays')}`

  return (
    <div className="ez-stack">
      {/* Greeting */}
      <section className="ez-hero">
        <Particles />
        <div className="ez-hero__content">
          <EyeLogo size={56} />
          <h1>{t(greetingKey())}</h1>
          <p className="ez-muted">{t('home.subtitle')}</p>
          <div className="ez-row">
            <span className="ez-pill">
              <Flame size={18} color="var(--color-coral)" aria-hidden="true" />
              {streak > 0 ? `${streak} ${t('home.streakDays')}` : t('home.streakNone')}
            </span>
          </div>
          <Button
            size="lg"
            icon={<Play size={20} />}
            onClick={() => navigate('/exercises/routine/quick-reset')}
          >
            {t('home.start')}
          </Button>
        </div>
        <div className="ez-hero__waves">
          <NatureWaves />
        </div>
      </section>

      {/* Today's score */}
      <Card variant="glass">
        <div className="ez-score">
          <ProgressRing value={score} size={132} stroke={12} label={t('home.score')}>
            <span className="ez-num">{score}</span>
            <span className="ez-sub">/ 100</span>
          </ProgressRing>
          <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
            <h2>{t('home.score')}</h2>
            <p className="ez-muted">{t('home.scoreHint')}</p>
          </div>
        </div>
      </Card>

      {/* Three small rings */}
      <Card>
        <div className="ez-stack">
          <h2>{t('home.rings')}</h2>
          <div className="ez-rings">
            <div className="ez-ringcol">
              <ProgressRing
                value={(todays.minutes / EXERCISE_GOAL_MINUTES) * 100}
                size={92}
                stroke={9}
                label={t('home.ringMinutes')}
              >
                <span className="ez-num">{minutesText}</span>
                <span className="ez-sub">
                  {t('habit.of')} {EXERCISE_GOAL_MINUTES} {t('unit.minutes')}
                </span>
              </ProgressRing>
              <span className="ez-sub">{t('home.ringMinutes')}</span>
            </div>

            <div className="ez-ringcol">
              <ProgressRing
                value={(values.water / WATER_GOAL) * 100}
                size={92}
                stroke={9}
                color="var(--color-coral)"
                label={t('home.ringWater')}
              >
                <Droplets size={20} color="var(--color-primary)" aria-hidden="true" />
                <span className="ez-sub">
                  {values.water} {t('habit.of')} {WATER_GOAL}
                </span>
              </ProgressRing>
              <span className="ez-sub">{t('home.ringWater')}</span>
            </div>

            <div className="ez-ringcol">
              <ProgressRing
                value={(todays.breaks / BREAKS_GOAL) * 100}
                size={92}
                stroke={9}
                color="var(--color-sage)"
                label={t('home.ringBreaks')}
              >
                <Timer size={20} color="var(--color-primary)" aria-hidden="true" />
                <span className="ez-sub">
                  {todays.breaks} {t('habit.of')} {BREAKS_GOAL}
                </span>
              </ProgressRing>
              <span className="ez-sub">{t('home.ringBreaks')}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Next recommended task */}
      <Card variant="tinted">
        <div className="ez-next">
          <span className="ez-next__icon" aria-hidden="true">
            <RecIcon size={24} />
          </span>
          <div className="ez-stack" style={{ gap: 'var(--space-3)', flex: 1 }}>
            <div>
              <p className="ez-sub">{t('home.next')}</p>
              <h2>{t(recommendation.title)}</h2>
              <p className="ez-muted">{t(recommendation.text)}</p>
            </div>
            <div>
              <Button onClick={recommendation.run}>{t(recommendation.button)}</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick start */}
      <section className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <h2>{t('home.quick')}</h2>
        <div className="ez-quickgrid">
          {quickReset ? (
            <Link to={`/exercises/routine/${quickReset.id}`} className="ez-quick">
              <span className="ez-quick__icon" aria-hidden="true">
                <QuickResetIcon size={22} />
              </span>
              <span>{quickReset.name}</span>
            </Link>
          ) : null}
          {QUICK_EXERCISES.map((id) => {
            const exercise = getExercise(id)
            if (!exercise) return null
            const Icon = EXERCISE_ICONS[id] ?? Wind
            return (
              <Link key={id} to={`/exercises/${id}`} className="ez-quick">
                <span className="ez-quick__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span>{exercise.name}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Chart */}
      <Card>
        <div className="ez-stack">
          <div className="ez-row" style={{ justifyContent: 'space-between' }}>
            <h2>{t('chart.title')}</h2>
            <div className="ez-row" role="group" aria-label={t('chart.title')}>
              {([7, 30] as const).map((days) => (
                <button
                  key={days}
                  type="button"
                  className="ez-chip"
                  aria-pressed={range === days}
                  onClick={() => setRange(days)}
                >
                  {t(days === 7 ? 'chart.days7' : 'chart.days30')}
                </button>
              ))}
            </div>
          </div>

          {rangeTotal === 0 ? (
            <EmptyState
              icon={<BarChart3 size={28} />}
              title={t('chart.empty.title')}
              message={t('chart.empty.text')}
              action={
                <Button variant="soft" onClick={() => navigate('/exercises')}>
                  {t('nav.exercises')}
                </Button>
              }
            />
          ) : (
            <>
              <ActivityChart
                key={range}
                data={series}
                goal={EXERCISE_GOAL_MINUTES}
                tickEvery={range === 7 ? 1 : 5}
                label={chartLabel}
                unit={t('unit.minutes')}
              />
              <div className="ez-legend">
                <span className="ez-legend__goal">
                  <span className="ez-legend__line" aria-hidden="true" />
                  {t('chart.goal')}: {EXERCISE_GOAL_MINUTES} {t('unit.minutes')}
                </span>
                <span>
                  {t('chart.total')}: {round1(rangeTotal)} {t('unit.minutes')} · {activeDays}{' '}
                  {t('chart.activeDays')}
                </span>
              </div>
            </>
          )}
        </div>
      </Card>

      <BadgeStrip />

      {/* Habit tracker */}
      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <div>
            <h2>{t('habit.title')}</h2>
            <p className="ez-sub">{t('habit.hint')}</p>
          </div>
          <HabitTracker values={values} breaks={todays.breaks} onChange={logHabit} />
        </div>
      </Card>

      {/* Daily eye tip */}
      <Card variant="glass">
        <div className="ez-tip">
          <span className="ez-tip__icon" aria-hidden="true">
            <Lightbulb size={22} />
          </span>
          <div className="ez-stack" style={{ gap: 'var(--space-3)', flex: 1 }}>
            <div>
              <h3>{t('tip.title')}</h3>
              <p className="ez-muted">{tip}</p>
            </div>
            <div>
              <Button
                variant="ghost"
                icon={<RefreshCw size={18} />}
                onClick={() => setTipShift((value) => value + 1)}
              >
                {t('tip.next')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}