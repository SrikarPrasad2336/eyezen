import type { ReactNode } from 'react'

interface PageTransitionProps {
  routeKey: string
  children: ReactNode
}

// When routeKey changes, React rebuilds this box, which replays the fade-in.
export default function PageTransition({ routeKey, children }: PageTransitionProps) {
  return (
    <div key={routeKey} className="ez-page">
      {children}
    </div>
  )
}