import { Droplet, Lightbulb, Minus, Plus } from 'lucide-react'
import { Card, ProgressRing } from '../../components/ui'
import { WATER_GOAL } from '../../data/habits'
import { HYDRATION_TIPS } from '../../data/nutrition'
import { useT } from '../../i18n'
import { EMPTY_DAY, useHabits } from '../../store/habitStore'
import { todayKey } from '../../utils/date'

const MAX_GLASSES = 20

export default function HydrationTab() {
  const t = useT()
  const entries = useHabits((state) => state.entries)
  const change = useHabits((state) => state.change)

  const today = todayKey()
  const water = (entries[today] ?? EMPTY_DAY).water
  const shown = Math.max(WATER_GOAL, Math.ceil(water))

  return (
    <div className="ez-stack">
      <Card variant="glass">
        <div className="ez-stack" style={{ gap: 'var(--space-4)', justifyItems: 'center' }}>
          <div className="ez-stack" style={{ gap: 'var(--space-2)', textAlign: 'center' }}>
            <h2>{t('nut.water.title')}</h2>
            <p className="ez-sub">{t('nut.water.hint')}</p>
          </div>

          <ProgressRing
            value={(water / WATER_GOAL) * 100}
            size={140}
            stroke={12}
            color="var(--color-coral)"
            label={t('nut.water.title')}
          >
            <span className="ez-num">{water}</span>
            <span className="ez-sub">
              {t('habit.of')} {WATER_GOAL} {t('nut.water.glasses')}
            </span>
          </ProgressRing>

          <div className="ez-glasses" aria-hidden="true">
            {Array.from({ length: shown }, (_, index) => (
              <span key={index} className={`ez-glass ${index < water ? 'is-full' : ''}`}>
                <Droplet size={22} fill="currentColor" />
              </span>
            ))}
          </div>

          <div className="ez-row" style={{ justifyContent: 'center', gap: 'var(--space-5)' }}>
            <button
              type="button"
              className="ez-roundbtn"
              aria-label={t('nut.water.remove')}
              disabled={water <= 0}
              onClick={() => change(today, 'water', -1, MAX_GLASSES)}
            >
              <Minus size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="ez-roundbtn ez-roundbtn--main"
              aria-label={t('nut.water.add')}
              disabled={water >= MAX_GLASSES}
              onClick={() => change(today, 'water', 1, MAX_GLASSES)}
            >
              <Plus size={28} aria-hidden="true" />
            </button>
          </div>

          <p className="ez-sub" aria-live="polite" style={{ minHeight: '1.5rem' }}>
            {water >= WATER_GOAL ? t('nut.water.goalMet') : ''}
          </p>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <div className="ez-row">
            <Lightbulb size={22} color="var(--color-primary)" aria-hidden="true" />
            <h2>{t('nut.water.tips')}</h2>
          </div>
          <ul className="ez-bullets">
            {HYDRATION_TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <p className="ez-caution">{t('nut.water.caution')}</p>
        </div>
      </Card>
    </div>
  )
}