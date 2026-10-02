import { useCallback, useRef } from 'react'

interface ToolbarProps {
  onImport: (data: unknown) => void
  onExport: () => string
  onSave: () => void
  onUndo: () => void
  onRedo: () => void
  hasBlocks: boolean
  canUndo: boolean
  canRedo: boolean
}

export default function Toolbar({
  onImport,
  onExport,
  onSave,
  onUndo,
  onRedo,
  hasBlocks,
  canUndo,
  canRedo,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = useCallback(() => {
    const json = onExport()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'layout.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [onExport])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string)
          onImport(data)
        } catch {
          alert('Invalid JSON file')
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
      reader.readAsText(file)
    },
    [onImport]
  )

  return (
    <div className="header-right">
      <button
        className="icon-btn"
        aria-label="Undo"
        onClick={onUndo}
        disabled={!canUndo}
      >
        ↩
      </button>
      <button
        className="icon-btn"
        aria-label="Redo"
        onClick={onRedo}
        disabled={!canRedo}
      >
        ↪
      </button>
      <button
        className="btn ghost"
        onClick={() => fileInputRef.current?.click()}
      >
        Import JSON
      </button>
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button className="btn ghost" onClick={handleExport} disabled={!hasBlocks}>
        Export
      </button>
      <button className="btn primary" onClick={onSave} disabled={!hasBlocks}>
        Save layout
      </button>
    </div>
  )
}
