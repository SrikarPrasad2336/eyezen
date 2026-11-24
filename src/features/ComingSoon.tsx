import type { ReactNode } from 'react'
import { Card, EmptyState } from '../components/ui'

interface ComingSoonProps {
  icon: ReactNode
  title: string
  message: string
}

// Temporary page used until each feature is built.
export default function ComingSoon({ icon, title, message }: ComingSoonProps) {
  return (
    <div className="ez-stack">
      <h1>{title}</h1>
      <Card>
        <EmptyState icon={icon} title="Coming soon" message={message} />
      </Card>
    </div>
  )
}