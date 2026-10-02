import type { BlockData } from '../../types/block'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableBlock from './SortableBlock'

type Device = 'desktop' | 'tablet' | 'mobile'

const SIZES: Record<Device, string> = {
  desktop: '100%',
  tablet: '820px',
  mobile: '375px',
}

interface CanvasProps {
  blocks: BlockData[]
  selectedId: string | null
  onSelect: (id: string) => void
  device: Device
}

export default function Canvas({
  blocks,
  selectedId,
  onSelect,
  device,
}: CanvasProps) {
  return (
    <div className="canvas" style={{ maxWidth: SIZES[device] }}>
      {blocks.length === 0 ? (
        <p className="canvas-hint">Drag blocks here</p>
      ) : (
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="canvas-stack">
            {blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                isSelected={block.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  )
}
