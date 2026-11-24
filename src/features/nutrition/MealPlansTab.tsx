import { useState } from 'react'
import { ListPlus, ShoppingBasket } from 'lucide-react'
import { Button, Card } from '../../components/ui'
import { MEAL_PLANS } from '../../data/nutrition'
import { useT } from '../../i18n'
import { useNutrition } from '../../store/nutritionStore'

interface MealPlansTabProps {
  onOpenGrocery: () => void
}

export default function MealPlansTab({ onOpenGrocery }: MealPlansTabProps) {
  const t = useT()
  const addGrocery = useNutrition((state) => state.addGrocery)
  const [notice, setNotice] = useState<{ id: string; text: string } | null>(null)

  const handleAdd = (id: string, items: string[]) => {
    const count = addGrocery(items)
    setNotice({
      id,
      text: count > 0 ? `${t('nut.plans.added')}: ${count}` : t('nut.plans.allThere'),
    })
  }

  return (
    <div className="ez-stack">
      <p className="ez-sub">{t('nut.plans.note')}</p>

      <div className="ez-cardgrid ez-cardgrid--wide">
        {MEAL_PLANS.map((plan) => (
          <Card key={plan.id}>
            <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
              <div>
                <h2>{plan.name}</h2>
                <p className="ez-muted">{plan.tagline}</p>
              </div>

              <ul className="ez-meals">
                {plan.meals.map((meal) => (
                  <li key={meal.when} className="ez-meal">
                    <span className="ez-meal__when">{meal.when}</span>
                    <span>{meal.what}</span>
                  </li>
                ))}
              </ul>

              <p className="ez-caution">
                <strong>{t('nut.plans.tip')}:</strong> {plan.tip}
              </p>

              <div className="ez-row">
                <Button
                  variant="soft"
                  icon={<ListPlus size={18} />}
                  onClick={() => handleAdd(plan.id, plan.grocery)}
                >
                  {t('nut.plans.add')}
                </Button>
                {notice?.id === plan.id ? (
                  <Button
                    variant="ghost"
                    icon={<ShoppingBasket size={18} />}
                    onClick={onOpenGrocery}
                  >
                    {t('nut.plans.open')}
                  </Button>
                ) : null}
              </div>
              <p className="ez-sub" aria-live="polite" style={{ minHeight: '1.5rem' }}>
                {notice?.id === plan.id ? notice.text : ''}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}