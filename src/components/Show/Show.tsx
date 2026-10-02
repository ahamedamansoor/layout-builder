import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { BlockData } from '../../types/block'
import Canvas from './Canvas'

type Device = 'desktop' | 'tablet' | 'mobile'

interface ShowProps {
  blocks: BlockData[]
  onMove: (from: number, to: number) => void
  selectedId: string | null
  onSelect: (id: string) => void
  device: Device
}

export default function Show({
  blocks,
  onMove,
  selectedId,
  onSelect,
  device,
}: ShowProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const from = blocks.findIndex((b) => b.id === active.id)
    const to = blocks.findIndex((b) => b.id === over.id)
    if (from !== -1 && to !== -1) {
      onMove(from, to)
    }
  }

  return (
    <main className="show-area">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Canvas
          blocks={blocks}
          selectedId={selectedId}
          onSelect={onSelect}
          device={device}
        />
      </DndContext>
    </main>
  )
}
