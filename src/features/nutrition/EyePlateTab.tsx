import { Card, ProgressRing } from '../../components/ui'
import { EYE_PLATE } from '../../data/nutrition'
import { useT } from '../../i18n'
import { useNutrition } from '../../store/nutritionStore'
import { todayKey } from '../../utils/date'

const NONE: string[] = []

export default function EyePlateTab() {
  const t = useT()
  const plate = useNutrition((state) => state.plate)
  const toggle = useNutrition((state) => state.togglePlate)

  const today = todayKey()
  const ticked = plate[today] ?? NONE
  const count = EYE_PLATE.filter((item) => ticked.includes(item.id)).length
  const total = EYE_PLATE.length

  return (
    <div className="ez-stack">
      <Card variant="glass">
        <div className="ez-plate-head">
          <ProgressRing
            value={(count / total) * 100}
            size={112}
            stroke={10}
            color="var(--color-sage)"
            label={t('nut.plate.title')}
          >
            <span className="ez-num">{count}</span>
            <span className="ez-sub">
              {t('nut.plate.of')} {total}
            </span>
          </ProgressRing>
          <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
            <h2>{t('nut.plate.title')}</h2>
            <p className="ez-muted">{t('nut.plate.hint')}</p>
            {count === total ? <span className="ez-pill">{t('nut.plate.done')}</span> : null}
          </div>
        </div>
      </Card>

      <Card>
        <ul className="ez-plate">
          {EYE_PLATE.map((item) => {
            const on = ticked.includes(item.id)
            return (
              <li key={item.id}>
                <label className={`ez-plate__row ${on ? 'is-on' : ''}`}>
                  <input type="checkbox" checked={on} onChange={() => toggle(today, item.id)} />
                  <span className="ez-plate__text">
                    <span className="ez-plate__name">{item.name}</span>
                    <span className="ez-sub">{item.examples}</span>
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}