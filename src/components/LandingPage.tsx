import { useCallback, useRef } from 'react'
import Brand from './Header/Brand'

interface LandingPageProps {
  onNew: () => void
  onImport: (data: unknown) => void
}

export default function LandingPage({ onNew, onImport }: LandingPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    <div className="landing-page">
      <div className="landing-card">
        <div className="landing-preview" aria-hidden="true">
          <div className="preview-block preview-block-1" />
          <div className="preview-row">
            <div className="preview-block preview-block-2" />
            <div className="preview-block preview-block-3" />
          </div>
        </div>
        <Brand />
        <div className="landing-actions">
          <button className="btn landing-btn primary" onClick={onNew}>
            New layout
          </button>
          <button
            className="btn landing-btn ghost"
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
        </div>
      </div>
    </div>
  )
}
