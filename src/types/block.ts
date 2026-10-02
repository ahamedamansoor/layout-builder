export type BlockType = 'text' | 'heading' | 'image' | 'button' | 'container' | 'divider'

export type FontWeight = 400 | 700
export type FontStyle = 'normal' | 'italic'

export interface BlockProps {
  text?: string
  url?: string
  color?: string
  backgroundColor?: string
  fontSize?: number
  fontWeight?: FontWeight
  fontStyle?: FontStyle
  align?: 'left' | 'center' | 'right'
  width?: number
  padding?: number
}

export interface BlockData {
  id: string
  type: BlockType
  props: BlockProps
}
