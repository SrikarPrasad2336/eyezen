import { Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, EmptyState } from '../../components/ui'
import { BADGES, levelInfo, totalPoints } from '../../data/rewards'
import { useT } from '../../i18n'
import { useProgress } from '../../store/progressStore'
import { useRewards } from '../../store/rewardsStore'
import { BADGE_ICONS } from './rewardIcons'
import './rewards.css'

// A small badge preview for the Home screen
export default function BadgeStrip() {
  const t = useT()
  const sessions = useProgress((state) => state.sessions)
  const earned = useRewards((state) => state.earned)

  const points = totalPoints(sessions, Object.keys(earned).length)
  const level = levelInfo(points)

  const recent = BADGES.filter((badge) => earned[badge.id])
    .sort((a, b) => earned[b.id] - earned[a.id])
    .slice(0, 5)

  return (
    <Card>
      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <div className="ez-row" style={{ justifyContent: 'space-between' }}>
          <h2>{t('rw.badges')}</h2>
          <span className="ez-pill">
            {t('rw.level')} {level.level} · {level.name} · {points} {t('rw.points')}
          </span>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            icon={<Award size={28} />}
            title={t('rw.strip.empty')}
            message={t('rw.strip.emptyText')}
          />
        ) : (
          <ul className="ez-strip">
            {recent.map((badge) => {
              const Icon = BADGE_ICONS[badge.id] ?? Award
              return (
                <li key={badge.id} className="ez-strip__item">
                  <span className="ez-strip__icon" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <span className="ez-sub">{badge.name}</span>
                </li>
              )
            })}
          </ul>
        )}

        <div>
          <Link to="/more/rewards" className="ez-btn ez-btn--ghost ez-btn-link">
            {t('rw.seeAll')}
          </Link>
        </div>
      </div>
    </Card>
  )
}