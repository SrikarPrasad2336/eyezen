const DOTS = [
  { left: '8%', size: 6, delay: 0, duration: 12 },
  { left: '20%', size: 9, delay: 3, duration: 15 },
  { left: '34%', size: 5, delay: 6, duration: 11 },
  { left: '48%', size: 8, delay: 1.5, duration: 14 },
  { left: '62%', size: 6, delay: 4.5, duration: 13 },
  { left: '76%', size: 10, delay: 2, duration: 16 },
  { left: '90%', size: 5, delay: 7, duration: 12 },
]

export default function Particles() {
  return (
    <div className="ez-particles" aria-hidden="true">
      {DOTS.map((dot, index) => (
        <span
          key={index}
          style={{
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
          }}
        />
      ))}
    </div>
  )
}