import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'
import type { Level } from '../../data/games'
import { useHaptics } from '../../hooks/useHaptics'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import { makeRng } from '../../utils/random'
import type { GameProps } from './shared'

const DURATION = 45000 // milliseconds
const TICK = 100
const FIRST_STAR = 1500
const FADE = 700

// life: how long a star stays. gap: time between stars.
// max: stars at once. near/far: how far from the center (percent).
const CONFIG: Record<
  Level,
  { life: number; gap: number; max: number; near: number; far: number }
> = {
  easy: { life: 4500, gap: 2600, max: 1, near: 24, far: 38 },
  medium: { life: 3500, gap: 1900, max: 2, near: 28, far: 41 },
  hard: { life: 2600, gap: 1500, max: 2, near: 32, far: 43 },
}

interface StarData {
  id: number
  x: number
  y: number
  born: number
}

interface World {
  clock: number
  nextId: number
  nextSpawn: number
  stars: StarData[]
  caught: number
}

interface ViewStar {
  id: number
  x: number
  y: number
  opacity: number
}

interface View {
  stars: ViewStar[]
  caught: number
  left: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export default function PeripheralGame({ level, paused, seed, onFinish }: GameProps) {
  const t = useT()
  const buzz = useHaptics()
  const config = CONFIG[level]
  const finishRef = useLatest(onFinish)
  const [rng] = useState(() => makeRng(seed))

  const worldRef = useRef<World>({
    clock: 0,
    nextId: 1,
    nextSpawn: FIRST_STAR,
    stars: [],
    caught: 0,
  })
  const [view, setView] = useState<View>({ stars: [], caught: 0, left: DURATION })

  useEffect(() => {
    if (paused) return
    const world = worldRef.current

    const timer = window.setInterval(() => {
      world.clock += TICK
      const clock = world.clock

      // Stars that stayed too long quietly fade away
      world.stars = world.stars.filter((star) => clock - star.born < config.life)

      // A new star appears near the edge
      if (
        clock >= world.nextSpawn &&
        world.stars.length < config.max &&
        clock < DURATION - FADE * 2
      ) {
        const angle = rng() * Math.PI * 2
        const distance = config.near + rng() * (config.far - config.near)
        world.stars.push({
          id: world.nextId,
          x: clamp(50 + Math.cos(angle) * distance, 8, 92),
          y: clamp(50 + Math.sin(angle) * distance, 8, 92),
          born: clock,
        })
        world.nextId += 1
        world.nextSpawn = clock + config.gap * (0.7 + rng() * 0.6)
      }

      if (clock >= DURATION) {
        window.clearInterval(timer)
        finishRef.current(world.caught * 10)
        return
      }

      setView({
        left: DURATION - clock,
        caught: world.caught,
        stars: world.stars.map((star) => {
          const age = clock - star.born
          const opacity = clamp(Math.min(age / FADE, (config.life - age) / FADE), 0, 1)
          return { id: star.id, x: star.x, y: star.y, opacity }
        }),
      })
    }, TICK)

    return () => window.clearInterval(timer)
  }, [paused, config, rng, finishRef])

  const catchStar = (starId: number) => {
    if (paused) return
    const world = worldRef.current
    if (!world.stars.some((star) => star.id === starId)) return
    world.stars = world.stars.filter((star) => star.id !== starId)
    world.caught += 1
    const caught = world.caught
    buzz(10)
    setView((previous) => ({
      ...previous,
      caught,
      stars: previous.stars.filter((star) => star.id !== starId),
    }))
  }

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.time')}: <strong>{Math.ceil(view.left / 1000)} s</strong>
        </span>
        <span>
          {t('game.peripheral.caught')}: <strong>{view.caught}</strong>
        </span>
      </div>

      <div className="ez-sky">
        <span className="ez-sky__center" aria-hidden="true" />
        {view.stars.map((star) => (
          <button
            key={star.id}
            type="button"
            className="ez-skystar"
            style={{ left: `${star.x}%`, top: `${star.y}%`, opacity: star.opacity }}
            aria-label={t('game.peripheral.star')}
            onClick={() => catchStar(star.id)}
          >
            <Star size={26} fill="currentColor" aria-hidden="true" />
          </button>
        ))}
      </div>

      <p className="ez-sub" style={{ textAlign: 'center' }}>
        {t('game.peripheral.hint')}
      </p>
    </div>
  )
}