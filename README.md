# Drag-and-Drop Builder

A mini drag-and-drop builder built with React 18, TypeScript, and Vite.

## Features

- **Canvas & Palette**: Add block types (Text, Heading, Image, Button, Container, Divider) from the palette, search/filter blocks, and reorder them on the canvas with drag-and-drop.
- **Properties Panel**: Select a block to edit text, URLs, colors, font size, font weight/style, alignment, width/size, and padding. Changes are reflected live on the canvas.
- **Device Preview**: Header device switcher (Desktop / Tablet / Mobile) adjusts the canvas max-width to preview responsive output.
- **Serialization**: Export the full layout as a JSON file, import a JSON layout, and save/load to `localStorage`.
- **Undo / Redo**: Snapshot-based undo/redo for every layout mutation.
- **Delete**: Remove a selected block from the properties panel.
- **Performance**: `SortableBlock` is memoized, keys are stable, and state updates touch only the affected block.
- **Security**: Imported JSON is validated and sanitized; user content is never rendered with `dangerouslySetInnerHTML`; URLs and colors are sanitized before rendering.
- **Responsive**: Three-column workspace on desktop and a stacked layout on mobile.

## Install & Run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Project Structure

```
src/
├── App.tsx                 # App shell, local UI state (device), and persistence wiring
├── App.css                 # Plain CSS styling
├── components/
│   ├── Block/              # Palette panel and block tile buttons
│   ├── Editor/             # Properties panel inputs
│   ├── Header/             # Header with brand, device switcher, toolbar
│   └── Show/               # Canvas and sortable blocks
├── hooks/
│   └── useBuilder.ts       # Builder state logic hook
├── types/
│   └── block.ts            # Block type definitions
└── utils/
    ├── helpers.ts          # ID generation, block creation, URL sanitization
    ├── serialize.ts        # JSON serialize/deserialize helpers
    └── validate.ts         # Layout validation and sanitization
```

## How to Use

- Click a block type in the palette to add it to the canvas.
- Drag canvas blocks to reorder them.
- Click a canvas block to edit it in the properties panel.
- Use the toolbar to export, import, save, load, undo, or redo layouts.
- Use the D/T/M buttons to preview the canvas at desktop, tablet, and mobile widths.
