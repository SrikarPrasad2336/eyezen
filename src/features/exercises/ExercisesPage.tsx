import { ChevronRight, Clock, Eye, ListChecks, ListPlus, Sparkles, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EXERCISES, getTotalSeconds } from '../../data/exercises'
import { ROUTINES, customToRoutine, getRoutineSeconds } from '../../data/routines'
import { useT } from '../../i18n'
import { useRoutines } from '../../store/routineStore'
import { formatDuration } from '../../utils/time'
import { EXERCISE_ICONS, ROUTINE_ICONS } from './exerciseIcons'
import ReminderCard from './ReminderCard'
import './exercises.css'

export default function ExercisesPage() {
  const t = useT()
  const custom = useRoutines((state) => state.custom)
  const removeRoutine = useRoutines((state) => state.removeRoutine)

  const handleDelete = (id: string) => {
    if (window.confirm(t('ex.deleteConfirm'))) removeRoutine(id)
  }

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
        <h1>{t('nav.exercises')}</h1>
        <p className="ez-muted">{t('ex.intro')}</p>
      </div>

      <ReminderCard />

      {/* Ready-made routines */}
      <section className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <div>
          <h2>{t('ex.routines')}</h2>
          <p className="ez-sub">{t('ex.routinesHint')}</p>
        </div>
        {ROUTINES.map((routine) => {
          const Icon = ROUTINE_ICONS[routine.id] ?? Sparkles
          return (
            <Link
              key={routine.id}
              to={`/exercises/routine/${routine.id}`}
              className="ez-card ez-ex-card"
            >
              <span className="ez-ex-card__icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <span className="ez-ex-card__text">
                <span className="ez-ex-card__name">{routine.name}</span>
                <span className="ez-muted">{routine.tagline}</span>
                <span className="ez-sub ez-ex-card__time">
                  <Clock size={14} aria-hidden="true" />
                  {formatDuration(getRoutineSeconds(routine.items))} · {routine.items.length}{' '}
                  {t('ex.exercisesCount')}
                </span>
              </span>
              <ChevronRight size={20} aria-hidden="true" />
            </Link>
          )
        })}
      </section>

      {/* Your own routines */}
      <section className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <h2>{t('ex.custom')}</h2>
        {custom.map((saved) => {
          const routine = customToRoutine(saved)
          return (
            <div key={routine.id} className="ez-card ez-ex-card ez-ex-card--split">
              <Link to={`/exercises/routine/${routine.id}`} className="ez-ex-card__link">
                <span className="ez-ex-card__icon" aria-hidden="true">
                  <ListChecks size={24} />
                </span>
                <span className="ez-ex-card__text">
                  <span className="ez-ex-card__name">{routine.name}</span>
                  <span className="ez-sub ez-ex-card__time">
                    <Clock size={14} aria-hidden="true" />
                    {formatDuration(getRoutineSeconds(routine.items))} · {routine.items.length}{' '}
                    {t('ex.exercisesCount')}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                className="ez-iconbtn"
                aria-label={`${t('ex.delete')}: ${routine.name}`}
                onClick={() => handleDelete(routine.id)}
              >
                <Trash2 size={20} aria-hidden="true" />
              </button>
            </div>
          )
        })}
        <Link to="/exercises/builder" className="ez-card ez-ex-card">
          <span className="ez-ex-card__icon" aria-hidden="true">
            <ListPlus size={24} />
          </span>
          <span className="ez-ex-card__text">
            <span className="ez-ex-card__name">{t('ex.build')}</span>
            <span className="ez-muted">{t('ex.buildHint')}</span>
          </span>
          <ChevronRight size={20} aria-hidden="true" />
        </Link>
      </section>

      {/* Every exercise */}
      <section className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <h2>{t('ex.all')}</h2>
        {EXERCISES.map((exercise) => {
          const Icon = EXERCISE_ICONS[exercise.id] ?? Eye
          return (
            <Link key={exercise.id} to={`/exercises/${exercise.id}`} className="ez-card ez-ex-card">
              <span className="ez-ex-card__icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <span className="ez-ex-card__text">
                <span className="ez-ex-card__name">{exercise.name}</span>
                <span className="ez-muted">{exercise.tagline}</span>
                <span className="ez-sub ez-ex-card__time">
                  <Clock size={14} aria-hidden="true" />
                  {formatDuration(getTotalSeconds(exercise))}
                </span>
              </span>
              <ChevronRight size={20} aria-hidden="true" />
            </Link>
          )
        })}
      </section>
    </div>
  )
}