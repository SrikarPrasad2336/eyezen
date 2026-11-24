import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useT } from '../../i18n'
import './exercises.css'

interface PlayerShellProps {
  title: string
  subtitle?: string
  immersive?: boolean
  onLeave: () => void
  children: ReactNode
}

// The full-screen frame around every exercise and routine.
export default function PlayerShell({
  title,
  subtitle,
  immersive = false,
  onLeave,
  children,
}: PlayerShellProps) {
  const t = useT()

  // Lock page scrolling behind the full-screen player
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Escape key leaves
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onLeave()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onLeave])

  // Drawn straight into <body> so it covers the whole screen
  return createPortal(
    <div
      className={`ez-player ${immersive ? 'ez-player--immersive' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="ez-player__top">
        <button type="button" className="ez-iconbtn" aria-label={t('ex.leave')} onClick={onLeave}>
          <X size={22} aria-hidden="true" />
        </button>
        <div className="ez-player__titlebox">
          <span className="ez-player__title">{title}</span>
          {subtitle ? <span className="ez-sub">{subtitle}</span> : null}
        </div>
        <span className="ez-iconbtn-spacer" aria-hidden="true" />
      </div>
      {children}
    </div>,
    document.body,
  )
}