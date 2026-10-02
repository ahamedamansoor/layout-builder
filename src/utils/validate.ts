import type { BlockData, BlockType, BlockProps } from '../types/block'

const ALLOWED_TYPES: BlockType[] = ['text', 'heading', 'image', 'button', 'container', 'divider']
const ALLOWED_ALIGN = ['left', 'center', 'right']

function isValidColor(color: string): boolean {
  if (color === '') return true
  if (typeof window !== 'undefined' && CSS.supports('color', color)) return true
  return /^#([0-9a-fA-F]{3}){1,2}$/.test(color)
}

function sanitizeUrl(url: string): string {
  if (url === '' || url.startsWith('#')) return url
  try {
    const parsed = new URL(url, window.location.href)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href
    }
    return ''
  } catch {
    return ''
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max)
}

function sanitizeProps(raw: unknown): BlockProps {
  if (typeof raw !== 'object' || raw === null) return {}

  const input = raw as Record<string, unknown>
  const props: BlockProps = {}

  if (typeof input.text === 'string') props.text = input.text
  if (typeof input.url === 'string') props.url = sanitizeUrl(input.url)

  if (typeof input.color === 'string' && isValidColor(input.color)) {
    props.color = input.color
  }
  if (typeof input.backgroundColor === 'string' && isValidColor(input.backgroundColor)) {
    props.backgroundColor = input.backgroundColor
  }

  if (typeof input.fontSize === 'number' && Number.isFinite(input.fontSize)) {
    props.fontSize = input.fontSize
  }

  if (typeof input.fontWeight === 'number' && Number.isFinite(input.fontWeight)) {
    props.fontWeight = input.fontWeight >= 600 ? 700 : 400
  }

  if (typeof input.fontStyle === 'string' && (input.fontStyle === 'normal' || input.fontStyle === 'italic')) {
    props.fontStyle = input.fontStyle
  }

  if (typeof input.align === 'string' && ALLOWED_ALIGN.includes(input.align)) {
    props.align = input.align as BlockProps['align']
  }

  if (typeof input.width === 'number' && Number.isFinite(input.width)) {
    if (input.width < 0 || input.width > 100) {
      throw new Error(`Width must be between 0% and 100% (got ${input.width}%)`)
    }
    props.width = input.width
  }

  if (typeof input.padding === 'number' && Number.isFinite(input.padding)) {
    props.padding = clamp(input.padding, 0, 64)
  }

  return props
}

export function validateLayout(
  value: unknown
): { success: true; data: BlockData[] } | { success: false; error: string } {
  if (!Array.isArray(value)) {
    return { success: false, error: 'Layout must be an array of blocks' }
  }

  const blocks: BlockData[] = []

  for (const item of value) {
    if (typeof item !== 'object' || item === null) {
      return { success: false, error: 'Each layout item must be an object' }
    }

    const { id, type, props } = item as Record<string, unknown>

    if (typeof id !== 'string' || id.length === 0) {
      return { success: false, error: 'Every block must have a non-empty string id' }
    }

    if (!ALLOWED_TYPES.includes(type as BlockType)) {
      return { success: false, error: `Invalid or unsupported block type: ${type}` }
    }

    try {
      blocks.push({
        id,
        type: type as BlockType,
        props: sanitizeProps(props),
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid block data'
      return { success: false, error: `Block ${id}: ${message}` }
    }
  }

  return { success: true, data: blocks }
}
