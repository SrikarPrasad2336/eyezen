import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  message: string
  action?: ReactNode
}

export default function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="ez-state">
      <div className="ez-state__icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p className="ez-muted">{message}</p>
      {action}
    </div>
  )
}