import { Droplets, Minus, Monitor, Moon, Plus, Timer, TreePine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BREAKS_GOAL, HABITS } from '../../data/habits'
import type { HabitId } from '../../data/habits'
import { useT } from '../../i18n'
import type { DayHabits } from '../../store/habitStore'

const ICONS: Record<HabitId, LucideIcon> = {
  water: Droplets,
  screen: Monitor,
  sleep: Moon,
  outdoor: TreePine,
}

interface HabitTrackerProps {
  values: DayHabits
  breaks: number
  onChange: (id: HabitId, delta: number, max: number) => void
}

export default function HabitTracker({ values, breaks, onChange }: HabitTrackerProps) {
  const t = useT()

  return (
    <ul className="ez-habits">
      {HABITS.map((habit) => {
        const Icon = ICONS[habit.id]
        const value = values[habit.id]
        const name = t(habit.nameKey)
        const unit = t(habit.unitKey)
        const percent = Math.min(100, Math.round((value / habit.goal) * 100))
        const over = habit.kind === 'limit' && value > habit.goal
        const text =
          habit.kind === 'limit'
            ? `${value} ${unit} · ${t('habit.under')} ${habit.goal} ${unit}`
            : `${value} ${t('habit.of')} ${habit.goal} ${unit}`

        return (
          <li key={habit.id} className="ez-habit">
            <span className="ez-habit__icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <div className="ez-habit__text">
              <span className="ez-habit__name">{name}</span>
              <span className="ez-sub">{text}</span>
              <div
                className="ez-habit__bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                aria-label={name}
              >
                <div
                  className={`ez-habit__fill ${over ? 'ez-habit__fill--over' : ''}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <div className="ez-habit__btns">
              <button
                type="button"
                className="ez-habit__btn"
                aria-label={`${t('habit.less')}: ${name}`}
                disabled={value <= 0}
                onClick={() => onChange(habit.id, -habit.step, habit.max)}
              >
                <Minus size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="ez-habit__btn"
                aria-label={`${t('habit.more')}: ${name}`}
                disabled={value >= habit.max}
                onClick={() => onChange(habit.id, habit.step, habit.max)}
              >
                <Plus size={18} aria-hidden="true" />
              </button>
            </div>
          </li>
        )
      })}

      {/* Counted automatically from finished 20-20-20 breaks */}
      <li className="ez-habit">
        <span className="ez-habit__icon" aria-hidden="true">
          <Timer size={20} />
        </span>
        <div className="ez-habit__text">
          <span className="ez-habit__name">{t('habit.breaks')}</span>
          <span className="ez-sub">
            {breaks} {t('habit.of')} {BREAKS_GOAL} {t('unit.breaks')}
          </span>
          <div
            className="ez-habit__bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.min(100, Math.round((breaks / BREAKS_GOAL) * 100))}
            aria-label={t('habit.breaks')}
          >
            <div
              className="ez-habit__fill"
              style={{ width: `${Math.min(100, Math.round((breaks / BREAKS_GOAL) * 100))}%` }}
            />
          </div>
          <span className="ez-sub">{t('habit.breaksHint')}</span>
        </div>
      </li>
    </ul>
  )
}