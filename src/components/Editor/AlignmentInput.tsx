import { useCallback } from 'react'

type Align = 'left' | 'center' | 'right'

interface AlignmentInputProps {
  value?: Align
  onChange: (value: Align) => void
}

const OPTIONS: Align[] = ['left', 'center', 'right']

export default function AlignmentInput({ value, onChange }: AlignmentInputProps) {
  const handleClick = useCallback(
    (a: Align) => () => onChange(a),
    [onChange]
  )

  return (
    <div className="alignment-control">
      {OPTIONS.map((a) => (
        <button
          key={a}
          type="button"
          className={`alignment-btn ${value === a ? 'active' : ''}`}
          onClick={handleClick(a)}
        >
          {a}
        </button>
      ))}
    </div>
  )
}
