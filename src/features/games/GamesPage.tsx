import { ChevronRight, Gamepad2, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'
import { GAME_DEFS, LEVELS } from '../../data/games'
import { useT } from '../../i18n'
import { bestKey, useGames } from '../../store/gameStore'
import { GAME_ICONS } from './gameIcons'
import { GAME_COMPONENTS } from './registry'
import { LEVEL_KEYS } from './shared'
import './games.css'

export default function GamesPage() {
  const t = useT()
  const bests = useGames((state) => state.bests)

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
        <h1>{t('nav.games')}</h1>
        <p className="ez-muted">{t('game.intro')}</p>
      </div>

      <Card variant="tinted">
        <div className="ez-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <ShieldAlert size={22} aria-hidden="true" style={{ flex: 'none', marginTop: 2 }} />
          <p style={{ flex: 1 }}>{t('game.safety')}</p>
        </div>
      </Card>

      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        {GAME_DEFS.map((def) => {
          const Icon = GAME_ICONS[def.id] ?? Gamepad2
          const ready = def.id in GAME_COMPONENTS
          const bestText = LEVELS.map(
            (level) => `${t(LEVEL_KEYS[level])} ${bests[bestKey(def.id, level)] ?? '–'}`,
          ).join(' · ')

          const body = (
            <>
              <span className="ez-game-card__icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <span className="ez-game-card__text">
                <span className="ez-game-card__name">{def.name}</span>
                <span className="ez-muted">{def.tagline}</span>
                {ready ? (
                  <span className="ez-sub">
                    {t('game.best')}: {bestText}
                  </span>
                ) : null}
              </span>
              {ready ? (
                <ChevronRight size={20} aria-hidden="true" />
              ) : (
                <span className="ez-pill">{t('game.soon')}</span>
              )}
            </>
          )

          return ready ? (
            <Link key={def.id} to={`/games/${def.id}`} className="ez-card ez-game-card">
              {body}
            </Link>
          ) : (
            <div key={def.id} className="ez-card ez-game-card ez-game-card--soon">
              {body}
            </div>
          )
        })}
      </div>
    </div>
  )
}