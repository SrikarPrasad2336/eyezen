import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'glass' | 'tinted'
  flush?: boolean
}

export default function Card({
  variant = 'solid',
  flush = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const classes = [
    'ez-card',
    `ez-card--${variant}`,
    flush ? 'ez-card--flush' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}