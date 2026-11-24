interface SkeletonProps {
  width?: string | number
  height?: string | number
  radius?: string
}

export default function Skeleton({
  width = '100%',
  height = '1rem',
  radius = 'var(--radius-sm)',
}: SkeletonProps) {
  return (
    <div
      className="ez-skeleton"
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}