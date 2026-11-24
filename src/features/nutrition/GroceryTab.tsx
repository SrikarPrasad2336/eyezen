import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, ShoppingBasket, Trash2, X } from 'lucide-react'
import { Button, Card, EmptyState } from '../../components/ui'
import { useT } from '../../i18n'
import { useNutrition } from '../../store/nutritionStore'

export default function GroceryTab() {
  const t = useT()
  const inputId = useId()
  const items = useNutrition((state) => state.grocery)
  const addGrocery = useNutrition((state) => state.addGrocery)
  const toggleGrocery = useNutrition((state) => state.toggleGrocery)
  const removeGrocery = useNutrition((state) => state.removeGrocery)
  const clearDone = useNutrition((state) => state.clearDone)

  const [text, setText] = useState('')

  const left = items.filter((item) => !item.done).length
  const hasDone = items.some((item) => item.done)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    addGrocery([text])
    setText('')
  }

  return (
    <div className="ez-stack">
      <Card>
        <form className="ez-stack" style={{ gap: 'var(--space-3)' }} onSubmit={submit}>
          <div>
            <h2>{t('nut.tab.grocery')}</h2>
            <p className="ez-sub">{t('nut.grocery.hint')}</p>
          </div>
          <label htmlFor={inputId} className="ez-visually-hidden">
            {t('nut.grocery.label')}
          </label>
          <div className="ez-addrow">
            <input
              id={inputId}
              className="ez-textinput"
              type="text"
              maxLength={60}
              placeholder={t('nut.grocery.placeholder')}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <Button type="submit" icon={<Plus size={18} />} disabled={text.trim() === ''}>
              {t('nut.grocery.add')}
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBasket size={28} />}
            title={t('nut.grocery.empty.title')}
            message={t('nut.grocery.empty.text')}
          />
        ) : (
          <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
            <div className="ez-row" style={{ justifyContent: 'space-between' }}>
              <span className="ez-pill">
                {left} {t('nut.grocery.left')}
              </span>
              {hasDone ? (
                <Button variant="ghost" icon={<Trash2 size={18} />} onClick={clearDone}>
                  {t('nut.grocery.clear')}
                </Button>
              ) : null}
            </div>
            <ul className="ez-grocery">
              {items.map((item) => (
                <li key={item.id} className={`ez-groc ${item.done ? 'is-done' : ''}`}>
                  <label className="ez-groc__label">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleGrocery(item.id)}
                    />
                    <span className="ez-groc__text">{item.text}</span>
                  </label>
                  <button
                    type="button"
                    className="ez-roundbtn ez-roundbtn--small"
                    aria-label={`${t('nut.grocery.remove')}: ${item.text}`}
                    onClick={() => removeGrocery(item.id)}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  )
}