import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '../../components/ui'
import type { Exercise } from '../../data/exercises'
import { useT } from '../../i18n'
import ExercisePlayer from './ExercisePlayer'
import PlayerShell from './PlayerShell'

interface RoutinePlayerProps {
  name: string
  exercises: Exercise[]
  onLeave: () => void
}

// Plays exercises one after another, then shows a calm "routine complete" screen.
export function RoutinePlayer({ name, exercises, onLeave }: RoutinePlayerProps) {
  const t = useT()
  const [index, setIndex] = useState(0)
  const [complete, setComplete] = useState(false)

  if (complete) {
    return (
      <PlayerShell title={name} onLeave={onLeave}>
        <div className="ez-player__body">
          <div className="ez-done__orb" aria-hidden="true">
            <Check size={56} />
          </div>
          <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
            <h1>{t('ex.routineDone.title')}</h1>
            <p className="ez-cue-text">{t('ex.routineDone.text')}</p>
          </div>
        </div>
        <div className="ez-player__controls">
          <Button size="lg" onClick={onLeave}>
            {t('ex.back')}
          </Button>
        </div>
      </PlayerShell>
    )
  }

  const exercise = exercises[index]
  const next = exercises[index + 1]

  const handleNext = () => {
    if (index + 1 >= exercises.length) setComplete(true)
    else setIndex(index + 1)
  }

  return (
    <ExercisePlayer
      key={index}
      exercise={exercise}
      onLeave={onLeave}
      onNext={handleNext}
      routine={{
        name,
        position: index + 1,
        count: exercises.length,
        nextName: next?.name,
      }}
    />
  )
}

export default RoutinePlayer