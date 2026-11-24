export default function NatureWaves() {
  return (
    <svg
      className="ez-waves"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 70 C60 40 120 40 200 66 S340 96 400 60 V120 H0 Z"
        fill="var(--color-sage-soft)"
        opacity="0.85"
      />
      <path
        d="M0 92 C70 68 140 72 210 94 S340 112 400 86 V120 H0 Z"
        fill="var(--color-teal-soft)"
        opacity="0.95"
      />
    </svg>
  )
}