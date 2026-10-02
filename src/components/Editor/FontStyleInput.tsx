import { useCallback } from 'react'
import type { FontStyle, FontWeight } from '../../types/block'

interface FontStyleInputProps {
  fontWeight?: FontWeight
  fontStyle?: FontStyle
  onChange: (fontWeight: FontWeight, fontStyle: FontStyle) => void
}

export default function FontStyleInput({
  fontWeight,
  fontStyle,
  onChange,
}: FontStyleInputProps) {
  const isBold = fontWeight === 700
  const isItalic = fontStyle === 'italic'

  const toggleBold = useCallback(() => {
    onChange(isBold ? 400 : 700, fontStyle ?? 'normal')
  }, [isBold, fontStyle, onChange])

  const toggleItalic = useCallback(() => {
    onChange(fontWeight ?? 400, isItalic ? 'normal' : 'italic')
  }, [isItalic, fontWeight, onChange])

  return (
    <div className="font-style-control">
      <button
        type="button"
        className={`font-style-btn${isBold ? ' active' : ''}`}
        onClick={toggleBold}
        aria-label="Toggle bold"
      >
        B
      </button>
      <button
        type="button"
        className={`font-style-btn${isItalic ? ' active' : ''}`}
        onClick={toggleItalic}
        aria-label="Toggle italic"
        style={{ fontStyle: 'italic' }}
      >
        I
      </button>
    </div>
  )
}
