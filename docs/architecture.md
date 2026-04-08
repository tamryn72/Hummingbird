# Architecture

Overview of how the Garden Companion Planner is structured.

## Project Structure

```
Hummingbird/
├── index.html              # Entry point HTML
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build configuration
├── src/
│   ├── main.jsx            # React root mount
│   ├── index.css           # Global styles and CSS custom properties
│   ├── App.jsx             # Main app component with all state management
│   ├── App.css             # App layout styles
│   ├── data/
│   │   └── plants.js       # Plant database (47 plants with companion data)
│   └── components/
│       ├── AreaTabs.jsx     # Tab bar for multiple garden areas
│       ├── AreaTabs.css
│       ├── Toolbar.jsx      # Mode buttons, resize, and clear controls
│       ├── Toolbar.css
│       ├── Grid.jsx         # Interactive planting grid with companion coloring
│       ├── Grid.css
│       ├── PlantPalette.jsx # Searchable plant picker with category filters
│       ├── PlantPalette.css
│       ├── Legend.jsx       # Color legend bar
│       ├── Legend.css
│       ├── PlantCountSummary.jsx  # Per-area plant count display
│       └── PlantCountSummary.css
└── docs/
    ├── architecture.md     # This file
    └── companion-data.md   # Full companion planting reference
```

## State Management

All state lives in `App.jsx` using React's `useState` and is passed down as props. There is no external state library, no context, and no backend.

### Core State

| State | Type | Purpose |
|-------|------|---------|
| `plants` | `Plant[]` | Full plant database (built-in + custom) |
| `areas` | `Area[]` | All garden areas with their grids |
| `activeAreaIndex` | `number` | Which area tab is selected |
| `mode` | `'plant' \| 'shape' \| 'erase'` | Current editing mode |
| `selectedPlantId` | `string \| null` | Which plant is selected in the palette |
| `tooltip` | `object \| null` | Tooltip position and target cell |

### Data Shapes

```js
// A single grid cell
{ enabled: boolean, plantId: string | null }

// A garden area
{
  id: number,
  name: string,
  rows: number,
  cols: number,
  grid: Cell[][]    // 2D array of cells
}

// A plant entry
{
  id: string,       // lowercase, underscores (e.g. "sweet_potato")
  name: string,     // display name
  emoji: string,    // emoji icon
  category: string, // "vegetable" | "herb" | "flower" | "fruit" | "custom"
  friends: string[],// array of plant IDs
  foes: string[]    // array of plant IDs
}
```

## Companion Logic

The companion analysis runs in `getCompanionStatus(row, col)` inside `App.jsx`.

For a given cell:

1. Check all 8 adjacent cells (cardinal + diagonal directions).
2. For each neighbor with a plant, look up whether that plant ID appears in the current plant's `friends` or `foes` array.
3. Deduplicate neighbors by plant ID (if the same plant type appears in multiple adjacent cells, it only counts once).
4. Determine the overall status:
   - `good` — has friends, no foes
   - `bad` — has foes, no friends
   - `mixed` — has both friends and foes
   - `neutral` — has no companion relationships with any neighbor

The status maps to a background color applied to the grid cell.

## Component Responsibilities

### `App.jsx`
- Owns all state
- Handles grid operations (place, erase, resize, clear)
- Runs companion analysis
- Computes plant counts
- Passes everything down as props

### `AreaTabs`
- Renders tab bar for switching garden areas
- Handles inline renaming (click edit icon to enter edit mode)
- Delete with confirmation dialog

### `Toolbar`
- Mode toggle buttons (Plant / Shape / Erase)
- Resize panel (expandable, row x col inputs with 1-20 limits)
- Clear All with confirmation

### `Grid`
- Renders the 2D CSS grid of cells
- Auto-scales cell size based on grid dimensions (36-60px)
- Applies companion status colors
- Handles click, right-click, hover, and touch events
- Renders the floating tooltip when a cell is hovered

### `PlantPalette`
- Search input for filtering by name
- Category filter buttons (All / Vegetables / Herbs / Flowers / Fruit / Custom)
- Plant button grid with emoji, name, and count badges
- "Add Plant" expandable form for custom plants

### `Legend`
- Static display of the 5 cell states and their colors

### `PlantCountSummary`
- Lists all planted species in the active area with counts
- Only renders when at least one plant is placed

## Styling

All styles use CSS custom properties defined in `index.css`. The color palette is:

```css
--bg-page:       #0b2328   /* deep teal page background */
--bg-card:       #12322a   /* card/container background */
--bg-input:      #16392c   /* input/nested element background */
--text-primary:  #f5f5f2   /* warm white text */
--text-secondary:#d6d3c7   /* muted cream text */
--accent-gold:   #c2a75a   /* gold accent for highlights */
--border:        #2a4a3a   /* subtle green borders */
--grid-good:     #86efac   /* spring green for good companions */
--grid-bad:      #fda4af   /* rose for bad companions */
--grid-mixed:    #c2a75a   /* gold for mixed companions */
--grid-planted:  #d6d3c7   /* cream for planted, no companions */
--grid-empty:    #16392c   /* empty cell background */
--grid-disabled: #0b2328   /* disabled/shaped-off cell */
```

Each component has its own CSS file. No CSS modules or CSS-in-JS — just plain class selectors scoped by component name prefixes.

## Building and Deploying

- `npm run dev` — Starts Vite dev server with hot reload
- `npm run build` — Produces optimized static files in `dist/`
- The `base: '/Hummingbird/'` setting in `vite.config.js` ensures asset paths work on GitHub Pages

The `gh-pages` branch contains the built output for GitHub Pages deployment.
