import type { DayMinutes } from '../../utils/stats'

interface ActivityChartProps {
  data: DayMinutes[]
  goal: number
  tickEvery: number // label every Nth bar (the last bar, today, is always labeled)
  label: string // read aloud by screen readers
  unit: string
}

const WIDTH = 300
const HEIGHT = 140
const TOP = 10
const BOTTOM = 24

function round1(value: number): number {
  return Math.round(value * 10) / 10
}

export default function ActivityChart({ data, goal, tickEvery, label, unit }: ActivityChartProps) {
  const chartHeight = HEIGHT - TOP - BOTTOM
  const max = Math.max(goal, ...data.map((day) => day.minutes)) * 1.15
  const slot = WIDTH / data.length
  const barWidth = slot * 0.58
  const goalY = TOP + chartHeight - (goal / max) * chartHeight
  const showWeekday = data.length <= 7

  return (
    <svg className="ez-chart" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={label}>
      {data.map((day, index) => {
        const x = index * slot + (slot - barWidth) / 2
        const height = day.minutes > 0 ? Math.max(3, (day.minutes / max) * chartHeight) : 0
        const showLabel = (data.length - 1 - index) % tickEvery === 0
        const labelText = showWeekday
          ? day.date.toLocaleDateString(undefined, { weekday: 'short' })
          : String(day.date.getDate())
        const tooltip = `${day.date.toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'short',
        })}: ${round1(day.minutes)} ${unit}`

        return (
          <g key={day.key}>
            <rect
              className="ez-chart__track"
              x={x}
              y={TOP}
              width={barWidth}
              height={chartHeight}
              rx={Math.min(4, barWidth / 2)}
            />
            {height > 0 ? (
              <rect
                className="ez-chart__bar"
                x={x}
                y={TOP + chartHeight - height}
                width={barWidth}
                height={height}
                rx={Math.min(4, barWidth / 2)}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <title>{tooltip}</title>
              </rect>
            ) : null}
            {showLabel ? (
              <text
                className="ez-chart__label"
                x={x + barWidth / 2}
                y={HEIGHT - 8}
                textAnchor="middle"
              >
                {labelText}
              </text>
            ) : null}
          </g>
        )
      })}
      <line
        className="ez-chart__goal"
        x1="0"
        x2={WIDTH}
        y1={goalY}
        y2={goalY}
        strokeDasharray="4 5"
      />
    </svg>
  )
}