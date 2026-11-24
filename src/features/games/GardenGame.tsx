import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Flower2 } from 'lucide-react'
import type { Level } from '../../data/games'
import { useHaptics } from '../../hooks/useHaptics'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import { makeRng } from '../../utils/random'
import type { GameProps } from './shared'

const MAX_LENGTH = 10
const START_LENGTH = 2
const MAX_WILTS = 3
const TICK = 100 // milliseconds
const LEAD_IN = 800
const WIN_PAUSE = 1000
const LOSE_PAUSE = 1400
const TAP_GLOW = 450

// step: time per flower while showing. lit: how long each one glows.
const CONFIG: Record<Level, { count: number; columns: number; step: number; lit: number }> = {
  easy: { count: 4, columns: 2, step: 1000, lit: 700 },
  medium: { count: 6, columns: 3, step: 800, lit: 560 },
  hard: { count: 9, columns: 3, step: 650, lit: 450 },
}

const FLOWER_COLORS = [
  'var(--color-primary)',
  'var(--color-coral)',
  'var(--color-sage)',
  'var(--color-teal)',
  'var(--color-ocean)',
]

type Phase = 'show' | 'input' | 'win' | 'lose'

interface State {
  clock: number
  phase: Phase
  phaseStart: number
  length: number
  input: number
  wilts: number
  score: number
  glow: { index: number; until: number } | null
  over: boolean
}

const INITIAL: State = {
  clock: 0,
  phase: 'show',
  phaseStart: 0,
  length: START_LENGTH,
  input: 0,
  wilts: 0,
  score: 0,
  glow: null,
  over: false,
}

function showTimeFor(length: number, step: number): number {
  return LEAD_IN + length * step + 400
}

// Moves the game forward by one small tick
function advance(state: State, step: number): State {
  if (state.over) return state
  const clock = state.clock + TICK
  const age = clock - state.phaseStart
  const glow = state.glow && state.glow.until > clock ? state.glow : null
  const next: State = { ...state, clock, glow }

  if (state.phase === 'show' && age >= showTimeFor(state.length, step)) {
    return { ...next, phase: 'input', phaseStart: clock, input: 0 }
  }
  if (state.phase === 'win' && age >= WIN_PAUSE) {
    if (state.length >= MAX_LENGTH) return { ...next, over: true }
    return { ...next, phase: 'show', phaseStart: clock, length: state.length + 1, input: 0 }
  }
  if (state.phase === 'lose' && age >= LOSE_PAUSE) {
    if (state.wilts >= MAX_WILTS) return { ...next, over: true }
    return { ...next, phase: 'show', phaseStart: clock, input: 0 }
  }
  return next
}

const MESSAGES: Record<Phase, MessageKey> = {
  show: 'game.garden.watch',
  input: 'game.garden.turn',
  win: 'game.garden.win',
  lose: 'game.garden.lose',
}

export default function GardenGame({ level, paused, seed, onFinish }: GameProps) {
  const t = useT()
  const buzz = useHaptics()
  const config = CONFIG[level]
  const finishRef = useLatest(onFinish)
  const [state, setState] = useState<State>(INITIAL)

  // The secret order of flowers for this round
  const sequence = useMemo(() => {
    const rng = makeRng(seed)
    return Array.from({ length: MAX_LENGTH }, () => Math.floor(rng() * config.count))
  }, [seed, config.count])

  // The game clock only runs while the game is not paused
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setState((previous) => advance(previous, config.step)), TICK)
    return () => window.clearInterval(id)
  }, [paused, config.step])

  // When the garden is finished, hand the score to the game shell
  useEffect(() => {
    if (state.over) finishRef.current(state.score)
  }, [state.over, state.score, finishRef])

  // Which flower is glowing right now?
  let lit: number | null = null
  if (state.phase === 'show') {
    const age = state.clock - state.phaseStart - LEAD_IN
    if (age >= 0) {
      const slot = Math.floor(age / config.step)
      if (slot < state.length && age % config.step < config.lit) lit = sequence[slot]
    }
  } else if (state.glow) {
    lit = state.glow.index
  }

  const handleTap = (index: number) => {
    if (paused || state.phase !== 'input') return
    buzz(10)
    setState((previous) => {
      if (previous.phase !== 'input') return previous
      const glow = { index, until: previous.clock + TAP_GLOW }
      if (sequence[previous.input] !== index) {
        return {
          ...previous,
          glow,
          phase: 'lose',
          phaseStart: previous.clock,
          wilts: previous.wilts + 1,
        }
      }
      const input = previous.input + 1
      if (input >= previous.length) {
        return {
          ...previous,
          glow,
          input,
          phase: 'win',
          phaseStart: previous.clock,
          score: previous.score + previous.length * 10,
        }
      }
      return { ...previous, glow, input }
    })
  }

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.garden.round')}: <strong>{state.length}</strong>
        </span>
        <span>
          {t('game.score')}: <strong>{state.score}</strong>
        </span>
        <span>
          {t('game.garden.retries')}: <strong>{Math.max(0, MAX_WILTS - state.wilts)}</strong>
        </span>
      </div>

      <p className="ez-garden__message" aria-live="polite">
        {t(MESSAGES[state.phase])}
      </p>

      <div
        className="ez-garden"
        style={{ gridTemplateColumns: `repeat(${config.columns}, 1fr)` }}
      >
        {Array.from({ length: config.count }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`ez-flower ${lit === index ? 'is-lit' : ''}`}
            style={{ '--flower': FLOWER_COLORS[index % FLOWER_COLORS.length] } as CSSProperties}
            aria-label={`${t('game.garden.flower')} ${index + 1}`}
            onClick={() => handleTap(index)}
          >
            <Flower2 size={34} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}