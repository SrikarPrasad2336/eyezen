import { useState } from 'react'
import {
  Droplets,
  FlaskConical,
  ListChecks,
  Salad,
  Search,
  ShieldAlert,
  ShoppingBasket,
  Utensils,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '../../components/ui'
import { useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import EyePlateTab from './EyePlateTab'
import FoodsTab from './FoodsTab'
import GroceryTab from './GroceryTab'
import HydrationTab from './HydrationTab'
import MealPlansTab from './MealPlansTab'
import NutrientsTab from './NutrientsTab'
import './nutrition.css'

type TabId = 'nutrients' | 'foods' | 'plans' | 'plate' | 'water' | 'grocery'

const TABS: { id: TabId; labelKey: MessageKey; icon: LucideIcon }[] = [
  { id: 'nutrients', labelKey: 'nut.tab.nutrients', icon: FlaskConical },
  { id: 'foods', labelKey: 'nut.tab.foods', icon: Salad },
  { id: 'plans', labelKey: 'nut.tab.plans', icon: Utensils },
  { id: 'plate', labelKey: 'nut.tab.plate', icon: ListChecks },
  { id: 'water', labelKey: 'nut.tab.water', icon: Droplets },
  { id: 'grocery', labelKey: 'nut.tab.grocery', icon: ShoppingBasket },
]

export default function NutritionPage() {
  const t = useT()
  const [tab, setTab] = useState<TabId>('nutrients')
  const [query, setQuery] = useState('')

  const searchable = tab === 'nutrients' || tab === 'foods'

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
        <h1>{t('nav.nutrition')}</h1>
        <p className="ez-muted">{t('nut.intro')}</p>
      </div>

      <Card variant="tinted">
        <div className="ez-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <ShieldAlert size={22} aria-hidden="true" style={{ flex: 'none', marginTop: 2 }} />
          <p style={{ flex: 1 }}>{t('nut.disclaimer')}</p>
        </div>
      </Card>

      <div className="ez-tabs" role="group" aria-label={t('nut.tabs')}>
        {TABS.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              className="ez-chip"
              aria-pressed={tab === item.id}
              onClick={() => setTab(item.id)}
            >
              <Icon size={18} aria-hidden="true" />
              {t(item.labelKey)}
            </button>
          )
        })}
      </div>

      {searchable ? (
        <div className="ez-search">
          <Search size={20} className="ez-search__icon" aria-hidden="true" />
          <input
            className="ez-search__input"
            type="text"
            inputMode="search"
            autoComplete="off"
            aria-label={t('nut.search')}
            placeholder={t('nut.searchPlaceholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button
              type="button"
              className="ez-search__clear"
              aria-label={t('nut.clear')}
              onClick={() => setQuery('')}
            >
              <X size={18} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}

      {tab === 'nutrients' ? <NutrientsTab query={query} /> : null}
      {tab === 'foods' ? <FoodsTab query={query} /> : null}
      {tab === 'plans' ? <MealPlansTab onOpenGrocery={() => setTab('grocery')} /> : null}
      {tab === 'plate' ? <EyePlateTab /> : null}
      {tab === 'water' ? <HydrationTab /> : null}
      {tab === 'grocery' ? <GroceryTab /> : null}
    </div>
  )
}