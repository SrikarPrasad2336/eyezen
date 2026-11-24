import { useState } from 'react'
import { ChevronRight, Eye, Search, ShieldAlert, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, EmptyState } from '../../components/ui'
import { CONDITIONS } from '../../data/conditions'
import type { ConditionGroup } from '../../data/conditions'
import { matchesQuery } from '../../data/nutrition'
import { useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import '../nutrition/nutrition.css'
import { CONDITION_ICONS } from './conditionIcons'
import './conditions.css'

const GROUPS: { id: ConditionGroup; key: MessageKey }[] = [
  { id: 'comfort', key: 'cond.group.comfort' },
  { id: 'focus', key: 'cond.group.focus' },
  { id: 'surface', key: 'cond.group.surface' },
  { id: 'longterm', key: 'cond.group.longterm' },
]

export default function ConditionsPage() {
  const t = useT()
  const [query, setQuery] = useState('')

  const list = CONDITIONS.filter((condition) =>
    matchesQuery(
      query,
      `${condition.name} ${condition.tagline} ${condition.overview} ${condition.signs.join(' ')}`,
    ),
  )

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
        <h1>{t('more.conditions')}</h1>
        <p className="ez-muted">{t('cond.intro')}</p>
      </div>

      <Card variant="tinted">
        <div className="ez-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <ShieldAlert size={22} aria-hidden="true" style={{ flex: 'none', marginTop: 2 }} />
          <p style={{ flex: 1 }}>{t('cond.disclaimer')}</p>
        </div>
      </Card>

      <div className="ez-urgentbox" role="note">
        <h2 className="ez-urgentbox__title">{t('cond.urgent.title')}</h2>
        <p>{t('cond.urgent.text')}</p>
      </div>

      <div className="ez-search">
        <Search size={20} className="ez-search__icon" aria-hidden="true" />
        <input
          className="ez-search__input"
          type="text"
          inputMode="search"
          autoComplete="off"
          aria-label={t('cond.search')}
          placeholder={t('cond.searchPlaceholder')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query ? (
          <button
            type="button"
            className="ez-search__clear"
            aria-label={t('cond.clear')}
            onClick={() => setQuery('')}
          >
            <X size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {list.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Search size={28} />}
            title={t('cond.noResults.title')}
            message={t('cond.noResults.text')}
          />
        </Card>
      ) : (
        GROUPS.map((group) => {
          const items = list.filter((condition) => condition.group === group.id)
          if (items.length === 0) return null
          return (
            <section key={group.id} className="ez-stack" style={{ gap: 'var(--space-3)' }}>
              <h2>{t(group.key)}</h2>
              {items.map((condition) => {
                const Icon = CONDITION_ICONS[condition.id] ?? Eye
                return (
                  <Link
                    key={condition.id}
                    to={`/more/conditions/${condition.id}`}
                    className="ez-card ez-cond-card"
                  >
                    <span className="ez-cond-card__icon" aria-hidden="true">
                      <Icon size={24} />
                    </span>
                    <span className="ez-cond-card__text">
                      <span className="ez-cond-card__name">{condition.name}</span>
                      <span className="ez-muted">{condition.tagline}</span>
                    </span>
                    <ChevronRight size={20} aria-hidden="true" />
                  </Link>
                )
              })}
            </section>
          )
        })
      )}
    </div>
  )
}