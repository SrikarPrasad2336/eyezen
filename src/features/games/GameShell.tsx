import { useCallback, useEffect, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { Pause, Play, RotateCcw, ShieldAlert, Timer, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui'
import { GAME_SAFETY, LEVELS } from '../../data/games'
import type { GameDef, Level } from '../../data/games'
import { useHaptics } from '../../hooks/useHaptics'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSound } from '../../hooks/useSound'
import { useT } from '../../i18n'
import { BREAK_AFTER_SECONDS, bestKey, useGames } from '../../store/gameStore'
import PlayerShell from '../exercises/PlayerShell'
import { LEVEL_KEYS } from './shared'
import type { GameProps } from './shared'
import './games.css'

type Phase = 'ready' | 'playing' | 'result'

interface BreakNoticeProps {
  onTake: () => void
  onKeep: () => void
}

function BreakNotice({ onTake, onKeep }: BreakNoticeProps) {
  const t = useT()
  return (
    <div className="ez-breaknote" role="alert">
      <span className="ez-breaknote__icon" aria-hidden="true">
        <Timer size={24} />
      </span>
      <h2>{t('game.break.title')}</h2>
      <p className="ez-muted">{t('game.break.text')}</p>
      <div className="ez-row" style={{ justifyContent: 'center' }}>
        <Button onClick={onTake}>{t('game.break.take')}</Button>
        <Button variant="ghost" onClick={onKeep}>
          {t('game.break.keep')}
        </Button>
      </div>
    </div>
  )
}

interface GameShellProps {
  def: GameDef
  Game: ComponentType<GameProps>
  onLeave: () => void
}

export default function GameShell({ def, Game, onLeave }: GameShellProps) {
  const t = useT()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const buzz = useHaptics()
  const { prepare, chime } = useSound()

  const bests = useGames((state) => state.bests)
  const recordResult = useGames((state) => state.recordResult)
  const playSeconds = useGames((state) => state.playSeconds)
  const addPlaySecond = useGames((state) => state.addPlaySecond)
  const resetPlayTime = useGames((state) => state.resetPlayTime)

  const [phase, setPhase] = useState<Phase>('ready')
  const [level, setLevel] = useState<Level>('easy')
  const [round, setRound] = useState(0)
  const [seed, setSeed] = useState(1)
  const [userPaused, setUserPaused] = useState(false)
  const [result, setResult] = useState({ score: 0, newBest: false })

  const breakDue = playSeconds >= BREAK_AFTER_SECONDS
  const paused = userPaused || breakDue
  const best = bests[bestKey(def.id, level)] ?? 0

  // Count the seconds you are actually playing
  const counting = phase === 'playing' && !paused
  useEffect(() => {
    if (!counting) return
    const id = window.setInterval(addPlaySecond, 1000)
    return () => window.clearInterval(id)
  }, [counting, addPlaySecond])

  // Auto-pause when you switch to another tab or app
  useEffect(() => {
    const onHide = () => {
      if (document.hidden) setUserPaused(true)
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [])

  const start = () => {
    prepare()
    setSeed(Math.floor(Math.random() * 2147483646) + 1)
    setRound((value) => value + 1)
    setUserPaused(false)
    setPhase('playing')
  }

  const handleFinish = useCallback(
    (score: number) => {
      const newBest = recordResult(def.id, level, score)
      setResult({ score, newBest })
      setPhase('result')
      chime()
      buzz([40, 80, 40])
    },
    [recordResult, def.id, level, chime, buzz],
  )

  const handleTakeBreak = () => {
    resetPlayTime()
    navigate('/exercises/twenty-20-20')
  }

  const levelPicker = (
    <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
      <h2>{t('game.level')}</h2>
      <div className="ez-row" role="group" aria-label={t('game.level')}>
        {LEVELS.map((item) => (
          <button
            key={item}
            type="button"
            className="ez-chip"
            aria-pressed={level === item}
            onClick={() => setLevel(item)}
          >
            {t(LEVEL_KEYS[item])}
          </button>
        ))}
      </div>
      <p className="ez-sub">
        {t('game.best')}: <strong>{best > 0 ? best : '–'}</strong>
      </p>
    </div>
  )

  let content: ReactNode
  if (phase === 'ready') {
    content = (
      <>
        <div className="ez-player__body">
          <div className="ez-stack ez-player__intro">
            <p className="ez-cue-text">{def.tagline}</p>
            <h2>{t('ex.howTo')}</h2>
            <ol className="ez-howto">
              {def.howTo.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <p className="ez-sub">{def.scoreHint}</p>
            {levelPicker}
            <div className="ez-safety">
              <ShieldAlert size={22} aria-hidden="true" />
              <p>{GAME_SAFETY}</p>
            </div>
            {breakDue ? <BreakNotice onTake={handleTakeBreak} onKeep={resetPlayTime} /> : null}
          </div>
        </div>
        <div className="ez-player__controls">
          <Button size="lg" icon={<Play size={20} />} onClick={start}>
            {t('game.play')}
          </Button>
        </div>
      </>
    )
  } else if (phase === 'playing') {
    content = (
      <>
        <div className="ez-player__body">
          <div className="ez-game__stage">
            <Game
              key={round}
              level={level}
              seed={seed}
              paused={paused}
              reduced={reduced}
              onFinish={handleFinish}
            />
            {paused ? (
              <div className="ez-game__overlay">
                {breakDue ? (
                  <BreakNotice onTake={handleTakeBreak} onKeep={resetPlayTime} />
                ) : (
                  <div
                    className="ez-stack"
                    style={{ gap: 'var(--space-3)', justifyItems: 'center', textAlign: 'center' }}
                  >
                    <h2>{t('game.paused')}</h2>
                    <Button size="lg" icon={<Play size={20} />} onClick={() => setUserPaused(false)}>
                      {t('game.resume')}
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
        {breakDue ? null : (
          <div className="ez-player__controls">
            <Button
              variant={userPaused ? 'primary' : 'soft'}
              size="lg"
              icon={userPaused ? <Play size={20} /> : <Pause size={20} />}
              onClick={() => setUserPaused((value) => !value)}
            >
              {userPaused ? t('game.resume') : t('game.pause')}
            </Button>
          </div>
        )}
      </>
    )
  } else {
    content = (
      <>
        <div className="ez-player__body">
          <div className="ez-done__orb" aria-hidden="true">
            <Trophy size={52} />
          </div>
          <div className="ez-stack" style={{ gap: 'var(--space-3)', justifyItems: 'center' }}>
            <h1>{t('game.result.title')}</h1>
            <p className="ez-bignum">{result.score}</p>
            {result.newBest ? <span className="ez-pill">{t('game.newBest')}</span> : null}
            <p className="ez-sub">
              {t('game.result.best')}: <strong>{best > 0 ? best : '–'}</strong>
            </p>
          </div>
          {breakDue ? <BreakNotice onTake={handleTakeBreak} onKeep={resetPlayTime} /> : null}
        </div>
        <div className="ez-player__controls">
          <Button variant="soft" icon={<RotateCcw size={18} />} onClick={start}>
            {t('game.again')}
          </Button>
          <Button variant="ghost" onClick={() => setPhase('ready')}>
            {t('game.changeLevel')}
          </Button>
          <Button size="lg" onClick={onLeave}>
            {t('game.back')}
          </Button>
        </div>
      </>
    )
  }

  return (
    <PlayerShell
      title={def.name}
      subtitle={phase === 'ready' ? undefined : t(LEVEL_KEYS[level])}
      onLeave={onLeave}
    >
      {content}
    </PlayerShell>
  )
}