import type { BlockData } from '../types/block'
import { validateLayout } from './validate'

export const STORAGE_KEY = 'layout-builder-layout'

export function serialize(blocks: BlockData[]): string {
  return JSON.stringify(blocks, null, 2)
}

export function deserialize(
  json: string
): { success: true; data: BlockData[] } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(json)
    return validateLayout(parsed)
  } catch {
    return { success: false, error: 'Invalid JSON' }
  }
}
