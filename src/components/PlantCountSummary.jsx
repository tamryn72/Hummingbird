import './PlantCountSummary.css'

export default function PlantCountSummary({ plantCounts, plantMap }) {
  const entries = Object.entries(plantCounts).filter(([, count]) => count > 0)

  if (entries.length === 0) return null

  return (
    <div className="plant-summary">
      <h3 className="summary-title">Planted in this area</h3>
      <div className="summary-list">
        {entries.map(([plantId, count]) => {
          const plant = plantMap[plantId]
          if (!plant) return null
          return (
            <div className="summary-item" key={plantId}>
              <span className="summary-emoji">{plant.emoji}</span>
              <span className="summary-name">{plant.name}</span>
              <span className="summary-count">×{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
