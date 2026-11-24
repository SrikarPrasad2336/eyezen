import { ArrowLeft, ChevronRight, Compass, Eye, ShieldAlert, Stethoscope } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState } from '../../components/ui'
import { COMMON_URGENT, getCondition } from '../../data/conditions'
import { getExercise } from '../../data/exercises'
import { useT } from '../../i18n'
import { EXERCISE_ICONS } from '../exercises/exerciseIcons'
import '../nutrition/nutrition.css'
import '../settings/settings.css'
import { CONDITION_ICONS } from './conditionIcons'
import './conditions.css'

export default function ConditionDetailPage() {
  const t = useT()
  const navigate = useNavigate()
  const { id } = useParams()
  const condition = id ? getCondition(id) : undefined

  if (!condition) {
    return (
      <Card>
        <EmptyState
          icon={<Compass size={28} />}
          title={t('notfound.title')}
          message={t('notfound.text')}
          action={<Button onClick={() => navigate('/more/conditions')}>{t('cond.back')}</Button>}
        />
      </Card>
    )
  }

  const Icon = CONDITION_ICONS[condition.id] ?? Eye
  const urgent = [...condition.doctorUrgent, ...COMMON_URGENT]
  const exercises = condition.exercises.flatMap((exerciseId) => {
    const exercise = getExercise(exerciseId)
    return exercise ? [exercise] : []
  })

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <Link to="/more/conditions" className="ez-back">
          <ArrowLeft size={18} aria-hidden="true" /> {t('cond.back')}
        </Link>
        <div className="ez-cond-head">
          <span className="ez-cond-card__icon ez-cond-card__icon--big" aria-hidden="true">
            <Icon size={30} />
          </span>
          <div>
            <h1>{condition.name}</h1>
            <p className="ez-muted">{condition.tagline}</p>
          </div>
        </div>
      </div>

      <Card variant="tinted">
        <div className="ez-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <ShieldAlert size={22} aria-hidden="true" style={{ flex: 'none', marginTop: 2 }} />
          <p style={{ flex: 1 }}>{t('cond.disclaimer')}</p>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>{t('cond.overview')}</h2>
          <p>{condition.overview}</p>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>{t('cond.signs')}</h2>
          <ul className="ez-bullets">
            {condition.signs.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>{t('cond.care')}</h2>
          <ul className="ez-bullets">
            {condition.care.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>{t('cond.foods')}</h2>
          <ul className="ez-bullets">
            {condition.foods.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div>
            <Link to="/nutrition" className="ez-btn ez-btn--ghost ez-btn-link">
              {t('cond.nutritionLink')}
            </Link>
          </div>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>{t('cond.exercises')}</h2>
          <p className="ez-caution">
            {t('cond.exercises.note')}
            {condition.exerciseNote ? ` ${condition.exerciseNote}` : ''}
          </p>
          {exercises.length === 0 ? (
            <p className="ez-muted">{t('cond.exercises.none')}</p>
          ) : (
            <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
              {exercises.map((exercise) => {
                const ExerciseIcon = EXERCISE_ICONS[exercise.id] ?? Eye
                return (
                  <Link key={exercise.id} to={`/exercises/${exercise.id}`} className="ez-cond-ex">
                    <span className="ez-cond-ex__icon" aria-hidden="true">
                      <ExerciseIcon size={20} />
                    </span>
                    <span className="ez-cond-ex__name">{exercise.name}</span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-4)' }}>
          <div className="ez-row">
            <Stethoscope size={22} color="var(--color-primary)" aria-hidden="true" />
            <h2>{t('cond.doctor.title')}</h2>
          </div>

          {condition.doctorSoon.length > 0 ? (
            <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
              <h3>{t('cond.doctor.soon')}</h3>
              <ul className="ez-bullets">
                {condition.doctorSoon.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="ez-urgentbox">
            <h3 className="ez-urgentbox__title">{t('cond.doctor.urgent')}</h3>
            <ul className="ez-bullets">
              {urgent.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <p className="ez-sub">{t('cond.doctor.note')}</p>
        </div>
      </Card>
    </div>
  )
}