import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import { Anchor, Bell, Check, Cherry, Feather, Gem, Key, Shell, Umbrella } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Level } from '../../data/games'
import { useHaptics } from '../../hooks/useHaptics'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import { makeRng, shuffled } from '../../utils/random'
import type { GameProps } from './shared'

const TREASURES: { name: string; icon: LucideIcon }[] = [
  { name: 'Gem', icon: Gem },
  { name: 'Key', icon: Key },
  { name: 'Feather', icon: Feather },
  { name: 'Shell', icon: Shell },
  { name: 'Bell', icon: Bell },
  { name: 'Cherry', icon: Cherry },
  { name: 'Anchor', icon: Anchor },
  { name: 'Umbrella', icon: Umbrella },
]

// count: treasures hidden. size: in rem. opacity: how faint (lower is harder).
// gap: how far apart they hide (percent of the scene).
const CONFIG: Record<Level, { count: number; size: number; opacity: number; gap: number }> = {
  easy: { count: 4, size: 3.5, opacity: 0.9, gap: 24 },
  medium: { count: 6, size: 3, opacity: 0.7, gap: 19 },
  hard: { count: 8, size: 2.75, opacity: 0.55, gap: 16 },
}

const BONUS_SECONDS = 180 // the calm-pace bonus fades slowly over 3 minutes
const HINT_MS = 3500
const RIPPLE_MS = 600
const FINISH_MS = 900

const TREES = [
  { x: 14, y: 50, scale: 1 },
  { x: 84, y: 44, scale: 1.2 },
  { x: 60, y: 38, scale: 0.8 },
]
const DECOR_COLORS = ['var(--color-coral)', 'var(--color-teal)', 'var(--color-cream)']

function placeTreasures(count: number, gap: number, rng: () => number) {
  const spots: { x: number; y: number }[] = []
  let tries = 0
  while (spots.length < count) {
    tries += 1
    const x = 10 + rng() * 80
    const y = 10 + rng() * 80
    const roomy = spots.every((spot) => Math.hypot(spot.x - x, spot.y - y) >= gap)
    // After many tries we accept any spot, so the game can never get stuck
    if (roomy || tries > 400) spots.push({ x, y })
  }
  return spots
}

export default function HiddenGame({ level, paused, seed, onFinish }: GameProps) {
  const t = useT()
  const buzz = useHaptics()
  const config = CONFIG[level]
  const finishRef = useLatest(onFinish)

  const scene = useMemo(() => {
    const rng = makeRng(seed)
    const decor = Array.from({ length: 26 }, (_, index) => ({
      x: 4 + rng() * 92,
      y: 34 + rng() * 62,
      r: 0.8 + rng() * 1.1,
      color: DECOR_COLORS[index % DECOR_COLORS.length],
    }))
    const kinds = shuffled(TREASURES, rng).slice(0, config.count)
    const spots = placeTreasures(config.count, config.gap, rng)
    const items = kinds.map((kind, index) => ({ id: index, kind, ...spots[index] }))
    return { decor, items }
  }, [seed, config.count, config.gap])

  const [found, setFound] = useState<number[]>([])
  const [elapsed, setElapsed] = useState(0)
  const [hintId, setHintId] = useState<number | null>(null)
  const [ripple, setRipple] = useState<{ id: number; x: number; y: number } | null>(null)

  const elapsedRef = useLatest(elapsed)
  const hintTimer = useRef<number | undefined>(undefined)
  const rippleTimer = useRef<number | undefined>(undefined)

  const allFound = found.length === scene.items.length

  // The clock only runs while the game is not paused
  useEffect(() => {
    if (paused || allFound) return
    const id = window.setInterval(() => setElapsed((value) => value + 0.1), 100)
    return () => window.clearInterval(id)
  }, [paused, allFound])

  // When everything is found, wait a moment, then finish
  useEffect(() => {
    if (!allFound) return
    const id = window.setTimeout(() => {
      const count = scene.items.length
      const calm = Math.max(0, 1 - elapsedRef.current / BONUS_SECONDS)
      finishRef.current(count * 100 + Math.round(calm * 50 * count))
    }, FINISH_MS)
    return () => window.clearTimeout(id)
  }, [allFound, scene.items.length, elapsedRef, finishRef])

  // Clean up timers if the player leaves in the middle
  useEffect(() => {
    return () => {
      window.clearTimeout(hintTimer.current)
      window.clearTimeout(rippleTimer.current)
    }
  }, [])

  const findTreasure = (id: number) => {
    if (paused || found.includes(id)) return
    buzz(15)
    setFound((list) => [...list, id])
    setHintId((current) => (current === id ? null : current))
  }

  const handleSceneTap = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (paused) return
    const rect = event.currentTarget.getBoundingClientRect()
    setRipple({
      id: Date.now(),
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
    window.clearTimeout(rippleTimer.current)
    rippleTimer.current = window.setTimeout(() => setRipple(null), RIPPLE_MS)
  }

  const giveHint = () => {
    if (paused) return
    const target = scene.items.find((item) => !found.includes(item.id))
    if (!target) return
    setHintId(target.id)
    window.clearTimeout(hintTimer.current)
    hintTimer.current = window.setTimeout(() => setHintId(null), HINT_MS)
  }

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.hidden.found')}:{' '}
          <strong>
            {found.length} / {scene.items.length}
          </strong>
        </span>
        <span>
          {t('game.time')}: <strong>{Math.floor(elapsed)} s</strong>
        </span>
      </div>

      <ul className="ez-tofind" aria-label={t('game.hidden.tofind')}>
        {scene.items.map((item) => {
          const Icon = item.kind.icon
          const done = found.includes(item.id)
          return (
            <li
              key={item.id}
              className={`ez-tofind__item ${done ? 'is-done' : ''}`}
              title={item.kind.name}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="ez-visually-hidden">
                {item.kind.name}
                {done ? ` (${t('game.hidden.found')})` : ''}
              </span>
            </li>
          )
        })}
      </ul>

      <div
        className="ez-scene"
        role="group"
        aria-label={t('game.hidden.scene')}
        onClick={handleSceneTap}
      >
        <svg
          className="ez-scene__art"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 62 C20 44 40 46 60 58 S90 66 100 52 V100 H0 Z"
            fill="var(--color-sage-soft)"
          />
          <path
            d="M0 78 C25 64 50 70 70 78 S92 84 100 74 V100 H0 Z"
            fill="var(--color-sage)"
            opacity="0.45"
          />
          <ellipse cx="46" cy="87" rx="16" ry="5" fill="var(--color-teal-soft)" />
          {TREES.map((tree) => (
            <g key={tree.x} transform={`translate(${tree.x} ${tree.y}) scale(${tree.scale})`}>
              <rect x="-1.2" y="0" width="2.4" height="9" rx="1" fill="var(--color-ocean)" opacity="0.6" />
              <circle cx="0" cy="-3" r="7" fill="var(--color-sage)" opacity="0.8" />
              <circle cx="-4" cy="1" r="4.5" fill="var(--color-sage)" opacity="0.65" />
              <circle cx="4" cy="1" r="4.5" fill="var(--color-sage)" opacity="0.65" />
            </g>
          ))}
          {scene.decor.map((dot, index) => (
            <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.color} opacity="0.55" />
          ))}
        </svg>

        {scene.items.map((item) => {
          const Icon = item.kind.icon
          const done = found.includes(item.id)
          return (
            <button
              key={item.id}
              type="button"
              className={`ez-treasure ${done ? 'is-found' : ''} ${hintId === item.id ? 'is-hint' : ''}`}
              style={
                {
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: `${config.size}rem`,
                  height: `${config.size}rem`,
                  '--faint': config.opacity,
                  '--treasure': `var(--match-${(item.id % 8) + 1})`,
                } as CSSProperties
              }
              aria-label={item.kind.name}
              disabled={done}
              onClick={(event) => {
                event.stopPropagation()
                findTreasure(item.id)
              }}
            >
              {done ? <Check size={22} aria-hidden="true" /> : <Icon size={22} aria-hidden="true" />}
            </button>
          )
        })}

        {ripple ? (
          <span
            key={ripple.id}
            className="ez-pop"
            style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className="ez-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="ez-chip" onClick={giveHint} disabled={allFound}>
          {t('game.hidden.hintButton')}
        </button>
      </div>

      <p className="ez-sub" style={{ textAlign: 'center' }}>
        {t('game.hidden.hint')}
      </p>
    </div>
  )
}