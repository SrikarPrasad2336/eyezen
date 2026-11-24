import { Skeleton } from '../ui'

export default function PageSkeleton() {
  return (
    <div className="ez-stack" role="status" aria-label="Loading">
      <Skeleton height="12rem" radius="var(--radius-lg)" />
      <Skeleton height="6rem" radius="var(--radius-lg)" />
      <Skeleton height="6rem" radius="var(--radius-lg)" />
    </div>
  )
}