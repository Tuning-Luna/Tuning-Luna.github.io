import './Stat.css'

interface StatProps {
  value: number | string
  label: string
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="m3-stat">
      <span className="m3-stat__value">{value}</span>
      <span className="m3-stat__label">{label}</span>
    </div>
  )
}
