import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Cloud, Droplets, Flower2, Heart, Leaf, Moon, Star, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Level } from '../../data/games'
import { useHaptics } from '../../hooks/useHaptics'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import { makeRng, shuffled } from '../../utils/random'
import type { GameProps } from './shared'

// Each kind has its own color (set in games.css) AND its own shape
const KINDS: { name: string; icon: LucideIcon }[] = [
  { name: 'Leaf', icon: Leaf },
  { name: 'Moon', icon: Moon },
  { name: 'Sun', icon: Sun },
  { name: 'Droplet', icon: Droplets },
  { name: 'Flower', icon: Flower2 },
  { name: 'Star', icon: Star },
  { name: 'Heart', icon: Heart },
  { name: 'Cloud', icon: Cloud },
]

const PAIRS: Record<Level, number> = { easy: 4, medium: 6, hard: 8 }
const MISMATCH_MS = 900
const FINISH_MS = 900

export default function ColorsGame({ level, paused, seed, onFinish }: GameProps) {
  const t = useT()
  const buzz = useHaptics()
  const pairs = PAIRS[level]
  const finishRef = useLatest(onFinish)

  const cards = useMemo(
    () =>
      shuffled(
        Array.from({ length: pairs * 2 }, (_, index) => Math.floor(index / 2)),
        makeRng(seed),
      ),
    [pairs, seed],
  )

  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [turns, setTurns] = useState(0)

  const hideTimer = useRef<number | undefined>(undefined)
  const finishTimer = useRef<number | undefined>(undefined)

  // Clean up timers if the player leaves in the middle
  useEffect(() => {
    return () => {
      window.clearTimeout(hideTimer.current)
      window.clearTimeout(finishTimer.current)
    }
  }, [])

  const handleTap = (index: number) => {
    if (paused || flipped.length >= 2) return
    if (flipped.includes(index) || matched.includes(index)) return
    buzz(10)

    if (flipped.length === 0) {
      setFlipped([index])
      return
    }

    // This is the second card of a turn
    const first = flipped[0]
    const nextTurns = turns + 1
    setTurns(nextTurns)

    if (cards[first] === cards[index]) {
      const nextMatched = [...matched, first, index]
      setMatched(nextMatched)
      setFlipped([])
      if (nextMatched.length === cards.length) {
        // Perfect play is one turn per pair. Each extra turn costs 10 points.
        const score = Math.max(pairs * 20, pairs * 100 - (nextTurns - pairs) * 10)
        finishTimer.current = window.setTimeout(() => finishRef.current(score), FINISH_MS)
      }
    } else {
      setFlipped([first, index])
      hideTimer.current = window.setTimeout(() => setFlipped([]), MISMATCH_MS)
    }
  }

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.colors.turns')}: <strong>{turns}</strong>
        </span>
        <span>
          {t('game.colors.pairs')}:{' '}
          <strong>
            {matched.length / 2} / {pairs}
          </strong>
        </span>
      </div>

      <div className="ez-tiles" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {cards.map((kindIndex, index) => {
          const kind = KINDS[kindIndex]
          const Icon = kind.icon
          const isMatched = matched.includes(index)
          const open = isMatched || flipped.includes(index)

          return (
            <button
              key={index}
              type="button"
              className={`ez-tile ${open ? 'is-open' : ''} ${isMatched ? 'is-matched' : ''}`}
              style={{ '--tile': `var(--match-${kindIndex + 1})` } as CSSProperties}
              aria-label={open ? kind.name : `${t('game.colors.card')} ${index + 1}`}
              onClick={() => handleTap(index)}
            >
              <span className="ez-tile__inner">
                <span className="ez-tile__face ez-tile__back" />
                <span className="ez-tile__face ez-tile__front">
                  <Icon size={32} aria-hidden="true" />
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <p className="ez-sub" style={{ textAlign: 'center' }}>
        {t('game.colors.hint')}
      </p>
    </div>
  )
}