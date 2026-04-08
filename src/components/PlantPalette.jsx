import { useState, useMemo } from 'react'
import './PlantPalette.css'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'vegetable', label: 'Vegetables' },
  { id: 'herb', label: 'Herbs' },
  { id: 'flower', label: 'Flowers' },
  { id: 'fruit', label: 'Fruit' },
  { id: 'custom', label: 'Custom' },
]

export default function PlantPalette({
  plants,
  selectedPlantId,
  onSelectPlant,
  plantCounts,
  onAddCustomPlant,
  plantMap,
}) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPlant, setNewPlant] = useState({
    name: '',
    emoji: '🌱',
    friends: '',
    foes: '',
  })

  const filtered = useMemo(() => {
    let list = plants
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }
    return list
  }, [plants, activeCategory, search])

  const handleAddPlant = () => {
    const name = newPlant.name.trim()
    if (!name) return

    const id = name.toLowerCase().replace(/\s+/g, '_')

    // Check for duplicate
    if (plantMap[id]) {
      alert(`A plant named "${name}" already exists.`)
      return
    }

    const parseFriendsFoes = (str) =>
      str
        .split(',')
        .map((s) => s.trim().toLowerCase().replace(/\s+/g, '_'))
        .filter(Boolean)

    const plant = {
      id,
      name,
      emoji: newPlant.emoji || '🌱',
      category: 'custom',
      friends: parseFriendsFoes(newPlant.friends),
      foes: parseFriendsFoes(newPlant.foes),
    }

    onAddCustomPlant(plant)
    setNewPlant({ name: '', emoji: '🌱', friends: '', foes: '' })
    setShowAddForm(false)
  }

  return (
    <div className="palette">
      <div className="palette-header">
        <h2 className="palette-title">Plant Palette</h2>
        <button
          className="palette-add-toggle"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '− Cancel' : '+ Add Plant'}
        </button>
      </div>

      {showAddForm && (
        <div className="palette-add-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Plant name"
              value={newPlant.name}
              onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Emoji"
              value={newPlant.emoji}
              onChange={(e) => setNewPlant({ ...newPlant, emoji: e.target.value })}
              className="form-input form-emoji"
            />
          </div>
          <input
            type="text"
            placeholder="Friends (comma-separated names)"
            value={newPlant.friends}
            onChange={(e) => setNewPlant({ ...newPlant, friends: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Foes (comma-separated names)"
            value={newPlant.foes}
            onChange={(e) => setNewPlant({ ...newPlant, foes: e.target.value })}
            className="form-input"
          />
          <button className="form-submit" onClick={handleAddPlant}>
            Add Plant
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="palette-search"
      />

      <div className="palette-categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`palette-cat-btn cat-${cat.id} ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="palette-plants">
        {filtered.length === 0 ? (
          <div className="palette-empty">No plants found</div>
        ) : (
          filtered.map((plant) => (
            <button
              key={plant.id}
              className={`palette-plant-btn cat-bg-${plant.category} ${
                selectedPlantId === plant.id ? 'selected' : ''
              }`}
              onClick={() => onSelectPlant(plant.id)}
              title={plant.name}
            >
              <span className="plant-btn-emoji">{plant.emoji}</span>
              <span className="plant-btn-name">{plant.name}</span>
              {plantCounts[plant.id] > 0 && (
                <span className="plant-btn-count">×{plantCounts[plant.id]}</span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
