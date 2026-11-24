import { Compass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, EmptyState } from '../components/ui'
import { useT } from '../i18n'

export default function NotFoundPage() {
  const t = useT()
  const navigate = useNavigate()

  return (
    <Card>
      <EmptyState
        icon={<Compass size={28} />}
        title={t('notfound.title')}
        message={t('notfound.text')}
        action={<Button onClick={() => navigate('/')}>{t('notfound.button')}</Button>}
      />
    </Card>
  )
}