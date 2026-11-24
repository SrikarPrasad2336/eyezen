import { Apple, Carrot, Droplets, Eye, Fish, Nut, Search, Sparkles, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, EmptyState } from '../../components/ui'
import { NUTRIENTS, matchesQuery } from '../../data/nutrition'
import { useT } from '../../i18n'

const ICONS: Record<string, LucideIcon> = {
  lutein: Sun,
  zeaxanthin: Eye,
  'vitamin-a': Carrot,
  'vitamin-c': Apple,
  'vitamin-e': Nut,
  omega3: Fish,
  zinc: Sparkles,
  hydration: Droplets,
}

interface NutrientsTabProps {
  query: string
}

export default function NutrientsTab({ query }: NutrientsTabProps) {
  const t = useT()
  const list = NUTRIENTS.filter((nutrient) =>
    matchesQuery(
      query,
      `${nutrient.name} ${nutrient.tagline} ${nutrient.about} ${nutrient.foods.join(' ')}`,
    ),
  )

  if (list.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<Search size={28} />}
          title={t('nut.noResults.title')}
          message={t('nut.noResults.text')}
        />
      </Card>
    )
  }

  return (
    <div className="ez-cardgrid ez-cardgrid--wide">
      {list.map((nutrient) => {
        const Icon = ICONS[nutrient.id] ?? Sparkles
        return (
          <Card key={nutrient.id}>
            <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
              <div className="ez-nutcard__head">
                <span className="ez-nutcard__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div>
                  <h2 className="ez-nutcard__name">{nutrient.name}</h2>
                  <p className="ez-sub">{nutrient.tagline}</p>
                </div>
              </div>
              <p>{nutrient.about}</p>
              <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
                <p className="ez-sub">{t('nut.foundIn')}</p>
                <ul className="ez-tags">
                  {nutrient.foods.map((food) => (
                    <li key={food} className="ez-tag">
                      {food}
                    </li>
                  ))}
                </ul>
              </div>
              {nutrient.caution ? <p className="ez-caution">{nutrient.caution}</p> : null}
            </div>
          </Card>
        )
      })}
    </div>
  )
}