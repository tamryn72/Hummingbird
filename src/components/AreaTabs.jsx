import { useState } from 'react'
import './AreaTabs.css'

export default function AreaTabs({ areas, activeIndex, onSelect, onAdd, onRename, onDelete }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editName, setEditName] = useState('')

  const startRename = (index, currentName) => {
    setEditingIndex(index)
    setEditName(currentName)
  }

  const finishRename = () => {
    if (editingIndex !== null && editName.trim()) {
      onRename(editingIndex, editName.trim())
    }
    setEditingIndex(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') finishRename()
    if (e.key === 'Escape') setEditingIndex(null)
  }

  const handleDelete = (e, index) => {
    e.stopPropagation()
    if (areas.length <= 1) return
    if (confirm(`Delete "${areas[index].name}"? This cannot be undone.`)) {
      onDelete(index)
    }
  }

  return (
    <div className="area-tabs">
      <div className="area-tabs-list">
        {areas.map((area, index) => (
          <div
            key={area.id}
            className={`area-tab ${index === activeIndex ? 'active' : ''}`}
            onClick={() => onSelect(index)}
          >
            {editingIndex === index ? (
              <input
                className="area-tab-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={finishRename}
                onKeyDown={handleKeyDown}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <span className="area-tab-name">{area.name}</span>
                <button
                  className="area-tab-edit"
                  onClick={(e) => {
                    e.stopPropagation()
                    startRename(index, area.name)
                  }}
                  title="Rename"
                >
                  ✏️
                </button>
                {areas.length > 1 && (
                  <button
                    className="area-tab-delete"
                    onClick={(e) => handleDelete(e, index)}
                    title="Delete"
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </div>
        ))}
        <button className="area-tab-add" onClick={onAdd} title="Add area">
          +
        </button>
      </div>
    </div>
  )
}
