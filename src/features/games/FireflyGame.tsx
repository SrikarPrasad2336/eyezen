import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { Level } from '../../data/games'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import type { GameProps } from './shared'

const DURATION = 30 // seconds

// speed: how fast it drifts. radius: how close you must stay (percent of the play area)
const CONFIG: Record<Level, { speed: number; radius: number }> = {
  easy: { speed: 0.55, radius: 17 },
  medium: { speed: 0.78, radius: 13 },
  hard: { speed: 0.95, radius: 10 },
}

// A smooth, looping path (percent of the play area)
function fireflyAt(p: number) {
  return {
    x: 50 + 36 * Math.sin(p * 0.9 + 0.5) + 6 * Math.sin(p * 2.3),
    y: 50 + 32 * Math.sin(p * 0.7) + 6 * Math.cos(p * 1.9),
  }
}

const START = fireflyAt(0)

export default function FireflyGame({ level, paused, reduced, onFinish }: GameProps) {
  const t = useT()
  const config = CONFIG[level]
  const speed = config.speed * (reduced ? 0.6 : 1)
  const radius = config.radius

  const flyRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<{ x: number; y: number } | null>(null)
  const pathRef = useRef(0)
  const timeRef = useRef(0)
  const followedRef = useRef(0)
  const finishRef = useLatest(onFinish)

  const [hud, setHud] = useState({ left: DURATION, score: 0, near: false })

  useEffect(() => {
    if (paused) return
    let frame = 0
    let last = performance.now()
    let sinceHud = 0

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      timeRef.current += dt
      pathRef.current += dt * speed

      const fly = fireflyAt(pathRef.current)
      const element = flyRef.current
      if (element) {
        element.style.left = `${fly.x}%`
        element.style.top = `${fly.y}%`
      }

      const pointer = pointerRef.current
      const near =
        pointer !== null && Math.hypot(pointer.x - fly.x, pointer.y - fly.y) < radius
      if (near) followedRef.current += dt

      sinceHud += dt
      if (sinceHud >= 0.2) {
        sinceHud = 0
        setHud({
          left: Math.max(0, DURATION - timeRef.current),
          score: Math.round(followedRef.current * 10),
          near,
        })
      }

      if (timeRef.current >= DURATION) {
        finishRef.current(Math.round(followedRef.current * 10))
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [paused, speed, radius, finishRef])

  const setPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    }
  }

  const clearPointer = () => {
    pointerRef.current = null
  }

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.time')}: <strong>{Math.ceil(hud.left)} s</strong>
        </span>
        <span>
          {t('game.score')}: <strong>{hud.score}</strong>
        </span>
      </div>

      <div
        className="ez-fly-area"
        onPointerDown={setPointer}
        onPointerMove={setPointer}
        onPointerLeave={clearPointer}
        onPointerCancel={clearPointer}
        onPointerUp={(event) => {
          if (event.pointerType !== 'mouse') clearPointer()
        }}
      >
        <div
          ref={flyRef}
          className={`ez-fly ${hud.near ? 'is-near' : ''}`}
          style={{ left: `${START.x}%`, top: `${START.y}%`, width: `${radius * 2}%` }}
        >
          <span className="ez-fly__zone" />
          <span className="ez-fly__core" />
        </div>
      </div>

      <p className="ez-sub">{t('game.firefly.hint')}</p>
      {reduced ? <p className="ez-sub">{t('game.firefly.slow')}</p> : null}
    </div>
  )
}