import { memo, type CSSProperties } from 'react'
import type { BlockData } from '../../types/block'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import BlockContent from './BlockContent'

function blockStyle(props: BlockData['props']): CSSProperties {
  return {
    color: props.color,
    backgroundColor: props.backgroundColor,
    fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
    textAlign: props.align,
    padding: props.padding ? `${props.padding}px` : undefined,
    width: props.width ? `${props.width}%` : undefined,
  }
}

interface SortableBlockProps {
  block: BlockData
  isSelected: boolean
  onSelect: (id: string) => void
}

const SortableBlock = memo(function SortableBlock({
  block,
  isSelected,
  onSelect,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const props = block.props
  const propsStyle = blockStyle(props)
  const { color, fontSize, backgroundColor, ...layoutStyle } = propsStyle

  const dragStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  let wrapperStyle: CSSProperties = { ...layoutStyle, ...dragStyle }
  if (block.type === 'text' || block.type === 'heading') {
    wrapperStyle = { ...wrapperStyle, color, fontSize }
  }
  if (block.type === 'container') {
    wrapperStyle = { ...wrapperStyle, backgroundColor }
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(block.id)}
      className={`canvas-block ${block.type} ${isSelected ? 'selected' : ''}`}
      style={wrapperStyle}
    >
      <BlockContent block={block} />
    </div>
  )
})

export default SortableBlock
