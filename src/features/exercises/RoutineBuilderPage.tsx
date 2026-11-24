import { useId, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUp, ListPlus, Play, Plus, Save, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, EmptyState } from '../../components/ui'
import { EXERCISES, getExercise, getTotalSeconds } from '../../data/exercises'
import type { Exercise } from '../../data/exercises'
import { useT } from '../../i18n'
import { useRoutines } from '../../store/routineStore'
import { formatDuration } from '../../utils/time'
import '../settings/settings.css'
import './exercises.css'

const MAX_ITEMS = 12

export default function RoutineBuilderPage() {
  const t = useT()
  const navigate = useNavigate()
  const nameId = useId()
  const addRoutine = useRoutines((state) => state.addRoutine)

  const [name, setName] = useState('')
  const [picked, setPicked] = useState<string[]>([])

  const chosen: Exercise[] = picked.flatMap((id) => {
    const exercise = getExercise(id)
    return exercise ? [exercise] : []
  })
  const totalSeconds = chosen.reduce((sum, exercise) => sum + getTotalSeconds(exercise), 0)

  const add = (id: string) => {
    setPicked((list) => (list.length >= MAX_ITEMS ? list : [...list, id]))
  }

  const remove = (index: number) => {
    setPicked((list) => list.filter((_, position) => position !== index))
  }

  const move = (index: number, direction: -1 | 1) => {
    setPicked((list) => {
      const target = index + direction
      if (target < 0 || target >= list.length) return list
      const copy = [...list]
      const item = copy[index]
      copy[index] = copy[target]
      copy[target] = item
      return copy
    })
  }

  const save = (andStart: boolean) => {
    if (picked.length === 0) return
    const finalName = name.trim() || t('builder.defaultName')
    const id = addRoutine(finalName, picked)
    navigate(andStart ? `/exercises/routine/${id}` : '/exercises')
  }

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <Link to="/exercises" className="ez-back">
          <ArrowLeft size={18} aria-hidden="true" /> {t('builder.back')}
        </Link>
        <h1>{t('builder.title')}</h1>
        <p className="ez-muted">{t('builder.intro')}</p>
      </div>

      <Card>
        <div className="ez-field">
          <label htmlFor={nameId} className="ez-label">
            {t('builder.name')}
          </label>
          <input
            id={nameId}
            className="ez-input"
            type="text"
            maxLength={40}
            placeholder={t('builder.namePlaceholder')}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <div className="ez-row" style={{ justifyContent: 'space-between' }}>
            <h2>{t('builder.yours')}</h2>
            {chosen.length > 0 ? (
              <span className="ez-pill">
                {t('builder.total')}: {formatDuration(totalSeconds)}
              </span>
            ) : null}
          </div>

          {chosen.length === 0 ? (
            <EmptyState
              icon={<ListPlus size={28} />}
              title={t('builder.empty')}
              message={t('builder.emptyHint')}
            />
          ) : (
            <div className="ez-pick-list">
              {chosen.map((exercise, index) => (
                <div key={`${exercise.id}-${index}`} className="ez-pick">
                  <span className="ez-pick__num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="ez-pick__text">
                    <span className="ez-setting__title">{exercise.name}</span>
                    <span className="ez-sub">{formatDuration(getTotalSeconds(exercise))}</span>
                  </span>
                  <button
                    type="button"
                    className="ez-mini"
                    aria-label={`${t('builder.moveUp')}: ${exercise.name}`}
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="ez-mini"
                    aria-label={`${t('builder.moveDown')}: ${exercise.name}`}
                    disabled={index === chosen.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="ez-mini"
                    aria-label={`${t('builder.remove')}: ${exercise.name}`}
                    onClick={() => remove(index)}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="ez-row">
            <Button
              icon={<Play size={18} />}
              disabled={chosen.length === 0}
              onClick={() => save(true)}
            >
              {t('builder.saveStart')}
            </Button>
            <Button
              variant="soft"
              icon={<Save size={18} />}
              disabled={chosen.length === 0}
              onClick={() => save(false)}
            >
              {t('builder.save')}
            </Button>
          </div>
          {chosen.length >= MAX_ITEMS ? <p className="ez-sub">{t('builder.max')}</p> : null}
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>{t('builder.pick')}</h2>
          <div className="ez-pick-list">
            {EXERCISES.map((exercise) => (
              <div key={exercise.id} className="ez-pick">
                <span className="ez-pick__text">
                  <span className="ez-setting__title">{exercise.name}</span>
                  <span className="ez-sub">{formatDuration(getTotalSeconds(exercise))}</span>
                </span>
                <button
                  type="button"
                  className="ez-mini"
                  aria-label={`${t('builder.add')}: ${exercise.name}`}
                  disabled={chosen.length >= MAX_ITEMS}
                  onClick={() => add(exercise.id)}
                >
                  <Plus size={18} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}