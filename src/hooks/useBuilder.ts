import { useCallback, useEffect, useMemo, useState } from 'react'
import type { BlockData, BlockProps, BlockType } from '../types/block'
import { createBlock } from '../utils/helpers'
import { serialize, deserialize, STORAGE_KEY } from '../utils/serialize'
import { validateLayout } from '../utils/validate'

export interface UseBuilderReturn {
  blocks: BlockData[]
  selectedId: string | null
  selectedBlock: BlockData | undefined
  hasBlocks: boolean
  canUndo: boolean
  canRedo: boolean
  addBlock: (type: BlockType) => void
  moveBlock: (from: number, to: number) => void
  updateBlock: (id: string, updates: Partial<BlockProps>) => void
  deleteBlock: (id: string) => void
  selectBlock: (id: string | null) => void
  importData: (data: unknown) => void
  exportData: () => string
  save: () => void
  reset: () => void
  undo: () => void
  redo: () => void
  clear: () => void
}

export function useBuilder(): UseBuilderReturn {
  const [blocks, setBlocks] = useState<BlockData[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const result = deserialize(raw)
      if (result.success) return result.data
    } catch {
      // ignore
    }
    return []
  })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [past, setPast] = useState<BlockData[][]>([])
  const [future, setFuture] = useState<BlockData[][]>([])

  const commit = useCallback(
    (updater: (prev: BlockData[]) => BlockData[]) => {
      setPast((p) => [...p, blocks])
      setFuture([])
      setBlocks(updater)
    },
    [blocks]
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, serialize(blocks))
    } catch {
      // ignore
    }
  }, [blocks])

  const addBlock = useCallback(
    (type: BlockType) => {
      commit((prev) => [...prev, createBlock(type)])
    },
    [commit]
  )

  const moveBlock = useCallback(
    (from: number, to: number) => {
      commit((prev) => {
        if (
          from === to ||
          from < 0 ||
          from >= prev.length ||
          to < 0 ||
          to >= prev.length
        ) {
          return prev
        }
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        next.splice(to, 0, moved)
        return next
      })
    },
    [commit]
  )

  const updateBlock = useCallback(
    (id: string, updates: Partial<BlockProps>) => {
      commit((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, props: { ...b.props, ...updates } } : b
        )
      )
    },
    [commit]
  )

  const deleteBlock = useCallback(
    (id: string) => {
      commit((prev) => prev.filter((b) => b.id !== id))
      setSelectedId((current) => (current === id ? null : current))
    },
    [commit]
  )

  const importData = useCallback(
    (data: unknown) => {
      const result = validateLayout(data)
      if (!result.success) {
        alert(result.error)
        return
      }
      commit(() => result.data)
    },
    [commit]
  )

  const exportData = useCallback(() => serialize(blocks), [blocks])

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, serialize(blocks))
    } catch {
      // ignore
    }
  }, [blocks])

  const reset = useCallback(() => {
    setBlocks([])
    setSelectedId(null)
    setPast([])
    setFuture([])
  }, [])

  const undo = useCallback(() => {
    if (past.length === 0) return
    const previous = past[past.length - 1]
    setFuture((f) => [blocks, ...f])
    setPast((p) => p.slice(0, -1))
    setBlocks(() => previous)
  }, [past, blocks])

  const redo = useCallback(() => {
    if (future.length === 0) return
    const next = future[0]
    setPast((p) => [...p, blocks])
    setFuture((f) => f.slice(1))
    setBlocks(() => next)
  }, [future, blocks])

  const clear = useCallback(() => {
    commit(() => [])
    setSelectedId(null)
  }, [commit])

  const selectedBlock = useMemo(
    () => blocks.find((b) => b.id === selectedId),
    [blocks, selectedId]
  )

  return {
    blocks,
    selectedId,
    selectedBlock,
    hasBlocks: blocks.length > 0,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    addBlock,
    moveBlock,
    updateBlock,
    deleteBlock,
    selectBlock: setSelectedId,
    importData,
    exportData,
    save,
    reset,
    undo,
    redo,
    clear,
  }
}
