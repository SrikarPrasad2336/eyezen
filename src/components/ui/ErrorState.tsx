import { CloudOff, RefreshCw } from 'lucide-react'
import Button from './Button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'That did not work. Take a slow breath and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="ez-state ez-state--error" role="alert">
      <div className="ez-state__icon" aria-hidden="true">
        <CloudOff size={28} />
      </div>
      <h3>{title}</h3>
      <p className="ez-muted">{message}</p>
      {onRetry ? (
        <Button variant="soft" icon={<RefreshCw size={18} />} onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}