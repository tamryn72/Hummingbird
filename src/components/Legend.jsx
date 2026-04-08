import './Legend.css'

const items = [
  { color: 'var(--grid-empty)', border: 'var(--border)', label: 'Empty' },
  { color: 'var(--grid-planted)', border: 'rgba(0,0,0,0.15)', label: 'Planted' },
  { color: 'var(--grid-good)', border: 'rgba(0,0,0,0.15)', label: 'Good companion' },
  { color: 'var(--grid-bad)', border: 'rgba(0,0,0,0.15)', label: 'Bad companion' },
  { color: 'var(--grid-mixed)', border: 'rgba(0,0,0,0.15)', label: 'Mixed' },
]

export default function Legend() {
  return (
    <div className="legend">
      {items.map((item) => (
        <div className="legend-item" key={item.label}>
          <div
            className="legend-swatch"
            style={{ backgroundColor: item.color, borderColor: item.border }}
          />
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
