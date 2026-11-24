interface BreathingCircleProps {
  size?: number
  label?: string
}

export default function BreathingCircle({
  size = 192,
  label = 'Breathe slowly',
}: BreathingCircleProps) {
  return (
    <div className="ez-breath-wrap">
      <div className="ez-breath" style={{ width: size, height: size }} aria-hidden="true">
        <div className="ez-breath__orb" />
      </div>
      <p className="ez-muted">{label}</p>
    </div>
  )
}