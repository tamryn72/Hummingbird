# Garden Companion Planner

A visual garden planning tool that helps you arrange plants based on companion planting relationships. Place plants on a grid and instantly see which neighbors are friends, foes, or a mix — color-coded so you can design a thriving garden at a glance.

## Features

- **Interactive Grid** — Click to place plants on a configurable grid (up to 20x20). Cells light up green for good companions, rose for bad, and gold for mixed.
- **47 Built-in Plants** — Vegetables, herbs, flowers, and fruit, each with researched companion relationships.
- **Multiple Garden Areas** — Create separate tabs for different beds, borders, or zones. Rename or delete as needed.
- **3 Editing Modes** — Plant mode to place, Shape mode to carve irregular bed outlines, Erase mode to remove.
- **Add Your Own Plants** — Create custom entries with your own emoji, friends, and foes lists.
- **Companion Tooltips** — Hover (desktop) or long-press (mobile) any planted cell to see exactly which neighbors are friends or foes.
- **Searchable Plant Palette** — Filter by category or search by name. Count badges show how many of each plant you've placed.
- **Fully Client-Side** — No accounts, no servers, no data collection. Everything runs in your browser.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later

### Install & Run

```bash
git clone https://github.com/tamryn72/Hummingbird.git
cd Hummingbird
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

The output goes to `dist/` — a static site you can host anywhere.

## How to Use

1. **Select a plant** from the palette at the bottom.
2. **Click grid squares** to place it. The grid color-codes each cell based on its neighbors:
   - **Green** — all adjacent companions are friends
   - **Rose** — one or more adjacent companions are foes
   - **Gold** — mix of friends and foes nearby
   - **Cream** — planted but no companion relationships with neighbors
3. **Switch modes** using the toolbar:
   - **Plant** — place the selected plant
   - **Shape** — toggle squares on/off to create irregular bed shapes
   - **Erase** — click a planted cell to remove it
4. **Resize** the grid with the Resize button (1–20 rows and columns).
5. **Add areas** with the + tab to plan multiple garden beds.
6. **Right-click** (or tap the same plant again) to remove a plant from a cell.

## Plant Database

The app ships with 47 plants across four categories:

| Category | Count | Examples |
|----------|-------|---------|
| Vegetables | 30 | Tomato, Pepper, Cucumber, Corn, Beans, Carrot, Lettuce, Potato |
| Herbs | 11 | Basil, Cilantro, Dill, Rosemary, Thyme, Mint, Sage, Lavender |
| Flowers | 4 | Marigold, Nasturtium, Sunflower, Borage |
| Fruit | 2 | Strawberry, Cantaloupe |

Each plant has a curated list of companion friends and foes. You can add your own plants with custom relationships using the "+ Add Plant" form in the palette.

## Tech Stack

- **React 18** — UI components and state management
- **Vite 6** — Build tool and dev server
- **Plain CSS** — No framework, custom dark theme with CSS custom properties
- **Zero backend** — All state lives in React, no database or API calls

## License

MIT
