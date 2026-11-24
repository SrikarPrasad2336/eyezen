import { Compass } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState } from '../../components/ui'
import { findRoutine, resolveItems } from '../../data/routines'
import { useT } from '../../i18n'
import { useRoutines } from '../../store/routineStore'
import { RoutinePlayer } from './RoutinePlayer'

    
export default function RoutinePlayerPage() {
  const t = useT()
  const navigate = useNavigate()
  const { routineId } = useParams()
  const custom = useRoutines((state) => state.custom)

  const routine = findRoutine(routineId, custom)
  const exercises = routine ? resolveItems(routine.items) : []

  if (!routine || exercises.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<Compass size={28} />}
          title={t('notfound.title')}
          message={t('notfound.text')}
          action={<Button onClick={() => navigate('/exercises')}>{t('ex.back')}</Button>}
        />
      </Card>
    )
  }

  return (
    <RoutinePlayer
      name={routine.name}
      exercises={exercises}
      onLeave={() => navigate('/exercises')}
    />
  )
}