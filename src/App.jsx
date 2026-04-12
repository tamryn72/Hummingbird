import { useState, useCallback, useMemo, useEffect } from 'react'
import plantsData from './data/plants.js'
import AreaTabs from './components/AreaTabs.jsx'
import Toolbar from './components/Toolbar.jsx'
import Grid from './components/Grid.jsx'
import PlantPalette from './components/PlantPalette.jsx'
import PlantCountSummary from './components/PlantCountSummary.jsx'
import Legend from './components/Legend.jsx'
import './App.css'

const STORAGE_KEY = 'hummingbird-garden-state-v1'

function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ enabled: true, plantId: null }))
  )
}

function createArea(name) {
  return {
    id: Date.now() + Math.random(),
    name,
    rows: 4,
    cols: 8,
    grid: createEmptyGrid(4, 8),
  }
}

function loadSavedState() {
  if (typeof window === 'undefined' || !window.localStorage) return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      !parsed ||
      !Array.isArray(parsed.areas) ||
      parsed.areas.length === 0 ||
      !Array.isArray(parsed.plants)
    ) {
      return null
    }
    return parsed
  } catch (err) {
    console.warn('Failed to load saved garden state:', err)
    return null
  }
}

export default function App() {
  const saved = useMemo(() => loadSavedState(), [])

  const [plants, setPlants] = useState(() => saved?.plants ?? plantsData)
  const [areas, setAreas] = useState(() => saved?.areas ?? [createArea('Garden 1')])
  const [activeAreaIndex, setActiveAreaIndex] = useState(() => {
    const idx = saved?.activeAreaIndex ?? 0
    const max = (saved?.areas?.length ?? 1) - 1
    return Math.max(0, Math.min(idx, max))
  })

  // Persist garden state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plants, areas, activeAreaIndex })
      )
    } catch (err) {
      console.warn('Failed to save garden state:', err)
    }
  }, [plants, areas, activeAreaIndex])

  const [mode, setMode] = useState('plant') // plant | shape | erase
  const [selectedPlantId, setSelectedPlantId] = useState(null)
  const [tooltip, setTooltip] = useState(null) // { row, col, x, y }

  const activeArea = areas[activeAreaIndex] || areas[0]

  // Plant lookup map
  const plantMap = useMemo(() => {
    const map = {}
    plants.forEach((p) => (map[p.id] = p))
    return map
  }, [plants])

  // ─── Area management ───
  const addArea = useCallback(() => {
    setAreas((prev) => [...prev, createArea(`Garden ${prev.length + 1}`)])
    setActiveAreaIndex((prev) => areas.length) // set to new last index
  }, [areas.length])

  const renameArea = useCallback((index, newName) => {
    setAreas((prev) => prev.map((a, i) => (i === index ? { ...a, name: newName } : a)))
  }, [])

  const deleteArea = useCallback(
    (index) => {
      if (areas.length <= 1) return
      setAreas((prev) => prev.filter((_, i) => i !== index))
      setActiveAreaIndex((prev) => Math.min(prev, areas.length - 2))
    },
    [areas.length]
  )

  // ─── Grid operations ───
  const updateGrid = useCallback(
    (newGrid) => {
      setAreas((prev) =>
        prev.map((a, i) => (i === activeAreaIndex ? { ...a, grid: newGrid } : a))
      )
    },
    [activeAreaIndex]
  )

  const handleCellClick = useCallback(
    (row, col) => {
      const cell = activeArea.grid[row][col]

      if (mode === 'shape') {
        const newGrid = activeArea.grid.map((r, ri) =>
          r.map((c, ci) => {
            if (ri === row && ci === col) {
              return { enabled: !c.enabled, plantId: c.enabled ? null : c.plantId }
            }
            return c
          })
        )
        updateGrid(newGrid)
      } else if (mode === 'plant') {
        if (!cell.enabled || !selectedPlantId) return
        const newGrid = activeArea.grid.map((r, ri) =>
          r.map((c, ci) => {
            if (ri === row && ci === col) {
              // Toggle off if clicking same plant
              const newPlantId = c.plantId === selectedPlantId ? null : selectedPlantId
              return { ...c, plantId: newPlantId }
            }
            return c
          })
        )
        updateGrid(newGrid)
      } else if (mode === 'erase') {
        if (!cell.enabled || !cell.plantId) return
        const newGrid = activeArea.grid.map((r, ri) =>
          r.map((c, ci) => {
            if (ri === row && ci === col) {
              return { ...c, plantId: null }
            }
            return c
          })
        )
        updateGrid(newGrid)
      }
    },
    [activeArea, mode, selectedPlantId, updateGrid]
  )

  const handleCellRightClick = useCallback(
    (e, row, col) => {
      e.preventDefault()
      const cell = activeArea.grid[row][col]
      if (!cell.enabled || !cell.plantId) return
      const newGrid = activeArea.grid.map((r, ri) =>
        r.map((c, ci) => {
          if (ri === row && ci === col) return { ...c, plantId: null }
          return c
        })
      )
      updateGrid(newGrid)
    },
    [activeArea, updateGrid]
  )

  const resizeGrid = useCallback(
    (newRows, newCols) => {
      const oldGrid = activeArea.grid
      const newGrid = Array.from({ length: newRows }, (_, ri) =>
        Array.from({ length: newCols }, (_, ci) => {
          if (ri < oldGrid.length && ci < oldGrid[0].length) {
            return oldGrid[ri][ci]
          }
          return { enabled: true, plantId: null }
        })
      )
      setAreas((prev) =>
        prev.map((a, i) =>
          i === activeAreaIndex ? { ...a, rows: newRows, cols: newCols, grid: newGrid } : a
        )
      )
    },
    [activeArea, activeAreaIndex]
  )

  const clearGrid = useCallback(() => {
    updateGrid(createEmptyGrid(activeArea.rows, activeArea.cols))
  }, [activeArea.rows, activeArea.cols, updateGrid])

  // ─── Plant selection ───
  const selectPlant = useCallback(
    (plantId) => {
      setSelectedPlantId((prev) => (prev === plantId ? null : plantId))
      if (mode !== 'plant') setMode('plant')
    },
    [mode]
  )

  // ─── Add custom plant ───
  const addCustomPlant = useCallback(
    (newPlant) => {
      setPlants((prev) => [...prev, newPlant])
    },
    []
  )

  // ─── Companion analysis ───
  const getCompanionStatus = useCallback(
    (row, col) => {
      const cell = activeArea.grid[row][col]
      if (!cell.enabled || !cell.plantId) return null

      const plant = plantMap[cell.plantId]
      if (!plant) return null

      const neighbors = []
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = row + dr
          const nc = col + dc
          if (nr < 0 || nr >= activeArea.rows || nc < 0 || nc >= activeArea.cols) continue
          const neighbor = activeArea.grid[nr][nc]
          if (neighbor.enabled && neighbor.plantId && neighbor.plantId !== cell.plantId) {
            const neighborPlant = plantMap[neighbor.plantId]
            if (!neighborPlant) continue
            const isFriend = plant.friends.includes(neighbor.plantId)
            const isFoe = plant.foes.includes(neighbor.plantId)
            if (isFriend || isFoe) {
              neighbors.push({
                plantId: neighbor.plantId,
                name: neighborPlant.name,
                emoji: neighborPlant.emoji,
                relationship: isFriend ? 'friend' : 'foe',
              })
            }
          }
        }
      }

      // Deduplicate by plantId, keeping relationship
      const seen = new Map()
      neighbors.forEach((n) => {
        if (!seen.has(n.plantId)) {
          seen.set(n.plantId, n)
        }
      })
      const uniqueNeighbors = [...seen.values()]

      const hasFriends = uniqueNeighbors.some((n) => n.relationship === 'friend')
      const hasFoes = uniqueNeighbors.some((n) => n.relationship === 'foe')

      let status = 'neutral'
      if (hasFriends && hasFoes) status = 'mixed'
      else if (hasFriends) status = 'good'
      else if (hasFoes) status = 'bad'

      return { status, neighbors: uniqueNeighbors }
    },
    [activeArea, plantMap]
  )

  // ─── Plant counts ───
  const plantCounts = useMemo(() => {
    const counts = {}
    activeArea.grid.forEach((row) =>
      row.forEach((cell) => {
        if (cell.plantId) {
          counts[cell.plantId] = (counts[cell.plantId] || 0) + 1
        }
      })
    )
    return counts
  }, [activeArea.grid])

  // ─── Tooltip ───
  const showTooltip = useCallback((row, col, x, y) => {
    setTooltip({ row, col, x, y })
  }, [])

  const hideTooltip = useCallback(() => {
    setTooltip(null)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="app-icon">🪻</span> Hummingbird
        </h1>
        <p className="app-subtitle">Garden Companion Planner 🐦</p>
      </header>

      <AreaTabs
        areas={areas}
        activeIndex={activeAreaIndex}
        onSelect={setActiveAreaIndex}
        onAdd={addArea}
        onRename={renameArea}
        onDelete={deleteArea}
      />

      <main className="app-main">
        <Toolbar
          mode={mode}
          onModeChange={setMode}
          rows={activeArea.rows}
          cols={activeArea.cols}
          onResize={resizeGrid}
          onClear={clearGrid}
        />

        <Grid
          grid={activeArea.grid}
          rows={activeArea.rows}
          cols={activeArea.cols}
          plantMap={plantMap}
          getCompanionStatus={getCompanionStatus}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
          tooltip={tooltip}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          mode={mode}
        />

        <Legend />

        <PlantPalette
          plants={plants}
          selectedPlantId={selectedPlantId}
          onSelectPlant={selectPlant}
          plantCounts={plantCounts}
          onAddCustomPlant={addCustomPlant}
          plantMap={plantMap}
        />

        <PlantCountSummary plantCounts={plantCounts} plantMap={plantMap} />
      </main>
    </div>
  )
}
