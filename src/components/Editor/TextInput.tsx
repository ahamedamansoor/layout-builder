import { useCallback } from 'react'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  rows?: number
}

export default function TextInput({
  value,
  onChange,
  multiline,
  rows,
}: TextInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    [onChange]
  )

  if (multiline) {
    return <textarea value={value} onChange={handleChange} rows={rows ?? 3} />
  }

  return <input type="text" value={value} onChange={handleChange} />
}
