import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import type { Level } from '../../data/games'
import { useLatest } from '../../hooks/useLatest'
import { useT } from '../../i18n'
import { makeRng, shuffled } from '../../utils/random'
import type { GameProps } from './shared'

const SIZES: Record<Level, number> = { easy: 6, medium: 8, hard: 10 }
const MULTIPLIER: Record<Level, number> = { easy: 1, medium: 1.5, hard: 2 }
const FINISH_MS = 800
const CELL = 10 // size of one cell inside the drawing

// Each cell remembers which of its four walls are still standing
const NORTH = 1
const EAST = 2
const SOUTH = 4
const WEST = 8

const DIRS = [
  { bit: NORTH, opposite: SOUTH, dr: -1, dc: 0 }, // 0: up
  { bit: EAST, opposite: WEST, dr: 0, dc: 1 }, // 1: right
  { bit: SOUTH, opposite: NORTH, dr: 1, dc: 0 }, // 2: down
  { bit: WEST, opposite: EAST, dr: 0, dc: -1 }, // 3: left
]

// Carves a maze with exactly one route between any two cells
function makeMaze(size: number, rng: () => number): number[] {
  const walls: number[] = new Array(size * size).fill(NORTH | EAST | SOUTH | WEST)
  const seen: boolean[] = new Array(size * size).fill(false)
  const stack = [0]
  seen[0] = true

  while (stack.length > 0) {
    const current = stack[stack.length - 1]
    const row = Math.floor(current / size)
    const col = current % size
    const options = shuffled(DIRS, rng).filter((dir) => {
      const nr = row + dir.dr
      const nc = col + dir.dc
      return nr >= 0 && nr < size && nc >= 0 && nc < size && !seen[nr * size + nc]
    })
    if (options.length === 0) {
      stack.pop()
      continue
    }
    const dir = options[0]
    const next = (row + dir.dr) * size + (col + dir.dc)
    walls[current] &= ~dir.bit
    walls[next] &= ~dir.opposite
    seen[next] = true
    stack.push(next)
  }
  return walls
}

// The fewest steps from the start to the exit
function shortestPath(walls: number[], size: number): number {
  const goal = size * size - 1
  const distance: number[] = new Array(size * size).fill(-1)
  distance[0] = 0
  const queue = [0]
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head]
    if (current === goal) return distance[current]
    const row = Math.floor(current / size)
    const col = current % size
    for (const dir of DIRS) {
      if (walls[current] & dir.bit) continue
      const next = (row + dir.dr) * size + (col + dir.dc)
      if (distance[next] === -1) {
        distance[next] = distance[current] + 1
        queue.push(next)
      }
    }
  }
  return distance[goal]
}

export default function MazeGame({ level, paused, seed, onFinish }: GameProps) {
  const t = useT()
  const size = SIZES[level]
  const goal = size * size - 1
  const finishRef = useLatest(onFinish)

  const maze = useMemo(() => {
    const walls = makeMaze(size, makeRng(seed))
    return { walls, best: shortestPath(walls, size) }
  }, [size, seed])

  const [state, setState] = useState({ pos: 0, steps: 0 })
  const [elapsed, setElapsed] = useState(0)
  const elapsedRef = useLatest(elapsed)
  const stepsRef = useLatest(state.steps)

  const arrived = state.pos === goal

  // The clock only runs while the game is not paused
  useEffect(() => {
    if (paused || arrived) return
    const id = window.setInterval(() => setElapsed((value) => value + 0.1), 100)
    return () => window.clearInterval(id)
  }, [paused, arrived])

  // When the light reaches the exit, wait a moment, then finish
  useEffect(() => {
    if (!arrived) return
    const id = window.setTimeout(() => {
      const efficiency = Math.min(1, maze.best / Math.max(1, stepsRef.current))
      const timeBonus = Math.max(0, 100 - elapsedRef.current)
      const score = (200 * efficiency + timeBonus) * MULTIPLIER[level]
      finishRef.current(Math.max(10, Math.round(score)))
    }, FINISH_MS)
    return () => window.clearTimeout(id)
  }, [arrived, maze.best, level, stepsRef, elapsedRef, finishRef])

  const move = (dirIndex: number) => {
    if (paused) return
    setState((previous) => {
      if (previous.pos === goal) return previous
      const dir = DIRS[dirIndex]
      if (maze.walls[previous.pos] & dir.bit) return previous // a wall is in the way
      const row = Math.floor(previous.pos / size)
      const col = previous.pos % size
      return {
        pos: (row + dir.dr) * size + (col + dir.dc),
        steps: previous.steps + 1,
      }
    })
  }

  // Keyboard arrows
  const moveRef = useLatest(move)
  useEffect(() => {
    const KEYS: Record<string, number> = {
      ArrowUp: 0,
      ArrowRight: 1,
      ArrowDown: 2,
      ArrowLeft: 3,
    }
    const onKey = (event: KeyboardEvent) => {
      const index = KEYS[event.key]
      if (index === undefined) return
      event.preventDefault()
      moveRef.current(index)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [moveRef])

  const total = size * CELL
  const playerRow = Math.floor(state.pos / size)
  const playerCol = state.pos % size

  // Draw each wall once: north and west of every cell, plus the outer east and south edges
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = maze.walls[row * size + col]
      const x = col * CELL
      const y = row * CELL
      if (cell & NORTH) lines.push({ x1: x, y1: y, x2: x + CELL, y2: y })
      if (cell & WEST) lines.push({ x1: x, y1: y, x2: x, y2: y + CELL })
      if (col === size - 1 && cell & EAST) {
        lines.push({ x1: x + CELL, y1: y, x2: x + CELL, y2: y + CELL })
      }
      if (row === size - 1 && cell & SOUTH) {
        lines.push({ x1: x, y1: y + CELL, x2: x + CELL, y2: y + CELL })
      }
    }
  }

  return (
    <div className="ez-game">
      <div className="ez-hud">
        <span>
          {t('game.maze.steps')}: <strong>{state.steps}</strong>
        </span>
        <span>
          {t('game.time')}: <strong>{Math.floor(elapsed)} s</strong>
        </span>
      </div>

      <div className="ez-maze">
        <svg viewBox={`-2 -2 ${total + 4} ${total + 4}`} role="img" aria-label={t('game.maze.label')}>
          {lines.map((line, index) => (
            <line key={index} className="ez-maze__wall" {...line} />
          ))}
          <circle
            className="ez-maze__exit"
            cx={(size - 1) * CELL + CELL / 2}
            cy={(size - 1) * CELL + CELL / 2}
            r={3.4}
          />
          <g
            className="ez-maze__player"
            style={{
              transform: `translate(${playerCol * CELL + CELL / 2}px, ${playerRow * CELL + CELL / 2}px)`,
            }}
          >
            <circle r={3.6} className="ez-maze__halo" />
            <circle r={2} className="ez-maze__core" />
          </g>
        </svg>
      </div>

      <div className="ez-dpad" role="group" aria-label={t('game.maze.dpad')}>
        <button
          type="button"
          className="ez-dpad__btn ez-dpad__up"
          aria-label={t('game.maze.up')}
          onClick={() => move(0)}
        >
          <ArrowUp size={26} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="ez-dpad__btn ez-dpad__left"
          aria-label={t('game.maze.left')}
          onClick={() => move(3)}
        >
          <ArrowLeft size={26} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="ez-dpad__btn ez-dpad__down"
          aria-label={t('game.maze.down')}
          onClick={() => move(2)}
        >
          <ArrowDown size={26} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="ez-dpad__btn ez-dpad__right"
          aria-label={t('game.maze.right')}
          onClick={() => move(1)}
        >
          <ArrowRight size={26} aria-hidden="true" />
        </button>
      </div>

      <p className="ez-sub" style={{ textAlign: 'center' }}>
        {t('game.maze.hint')}
      </p>
    </div>
  )
}