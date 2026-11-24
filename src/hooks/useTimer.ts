import { useCallback, useEffect, useRef, useState } from 'react'

// A pausable countdown that measures real time (so it stays correct
// even if the browser slows down a background tab).
export function useTimer(totalSeconds: number) {
  const totalMs = totalSeconds * 1000
  const [elapsedMs, setElapsedMs] = useState(0)
  const [wantsToRun, setWantsToRun] = useState(false)
  const lastTickRef = useRef(0)

  const finished = elapsedMs >= totalMs
  // Running means: asked to run AND not finished yet
  const running = wantsToRun && !finished

  useEffect(() => {
    if (!running) return
    lastTickRef.current = performance.now()
    const id = window.setInterval(() => {
      const now = performance.now()
      const delta = now - lastTickRef.current
      lastTickRef.current = now
      setElapsedMs((previous) => Math.min(previous + delta, totalMs))
    }, 100)
    return () => window.clearInterval(id)
  }, [running, totalMs])

  const start = useCallback(() => setWantsToRun(true), [])
  const pause = useCallback(() => setWantsToRun(false), [])
  const reset = useCallback(() => {
    setWantsToRun(false)
    setElapsedMs(0)
  }, [])

  return { elapsed: elapsedMs / 1000, running, finished, start, pause, reset }
}