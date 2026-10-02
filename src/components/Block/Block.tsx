import { useState } from 'react'
import type { BlockType } from '../../types/block'
import BlockButton from './BlockButton'

const BLOCK_TYPES: { id: BlockType; label: string }[] = [
  { id: 'text', label: 'Text' },
  { id: 'heading', label: 'Heading' },
  { id: 'image', label: 'Image' },
  { id: 'button', label: 'Button' },
  { id: 'container', label: 'Container' },
  { id: 'divider', label: 'Divider' },
]

interface BlockPanelProps {
  onAdd: (type: BlockType) => void
}

export default function Block({ onAdd }: BlockPanelProps) {
  const [query, setQuery] = useState('')
  const filtered = BLOCK_TYPES.filter((b) =>
    b.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <aside className="block-panel">
      <div className="search-blocks">
        <input
          type="text"
          placeholder="Search blocks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <section className="blocks-section">
        <h4>Blocks</h4>
        <div className="blocks-grid">
          {filtered.map((b) => (
            <BlockButton key={b.id} type={b.id} label={b.label} onAdd={onAdd} />
          ))}
        </div>
      </section>
    </aside>
  )
}
