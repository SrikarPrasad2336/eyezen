import { Compass } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState } from '../../components/ui'
import { getGameDef } from '../../data/games'
import { useT } from '../../i18n'
import GameShell from './GameShell'
import { GAME_COMPONENTS } from './registry'

export default function GamePlayerPage() {
  const t = useT()
  const navigate = useNavigate()
  const { gameId } = useParams()

  const def = gameId ? getGameDef(gameId) : undefined
  const Game = gameId ? GAME_COMPONENTS[gameId] : undefined

  if (!def || !Game) {
    return (
      <Card>
        <EmptyState
          icon={<Compass size={28} />}
          title={t('notfound.title')}
          message={t('notfound.text')}
          action={<Button onClick={() => navigate('/games')}>{t('game.back')}</Button>}
        />
      </Card>
    )
  }

  return <GameShell def={def} Game={Game} onLeave={() => navigate('/games')} />
}