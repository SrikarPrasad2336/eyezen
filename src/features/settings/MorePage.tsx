import { Settings, BookOpen, Trophy, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import './settings.css'

const LINKS: { to: string; icon: LucideIcon; title: MessageKey; hint: MessageKey }[] = [
  { to: '/more/settings', icon: Settings, title: 'more.settings', hint: 'more.settingsHint' },
  { to: '/more/conditions', icon: BookOpen, title: 'more.conditions', hint: 'more.conditionsHint' },
  { to: '/more/rewards', icon: Trophy, title: 'more.rewards', hint: 'more.rewardsHint' },
]

export default function MorePage() {
  const t = useT()

  return (
    <div className="ez-stack">
      <h1>{t('more.title')}</h1>
      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        {LINKS.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.to} to={link.to} className="ez-card ez-link-row">
              <span className="ez-setting__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="ez-setting__text">
                <span className="ez-setting__title">{t(link.title)}</span>
                <span className="ez-sub">{t(link.hint)}</span>
              </span>
              <ChevronRight size={20} aria-hidden="true" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}