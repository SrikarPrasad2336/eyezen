interface EyeLogoProps {
  size?: number
}

export default function EyeLogo({ size = 64 }: EyeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="EyeZen logo"
    >
      <path
        d="M4 34C11 21 21 14 32 14s21 7 28 20c-7 13-17 20-28 20S11 47 4 34Z"
        fill="var(--color-teal-soft)"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="34" r="11" fill="var(--color-primary)" />
      <circle cx="32" cy="34" r="5" fill="var(--color-ocean)" />
      <circle cx="36" cy="30" r="2.2" fill="#ffffff" opacity="0.9" />
      <path d="M32 11c2-6 8-8 13-7-1 6-6 9-13 7Z" fill="var(--color-sage)" />
    </svg>
  )
}