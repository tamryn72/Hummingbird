import { useState } from 'react'
import './Toolbar.css'

const modes = [
  { id: 'plant', label: '🌱 Plant', title: 'Click grid to place selected plant' },
  { id: 'shape', label: '✂️ Shape', title: 'Click squares to toggle on/off' },
  { id: 'erase', label: '🧹 Erase', title: 'Click planted square to remove plant' },
]

export default function Toolbar({ mode, onModeChange, rows, cols, onResize, onClear }) {
  const [showResize, setShowResize] = useState(false)
  const [newRows, setNewRows] = useState(rows)
  const [newCols, setNewCols] = useState(cols)

  const handleResizeToggle = () => {
    if (!showResize) {
      setNewRows(rows)
      setNewCols(cols)
    }
    setShowResize(!showResize)
  }

  const applyResize = () => {
    const r = Math.max(1, Math.min(20, newRows))
    const c = Math.max(1, Math.min(20, newCols))
    onResize(r, c)
    setShowResize(false)
  }

  const handleClear = () => {
    if (confirm('Clear all plants from this area? This cannot be undone.')) {
      onClear()
    }
  }

  return (
    <div className="toolbar">
      <div className="toolbar-modes">
        {modes.map((m) => (
          <button
            key={m.id}
            className={`toolbar-btn ${mode === m.id ? 'active' : ''}`}
            onClick={() => onModeChange(m.id)}
            title={m.title}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="toolbar-actions">
        <button className="toolbar-btn" onClick={handleResizeToggle}>
          📐 Resize
        </button>
        <button className="toolbar-btn toolbar-btn-danger" onClick={handleClear}>
          🗑️ Clear
        </button>
      </div>

      {showResize && (
        <div className="toolbar-resize">
          <label>
            Rows:
            <input
              type="number"
              min={1}
              max={20}
              value={newRows}
              onChange={(e) => setNewRows(parseInt(e.target.value) || 1)}
            />
          </label>
          <span className="resize-x">×</span>
          <label>
            Cols:
            <input
              type="number"
              min={1}
              max={20}
              value={newCols}
              onChange={(e) => setNewCols(parseInt(e.target.value) || 1)}
            />
          </label>
          <button className="toolbar-btn toolbar-btn-apply" onClick={applyResize}>
            Apply
          </button>
        </div>
      )}
    </div>
  )
}
