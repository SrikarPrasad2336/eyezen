import { Leaf, Search, TriangleAlert } from 'lucide-react'
import { Card, EmptyState } from '../../components/ui'
import { DIET_LABEL, FOODS, LIMITS, matchesQuery } from '../../data/nutrition'
import { useT } from '../../i18n'

interface FoodsTabProps {
  query: string
}

export default function FoodsTab({ query }: FoodsTabProps) {
  const t = useT()

  const foods = FOODS.filter((food) => {
    // Vegan foods are also fine for vegetarians, so both words find them
    const diet = food.diet === 'vegan' ? 'vegan vegetarian' : DIET_LABEL[food.diet]
    return matchesQuery(query, `${food.name} ${diet} ${food.gives.join(' ')} ${food.note}`)
  })
  const limits = LIMITS.filter((item) => matchesQuery(query, `${item.name} ${item.why} limit`))

  if (foods.length === 0 && limits.length === 0) {
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
    <div className="ez-stack">
      {foods.length > 0 ? (
        <div className="ez-cardgrid">
          {foods.map((food) => (
            <Card key={food.id}>
              <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
                <div className="ez-nutcard__head">
                  <span className="ez-nutcard__icon" aria-hidden="true">
                    <Leaf size={22} />
                  </span>
                  <div>
                    <h2 className="ez-nutcard__name">{food.name}</h2>
                    <span className="ez-tag ez-tag--diet">{DIET_LABEL[food.diet]}</span>
                  </div>
                </div>
                <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
                  <p className="ez-sub">{t('nut.gives')}</p>
                  <ul className="ez-tags">
                    {food.gives.map((item) => (
                      <li key={item} className="ez-tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="ez-muted">{food.note}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {limits.length > 0 ? (
        <section className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <div>
            <h2>{t('nut.limit.title')}</h2>
            <p className="ez-sub">{t('nut.limit.hint')}</p>
          </div>
          <div className="ez-cardgrid">
            {limits.map((item) => (
              <Card key={item.id} variant="tinted">
                <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
                  <div className="ez-row" style={{ flexWrap: 'nowrap' }}>
                    <TriangleAlert size={20} aria-hidden="true" style={{ flex: 'none' }} />
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.why}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}