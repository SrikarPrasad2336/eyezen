import { Compass } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState } from '../../components/ui'
import { getExercise } from '../../data/exercises'
import { useT } from '../../i18n'
import ExercisePlayer from './ExercisePlayer'

export default function ExercisePlayerPage() {
  const t = useT()
  const navigate = useNavigate()
  const { id } = useParams()
  const exercise = id ? getExercise(id) : undefined

  if (!exercise) {
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

  return <ExercisePlayer exercise={exercise} onLeave={() => navigate('/exercises')} />
}