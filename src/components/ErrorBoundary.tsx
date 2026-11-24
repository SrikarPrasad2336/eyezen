import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { ErrorState } from './ui'

interface ErrorBoundaryProps {
  children: ReactNode
  resetKey?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

// Catches a crash in one page so the whole app does not go blank.
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('EyeZen page error:', error, info)
  }

  componentDidUpdate(previous: ErrorBoundaryProps) {
    if (this.state.hasError && previous.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState onRetry={() => this.setState({ hasError: false })} />
    }
    return this.props.children
  }
}