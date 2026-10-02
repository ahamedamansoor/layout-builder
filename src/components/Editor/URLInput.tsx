import { useCallback } from 'react'
import { sanitizeUrl } from '../../utils/helpers'

interface URLInputProps {
  value: string
  onChange: (value: string) => void
}

export default function URLInput({ value, onChange }: URLInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  )

  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      {value && !sanitizeUrl(value) && (
        <span className="field-error">Only http(s) links are allowed</span>
      )}
    </>
  )
}
