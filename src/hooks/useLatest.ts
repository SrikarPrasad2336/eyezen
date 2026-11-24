import { useEffect, useRef } from 'react'

// Always holds the newest version of a value, so timers can call the
// newest function without restarting.
export function useLatest<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref
}