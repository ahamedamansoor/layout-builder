import { useCallback } from 'react'

type Device = 'desktop' | 'tablet' | 'mobile'

const DEVICES: { id: Device; label: string }[] = [
  { id: 'desktop', label: 'D' },
  { id: 'tablet', label: 'T' },
  { id: 'mobile', label: 'M' },
]

interface DeviceSwitcherProps {
  device: Device
  onChange: (device: Device) => void
}

export default function DeviceSwitcher({ device, onChange }: DeviceSwitcherProps) {
  const handleClick = useCallback(
    (d: Device) => () => onChange(d),
    [onChange]
  )

  return (
    <>
      {DEVICES.map((d) => (
        <button
          key={d.id}
          type="button"
          className={`device-btn ${device === d.id ? 'active' : ''}`}
          aria-label={`${d.id} view`}
          onClick={handleClick(d.id)}
        >
          {d.label}
        </button>
      ))}
    </>
  )
}
