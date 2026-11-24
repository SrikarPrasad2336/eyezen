import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'
import type { Level } from '../../data/games'
import { useHaptics } from '../../hooks/useHaptics'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import { makeRng } from '../../utils/random'
import type { GameProps } from './shared'

const DURATION = 60000 // milliseconds
const TICK = 60
const REMIND_EVERY = 12000
const REMIND_SHOW = 3000
const POP_MS = 500

// rise: time to float to the top. gap: time between bubbles. size: in rem.
const CONFIG: Record<Level, { rise: number; gap: number; size: number }> = {
  easy: { rise: 10000, gap: 1500, size: 4.5 },
  medium: { rise: 7500, gap: 1100, size: 3.75 },
  hard: { rise: 5500, gap: 850, size: 3 },
}

interface BubbleData {
  id: number
  x: number
  born: number
}

interface PopData {
  id: number
  x: number
  y: number
  born: number
}

interface World {
  clock: number
  nextId: number
  nextSpawn: number
  bubbles: BubbleData[]
  pops: PopData[]
  popped: number
}

interface ViewBubble {
  id: number
  x: number
  y: number
}

interface View {
  bubbles: ViewBubble[]
  pops: { id: number; x: number; y: number }[]
  popped: number
  left: number
  remind: boolean
}

export default function BubblesGame({ level, paused, reduced, seed, onFinish }: GameProps) {
  const t = useT()
  const buzz = useHaptics()
  const base = CONFIG[level]
  const rise = base.rise * (reduced ? 1.4 : 1)
  const finishRef = useLatest(onFinish)
  const [rng] = useState(() => makeRng(seed))

  const worldRef = useRef<World>({
    clock: 0,
    nextId: 1,
    nextSpawn: 600,
    bubbles: [],
    pops: [],
    popped: 0,
  })
  const [view, setView] = useState<View>({
    bubbles: [],
    pops: [],
    popped: 0,
    left: DURATION,
    remind: false,
  })

  useEffect(() => {
    if (paused) return
    const world = worldRef.current

    const timer = window.setInterval(() => {
      world.clock += TICK
      const clock = world.clock

      world.bubbles = world.bubbles.filter((bubble) => clock - bubble.born < rise)
      world.pops = world.pops.filter((pop) => clock - pop.born < POP_MS)

      if (clock >= world.nextSpawn && clock < DURATION - 2000) {
        world.bubbles.push({ id: world.nextId, x: 10 + rng() * 80, born: clock })
        world.nextId += 1
        world.nextSpawn = clock + base.gap * (0.7 + rng() * 0.6)
      }

      if (clock >= DURATION) {
        window.clearInterval(timer)
        finishRef.current(world.popped * 10)
        return
      }

      setView({
        left: DURATION - clock,
        popped: world.popped,
        remind: clock % REMIND_EVERY >= REMIND_EVERY - REMIND_SHOW,
        pops: world.pops.map((pop) => ({ id: pop.id, x: pop.x, y: pop.y })),
        bubbles: world.bubbles.map((bubble) => {
          const age = clock - bubble.born
          const sway = reduced ? 0 : 3 * Math.sin(age / 800 + bubble.id)
          return {
            id: bubble.id,
            x: bubble.x + sway,
            y: 105 - (age / rise) * 125,
          }
        }),
      })
    }, TICK)

    return () => window.clearInterval(timer)
  }, [paused, rise, base.gap, reduced, rng, finishRef])

  const pop = (bubble: ViewBubble) => {
    if (paused) return
    const world = worldRef.current
    if (!world.bubbles.some((item) => item.id === bubble.id)) return
    world.bubbles = world.bubbles.filter((item) => item.id !== bubble.id)
    world.pops.push({ id: bubble.id, x: bubble.x, y: bubble.y, born: world.clock })
    world.popped += 1
    const popped = world.popped
    buzz(10)
    setView((previous) => ({
      ...previous,
      popped,
      bubbles: previous.bubbles.filter((item) => item.id !== bubble.id),
      pops: [...previous.pops, { id: bubble.id, x: bubble.x, y: bubble.y }],
    }))
  }

  const size = `${base.size}rem`

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.time')}: <strong>{Math.ceil(view.left / 1000)} s</strong>
        </span>
        <span>
          {t('game.bubbles.popped')}: <strong>{view.popped}</strong>
        </span>
      </div>

      <div className="ez-bubblearea">
        {view.pops.map((item) => (
          <span
            key={`pop-${item.id}`}
            className="ez-pop"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            aria-hidden="true"
          />
        ))}
        {view.bubbles.map((bubble) => (
          <button
            key={bubble.id}
            type="button"
            className="ez-bubble"
            style={{ left: `${bubble.x}%`, top: `${bubble.y}%`, width: size, height: size }}
            aria-label={t('game.bubbles.bubble')}
            onClick={() => pop(bubble)}
          />
        ))}
        {view.remind ? (
          <div className="ez-blinknote" role="status">
            <Eye size={20} aria-hidden="true" /> {t('game.bubbles.blink')}
          </div>
        ) : null}
      </div>

      <p className="ez-sub" style={{ textAlign: 'center' }}>
        {t('game.bubbles.hint')}
      </p>
      {reduced ? <p className="ez-sub">{t('game.bubbles.slow')}</p> : null}
    </div>
  )
}