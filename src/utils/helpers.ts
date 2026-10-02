import type { BlockData, BlockType, BlockProps } from '../types/block'

let counter = 0

export function generateId(): string {
  return `block-${Date.now().toString(36)}-${++counter}`
}

const defaults: Record<BlockType, BlockProps> = {
  text: {
    text: 'Edit this text',
    color: '#08060d',
    fontSize: 18,
    align: 'left',
  },
  heading: {
    text: 'Heading text',
    color: '#08060d',
    fontSize: 32,
    align: 'left',
  },
  image: {
    url: '',
    align: 'center',
    width: 100,
  },
  button: {
    text: 'Click me',
    url: '',
    color: '#fff',
    backgroundColor: '#4f46e5',
    align: 'center',
  },
  container: {
    backgroundColor: '#f4f3ec',
    padding: 16,
    align: 'left',
    width: 100,
  },
  divider: {
    align: 'left',
    width: 100,
  },
}

export function createBlock(type: BlockType): BlockData {
  return {
    id: generateId(),
    type,
    props: { ...defaults[type] },
  }
}

export function sanitizeUrl(url?: string): string | undefined {
  if (!url) return undefined
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return undefined
}
