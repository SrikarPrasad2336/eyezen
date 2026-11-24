import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Check, Pause, Play, RotateCcw, ShieldAlert, SkipForward } from 'lucide-react'
import { Button } from '../../components/ui'
import { getStepAt, getTotalSeconds } from '../../data/exercises'
import type { Cue, Exercise } from '../../data/exercises'
import { useHaptics } from '../../hooks/useHaptics'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSound } from '../../hooks/useSound'
import { useTimer } from '../../hooks/useTimer'
import { useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import { useProgress } from '../../store/progressStore'
import { todayKey } from '../../utils/date'
import { formatClock, formatDuration } from '../../utils/time'
import GuideVisual from './GuideVisual'
import PlayerShell from './PlayerShell'
import './exercises.css'

const CUE_LABEL: Partial<Record<Cue, MessageKey>> = {
  inhale: 'ex.cue.inhale',
  hold: 'ex.cue.hold',
  exhale: 'ex.cue.exhale',
  'hold-empty': 'ex.cue.holdEmpty',
  close: 'ex.cue.close',
  open: 'ex.cue.open',
  near: 'ex.cue.near',
  far: 'ex.cue.far',
  trace: 'ex.cue.trace',
  'trace-reverse': 'ex.cue.traceBack',
  up: 'ex.cue.up',
  down: 'ex.cue.down',
  left: 'ex.cue.left',
  right: 'ex.cue.right',
  center: 'ex.cue.center',
}

// A tiny buzz at the start of each cycle
const BUZZ_CUES = new Set<Cue>(['inhale', 'close', 'near', 'trace'])

export interface RoutineInfo {
  name: string
  position: number // 1, 2, 3...
  count: number
  nextName?: string
}

interface ExercisePlayerProps {
  exercise: Exercise
  onLeave: () => void
  routine?: RoutineInfo // only when this exercise is part of a routine
  onNext?: () => void // routine: go to the next exercise
}

export default function ExercisePlayer({ exercise, onLeave, routine, onNext }: ExercisePlayerProps) {
  const t = useT()
  const total = getTotalSeconds(exercise)
  const timer = useTimer(total)
  const reduced = useReducedMotion()
  const buzz = useHaptics()
  const { prepare, chime } = useSound()
  const sessions = useProgress((state) => state.sessions)
  const addSession = useProgress((state) => state.addSession)

  const [started, setStarted] = useState(false)
  const recordedRef = useRef(false)
  const lastStepRef = useRef(-1)

  const { index, progress } = getStepAt(exercise.steps, timer.elapsed)
  const step = exercise.steps[index]
  const percent = Math.round((timer.elapsed / total) * 100)
  const cueKey = CUE_LABEL[step.cue]
  const { pause } = timer

  // Only set when this exercise is inside a routine
  const handleContinue = routine && onNext ? onNext : undefined
  const subtitle = routine
    ? `${routine.name} · ${t('ex.step')} ${routine.position} / ${routine.count}`
    : undefined

  // Auto-pause when you switch to another tab or app
  useEffect(() => {
    const onHide = () => {
      if (document.hidden) pause()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [pause])

  // Tiny buzz when a new cycle starts
  useEffect(() => {
    if (!timer.running) return
    if (lastStepRef.current === index) return
    lastStepRef.current = index
    if (BUZZ_CUES.has(step.cue)) buzz(15)
  }, [index, timer.running, step.cue, buzz])

  // Calm finish: save the session, chime, gentle buzz (only once)
  useEffect(() => {
    if (!timer.finished || recordedRef.current) return
    recordedRef.current = true
    addSession(exercise.id, total)
    chime()
    buzz([40, 80, 40])
  }, [timer.finished, addSession, exercise.id, total, chime, buzz])

  const handleBegin = () => {
    prepare()
    setStarted(true)
    timer.start()
  }

  const handleToggle = () => {
    if (timer.running) timer.pause()
    else timer.start()
  }

  const handleAgain = () => {
    recordedRef.current = false
    lastStepRef.current = -1
    timer.reset()
    timer.start()
  }

  const todayCount = sessions.filter((session) => session.date === todayKey()).length

  let content: ReactNode
  if (timer.finished) {
    content = (
      <>
        <div className="ez-player__body">
          <div className="ez-done__orb" aria-hidden="true">
            <Check size={56} />
          </div>
          <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
            <h1>{t('ex.done.title')}</h1>
            <p className="ez-cue-text">{t('ex.done.text')}</p>
            <p className="ez-sub">
              {t('ex.today')}: <strong>{todayCount}</strong>
            </p>
          </div>
        </div>
        <div className="ez-player__controls">
          {handleContinue ? (
            <Button size="lg" onClick={handleContinue}>
              {routine?.nextName
                ? `${t('ex.next')}: ${routine.nextName}`
                : t('ex.finishRoutine')}
            </Button>
          ) : (
            <>
              <Button variant="soft" icon={<RotateCcw size={18} />} onClick={handleAgain}>
                {t('ex.again')}
              </Button>
              <Button size="lg" onClick={onLeave}>
                {t('ex.back')}
              </Button>
            </>
          )}
        </div>
      </>
    )
  } else if (!started) {
    content = (
      <>
        <div className="ez-player__body">
          <div className="ez-player__stage">
            <GuideVisual kind={exercise.guide} cue="rest" progress={0} reduced={reduced} />
          </div>
          <div className="ez-stack ez-player__intro">
            <p className="ez-cue-text">{exercise.tagline}</p>
            <div>
              <span className="ez-pill">{formatDuration(total)}</span>
            </div>
            <h2>{t('ex.howTo')}</h2>
            <ol className="ez-howto">
              {exercise.howTo.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <div className="ez-safety">
              <ShieldAlert size={22} aria-hidden="true" />
              <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
                <p>
                  <strong>{t('ex.safetyTitle')}.</strong> {t('ex.safetyGeneral')}
                </p>
                {exercise.safety ? <p>{exercise.safety}</p> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="ez-player__controls">
          <Button size="lg" icon={<Play size={20} />} onClick={handleBegin}>
            {t('ex.begin')}
          </Button>
        </div>
      </>
    )
  } else {
    content = (
      <>
        <div className="ez-player__body">
          <div className="ez-player__stage">
            <GuideVisual
              kind={exercise.guide}
              cue={step.cue}
              progress={progress}
              reduced={reduced}
            />
          </div>
          <div
            className="ez-stack ez-player__cue"
            aria-live="polite"
            style={{ gap: 'var(--space-2)' }}
          >
            {cueKey ? <p className="ez-cue-word">{t(cueKey)}</p> : null}
            <p className="ez-cue-text">{step.text}</p>
          </div>
          <div className="ez-player__meta">
            <p className="ez-clock">
              {formatClock(total - timer.elapsed)}{' '}
              <span className="ez-sub">{t('ex.timeLeft')}</span>
            </p>
            <div
              className="ez-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              aria-label={t('ex.progress')}
            >
              <div className="ez-bar__fill" style={{ width: `${percent}%` }} />
            </div>
            <p className="ez-sub" style={{ minHeight: '1.5rem' }}>
              {timer.running ? '' : t('ex.paused')}
            </p>
            {reduced ? <p className="ez-sub">{t('ex.reducedGuide')}</p> : null}
          </div>
        </div>
        <div className="ez-player__controls">
          <Button
            variant="ghost"
            icon={<SkipForward size={18} />}
            aria-label={t('ex.skipLabel')}
            onClick={handleContinue ?? onLeave}
          >
            {t('ex.skip')}
          </Button>
          <Button
            size="lg"
            icon={timer.running ? <Pause size={20} /> : <Play size={20} />}
            onClick={handleToggle}
          >
            {timer.running ? t('ex.pause') : t('ex.resume')}
          </Button>
        </div>
      </>
    )
  }

  return (
    <PlayerShell
      title={exercise.name}
      subtitle={subtitle}
      immersive={exercise.immersive}
      onLeave={onLeave}
    >
      {content}
    </PlayerShell>
  )
}