import Brand from './Brand'
import DeviceSwitcher from './DeviceSwitcher'
import Toolbar from './Toolbar'

type Device = 'desktop' | 'tablet' | 'mobile'

interface HeaderProps {
  onImport: (data: unknown) => void
  onExport: () => string
  onSave: () => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  hasBlocks: boolean
  canUndo: boolean
  canRedo: boolean
  device: Device
  onDeviceChange: (device: Device) => void
}

export default function Header(props: HeaderProps) {
  const { device, onDeviceChange, onClear, hasBlocks, ...toolbarProps } = props
  return (
    <header className="app-header">
      <Brand />
      <div className="header-center-group">
        <div className="header-center">
          <DeviceSwitcher device={device} onChange={onDeviceChange} />
        </div>
        {hasBlocks && (
          <button type="button" className="btn ghost" onClick={onClear}>
            Clear layout
          </button>
        )}
      </div>
      <Toolbar {...toolbarProps} hasBlocks={hasBlocks} />
    </header>
  )
}
