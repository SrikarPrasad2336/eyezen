import { useEffect, useMemo, useState } from 'react'
import type { Level } from '../../data/games'
import { useHaptics } from '../../hooks/useHaptics'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import { makeRng, shuffled } from '../../utils/random'
import type { GameProps } from './shared'

const SIZES: Record<Level, number> = { easy: 3, medium: 4, hard: 5 }

export default function SchulteGame({ level, paused, seed, onFinish }: GameProps) {
  const t = useT()
  const buzz = useHaptics()
  const size = SIZES[level]
  const total = size * size
  const finishRef = useLatest(onFinish)

  const numbers = useMemo(
    () =>
      shuffled(
        Array.from({ length: total }, (_, index) => index + 1),
        makeRng(seed),
      ),
    [total, seed],
  )

  const [next, setNext] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [elapsed, setElapsed] = useState(0) // seconds
  const [wrong, setWrong] = useState<number | null>(null)

  // The clock only runs while the game is not paused
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setElapsed((value) => value + 0.1), 100)
    return () => window.clearInterval(id)
  }, [paused])

  const handleTap = (value: number) => {
    if (paused || value < next) return
    if (value === next) {
      buzz(10)
      if (value === total) {
        // Items found per second, with a small cost for each slip
        const seconds = Math.max(1, elapsed + mistakes * 0.5)
        finishRef.current(Math.max(10, Math.round((total / seconds) * 100)))
      } else {
        setNext(value + 1)
      }
    } else {
      setMistakes((count) => count + 1)
      setWrong(value)
      window.setTimeout(() => setWrong(null), 500)
    }
  }

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.schulte.find')}: <strong className="ez-hud__big">{next}</strong>
        </span>
        <span>
          {t('game.time')}: <strong>{elapsed.toFixed(1)} s</strong>
        </span>
        <span>
          {t('game.schulte.mistakes')}: <strong>{mistakes}</strong>
        </span>
      </div>

      <div
        className="ez-schulte"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        role="group"
        aria-label={t('game.schulte.find')}
      >
        {numbers.map((value) => (
          <button
            key={value}
            type="button"
            className={`ez-cell ${value < next ? 'is-done' : ''} ${wrong === value ? 'is-wrong' : ''}`}
            onClick={() => handleTap(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <p className="ez-sub">{t('game.schulte.hint')}</p>
    </div>
  )
}