import { memo, useCallback } from 'react'
import type { BlockType } from '../../types/block'

const ICON_LABELS: Record<BlockType, string> = {
  text: 'T',
  heading: 'H',
  image: 'Img',
  button: 'Btn',
  container: 'C',
  divider: '—',
}

interface BlockButtonProps {
  type: BlockType
  label: string
  onAdd: (type: BlockType) => void
}

const BlockButton = memo(function BlockButton({ type, label, onAdd }: BlockButtonProps) {
  const handleClick = useCallback(() => onAdd(type), [onAdd, type])

  return (
    <div
      className="block-tile"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <span className="block-icon">{ICON_LABELS[type]}</span>
      <span>{label}</span>
    </div>
  )
})

export default BlockButton
