import { useRef, useCallback } from 'react'
import './Grid.css'

const STATUS_COLORS = {
  good: 'var(--grid-good)',
  bad: 'var(--grid-bad)',
  mixed: 'var(--grid-mixed)',
  neutral: 'var(--grid-planted)',
}

export default function Grid({
  grid,
  rows,
  cols,
  plantMap,
  getCompanionStatus,
  onCellClick,
  onCellRightClick,
  tooltip,
  showTooltip,
  hideTooltip,
  mode,
}) {
  const gridRef = useRef(null)

  // Auto-scale cell size
  const cellSize = Math.max(36, Math.min(60, Math.floor(600 / Math.max(rows, cols))))

  const handleMouseEnter = useCallback(
    (row, col, e) => {
      const cell = grid[row][col]
      if (!cell.enabled || !cell.plantId) return
      const rect = e.currentTarget.getBoundingClientRect()
      showTooltip(row, col, rect.left + rect.width / 2, rect.top)
    },
    [grid, showTooltip]
  )

  const handleTouchStart = useCallback(
    (row, col, e) => {
      const cell = grid[row][col]
      if (!cell.enabled || !cell.plantId) return
      // Long press for tooltip on mobile
      const timer = setTimeout(() => {
        const rect = e.currentTarget.getBoundingClientRect()
        showTooltip(row, col, rect.left + rect.width / 2, rect.top)
      }, 400)
      e.currentTarget._touchTimer = timer
    },
    [grid, showTooltip]
  )

  const handleTouchEnd = useCallback(
    (e) => {
      if (e.currentTarget._touchTimer) {
        clearTimeout(e.currentTarget._touchTimer)
      }
    },
    []
  )

  return (
    <div className="grid-wrapper">
      <div className="grid-scroll">
        <div
          className="grid"
          ref={gridRef}
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          }}
        >
          {grid.map((row, ri) =>
            row.map((cell, ci) => {
              const companionInfo = cell.enabled && cell.plantId
                ? getCompanionStatus(ri, ci)
                : null
              const status = companionInfo?.status || 'neutral'
              const plant = cell.plantId ? plantMap[cell.plantId] : null

              let bgColor
              let className = 'grid-cell'

              if (!cell.enabled) {
                className += ' disabled'
              } else if (plant) {
                className += ' planted'
                bgColor = STATUS_COLORS[status]
              } else {
                className += ' empty'
              }

              if (mode === 'shape') className += ' shape-mode'

              return (
                <div
                  key={`${ri}-${ci}`}
                  className={className}
                  style={bgColor ? { backgroundColor: bgColor } : undefined}
                  onClick={() => onCellClick(ri, ci)}
                  onContextMenu={(e) => onCellRightClick(e, ri, ci)}
                  onMouseEnter={(e) => handleMouseEnter(ri, ci, e)}
                  onMouseLeave={hideTooltip}
                  onTouchStart={(e) => handleTouchStart(ri, ci, e)}
                  onTouchEnd={handleTouchEnd}
                >
                  {!cell.enabled && <span className="cell-disabled-mark">✕</span>}
                  {plant && (
                    <div className="cell-content">
                      <span className="cell-emoji">{plant.emoji}</span>
                      {cellSize > 44 && (
                        <span className="cell-label">
                          {plant.name.length > 5
                            ? plant.name.slice(0, 4) + '…'
                            : plant.name}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>

      {tooltip && (() => {
        const cell = grid[tooltip.row][tooltip.col]
        if (!cell.plantId) return null
        const plant = plantMap[cell.plantId]
        if (!plant) return null
        const info = getCompanionStatus(tooltip.row, tooltip.col)
        return (
          <div
            className="grid-tooltip"
            style={{
              left: tooltip.x,
              top: tooltip.y - 8,
            }}
          >
            <div className="tooltip-header">
              {plant.emoji} {plant.name}
            </div>
            {info && info.neighbors.length > 0 ? (
              <div className="tooltip-companions">
                {info.neighbors.map((n) => (
                  <div
                    key={n.plantId}
                    className={`tooltip-companion ${n.relationship}`}
                  >
                    {n.emoji} {n.name} —{' '}
                    {n.relationship === 'friend' ? '👍 friend' : '👎 foe'}
                  </div>
                ))}
              </div>
            ) : (
              <div className="tooltip-empty">No companions nearby</div>
            )}
          </div>
        )
      })()}
    </div>
  )
}
