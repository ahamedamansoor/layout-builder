import { useEffect, useState } from 'react'
import './App.css'
import { useBuilder } from './hooks/useBuilder'
import Header from './components/Header/Header'
import Block from './components/Block/Block'
import Show from './components/Show/Show'
import Editor from './components/Editor/Editor'
import ConfirmModal from './components/ConfirmModal'
import LandingPage from './components/LandingPage'

type Device = 'desktop' | 'tablet' | 'mobile'

function App() {
  const builder = useBuilder()
  const [device, setDevice] = useState<Device>('desktop')
  const [mode, setMode] = useState<'landing' | 'builder'>('landing')
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (builder.blocks.length > 0) {
        e.preventDefault()
        e.returnValue = 'You have unsaved changes in the canvas.'
        return e.returnValue
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [builder.blocks])

  const startNew = () => {
    builder.reset()
    setMode('builder')
  }

  const handleImportFromLanding = (data: unknown) => {
    builder.importData(data)
    setMode('builder')
  }

  const requestSave = () => setShowSaveConfirm(true)

  const handleSave = () => {
    builder.save()
    setShowSaveConfirm(false)
  }

  const requestClear = () => {
    if (builder.blocks.length === 0) {
      builder.clear()
    } else {
      setShowClearConfirm(true)
    }
  }

  if (mode === 'landing') {
    return (
      <LandingPage onNew={startNew} onImport={handleImportFromLanding} />
    )
  }

  return (
    <div className="layout-app">
      <Header
        onImport={builder.importData}
        onExport={builder.exportData}
        onSave={requestSave}
        onUndo={builder.undo}
        onRedo={builder.redo}
        onClear={requestClear}
        hasBlocks={builder.hasBlocks}
        canUndo={builder.canUndo}
        canRedo={builder.canRedo}
        device={device}
        onDeviceChange={setDevice}
      />
      <div className="layout-workspace">
        <Block onAdd={builder.addBlock} />
        <Show
          blocks={builder.blocks}
          onMove={builder.moveBlock}
          selectedId={builder.selectedId}
          onSelect={builder.selectBlock}
          device={device}
        />
        {builder.selectedBlock && (
          <Editor
            block={builder.selectedBlock}
            onUpdate={builder.updateBlock}
            onDelete={builder.deleteBlock}
          />
        )}
      </div>
      <ConfirmModal
        isOpen={showClearConfirm}
        title="Clear canvas"
        message="This will remove all blocks from the canvas. Are you sure?"
        confirmLabel="Clear"
        cancelLabel="Cancel"
        onConfirm={() => {
          builder.clear()
          setShowClearConfirm(false)
        }}
        onCancel={() => setShowClearConfirm(false)}
      />
      <ConfirmModal
        isOpen={showSaveConfirm}
        title="Save layout"
        message="This will overwrite the saved layout in your browser. Continue?"
        confirmLabel="Save"
        cancelLabel="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowSaveConfirm(false)}
      />
    </div>
  )
}

export default App
