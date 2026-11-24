import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface ProgressRingProps {
  value: number // 0 to 100
  size?: number
  stroke?: number
  label?: string
  color?: string
  children?: ReactNode
}

export default function ProgressRing({
  value,
  size = 120,
  stroke = 10,
  label,
  color = 'var(--color-primary)',
  children,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const [shown, setShown] = useState(0)

  // Start at 0, then glide to the real value (this makes the ring animate in)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(clamped))
    return () => cancelAnimationFrame(id)
  }, [clamped])

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - shown / 100)
  const center = size / 2

  return (
    <div
      className="ez-ring"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-label={label}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          className="ez-ring__track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="ez-ring__bar"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="ez-ring__center">{children}</div>
    </div>
  )
}