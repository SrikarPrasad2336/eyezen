import type { Cue, GuideKind } from '../../data/exercises'

interface GuideVisualProps {
  kind: GuideKind
  cue: Cue
  progress: number // 0 to 1 inside the current step
  reduced: boolean
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value))
}

// Smooth start and end (like a real breath)
function ease(progress: number): number {
  return (1 - Math.cos(Math.PI * clamp(progress))) / 2
}

/* ---------- Breathing circle ---------- */
function breathScale(cue: Cue, progress: number, reduced: boolean): number {
  // With reduced motion we jump straight to the end size of each step
  const p = reduced ? 1 : progress
  switch (cue) {
    case 'inhale':
      return 0.6 + 0.4 * ease(p)
    case 'hold':
      return 1
    case 'exhale':
      return 1 - 0.4 * ease(p)
    case 'hold-empty':
      return 0.6
    default:
      return 0.8
  }
}

function BreathVisual({ cue, progress, reduced }: Omit<GuideVisualProps, 'kind'>) {
  const scale = breathScale(cue, progress, reduced)
  return (
    <div className="ez-breathvis" aria-hidden="true">
      <div className="ez-breathvis__ring" />
      <div className="ez-breathvis__orb" style={{ transform: `scale(${scale})` }} />
    </div>
  )
}

/* ---------- Slowly pulsing orb (for massage and compress) ---------- */
function CalmVisual() {
  return (
    <div className="ez-breathvis" aria-hidden="true">
      <div className="ez-breathvis__ring" />
      <div className="ez-breathvis__orb ez-breathvis__orb--calm" />
    </div>
  )
}

/* ---------- Blinking eye ---------- */
const EYE_PATH = 'M10 60 C50 15 150 15 190 60 C150 105 50 105 10 60 Z'

function lidClosure(cue: Cue, progress: number, reduced: boolean): number {
  if (cue === 'close') return reduced ? 1 : clamp(progress * 2.5)
  if (cue === 'open') return reduced ? 0 : clamp(1 - progress * 2.5)
  return 0
}

function BlinkVisual({ cue, progress, reduced }: Omit<GuideVisualProps, 'kind'>) {
  const closure = lidClosure(cue, progress, reduced)
  const lidBottom = 24 + closure * 72

  return (
    <svg className="ez-blinkvis" viewBox="0 0 200 120" aria-hidden="true">
      <defs>
        <clipPath id="ez-eye-clip">
          <path d={EYE_PATH} />
        </clipPath>
      </defs>
      <path d={EYE_PATH} fill="var(--color-surface)" />
      <g clipPath="url(#ez-eye-clip)">
        <circle cx="100" cy="60" r="27" fill="var(--color-primary)" />
        <circle cx="100" cy="60" r="12" fill="var(--color-ocean)" />
        <circle cx="109" cy="51" r="4" fill="#ffffff" opacity="0.85" />
        <rect
          x="0"
          y="0"
          width="200"
          height="96"
          fill="var(--color-teal-soft)"
          style={{
            transform: `translateY(${lidBottom - 96}px)`,
            transition: 'transform 120ms linear',
          }}
        />
      </g>
      <path
        d={EYE_PATH}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ---------- Near / far focus ---------- */
function FocusVisual({ cue }: Pick<GuideVisualProps, 'cue'>) {
  const scale = cue === 'near' ? 1 : cue === 'far' ? 0.28 : 0.6
  const opacity = cue === 'far' ? 0.8 : 1
  return (
    <div className="ez-focusvis" aria-hidden="true">
      <div className="ez-focusvis__horizon" />
      <div className="ez-focusvis__dot" style={{ transform: `scale(${scale})`, opacity }} />
    </div>
  )
}

/* ---------- Figure-8 and circle tracing ---------- */
type TraceKind = 'trace-eight' | 'trace-circle'

// Where is the dot when we are p (0 to 1) of the way around the shape?
function tracePoint(kind: TraceKind, p: number) {
  const angle = p * 2 * Math.PI
  if (kind === 'trace-circle') {
    return { x: 100 + 48 * Math.cos(angle), y: 60 + 48 * Math.sin(angle) }
  }
  // A sideways 8
  return { x: 100 + 80 * Math.cos(angle), y: 60 + 42 * Math.sin(2 * angle) }
}

function tracePath(kind: TraceKind): string {
  const steps = 120
  const parts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const point = tracePoint(kind, i / steps)
    parts.push(`${i === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
  }
  return `${parts.join(' ')} Z`
}

const TRACE_PATHS: Record<TraceKind, string> = {
  'trace-eight': tracePath('trace-eight'),
  'trace-circle': tracePath('trace-circle'),
}

function TraceVisual({
  kind,
  cue,
  progress,
  reduced,
}: Omit<GuideVisualProps, 'kind'> & { kind: TraceKind }) {
  let p = 0
  if (cue === 'trace') p = progress
  else if (cue === 'trace-reverse') p = 1 - progress
  // With reduced motion the dot hops between 8 resting places
  if (reduced) p = Math.floor(p * 8) / 8
  const point = tracePoint(kind, p)

  return (
    <svg className="ez-tracevis" viewBox="0 0 200 120" aria-hidden="true">
      <path
        d={TRACE_PATHS[kind]}
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <g
        style={{
          transform: `translate(${point.x}px, ${point.y}px)`,
          transition: 'transform 100ms linear',
        }}
      >
        <circle r="14" fill="var(--color-teal-soft)" opacity="0.8" />
        <circle r="7" fill="var(--color-primary)" />
      </g>
    </svg>
  )
}

/* ---------- Up / down / left / right ---------- */
const TRACK_POSITIONS: Partial<Record<Cue, { x: number; y: number }>> = {
  up: { x: 50, y: 12 },
  down: { x: 50, y: 88 },
  left: { x: 12, y: 50 },
  right: { x: 88, y: 50 },
}

function TrackingVisual({ cue }: Pick<GuideVisualProps, 'cue'>) {
  const position = TRACK_POSITIONS[cue] ?? { x: 50, y: 50 }
  return (
    <div className="ez-trackvis" aria-hidden="true">
      <div className="ez-trackvis__h" />
      <div className="ez-trackvis__v" />
      <div
        className="ez-trackvis__dot"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      />
    </div>
  )
}

export default function GuideVisual({ kind, cue, progress, reduced }: GuideVisualProps) {
  switch (kind) {
    case 'blink':
      return <BlinkVisual cue={cue} progress={progress} reduced={reduced} />
    case 'focus':
      return <FocusVisual cue={cue} />
    case 'calm':
      return <CalmVisual />
    case 'tracking':
      return <TrackingVisual cue={cue} />
    case 'trace-eight':
    case 'trace-circle':
      return <TraceVisual kind={kind} cue={cue} progress={progress} reduced={reduced} />
    default:
      return <BreathVisual cue={cue} progress={progress} reduced={reduced} />
  }
}