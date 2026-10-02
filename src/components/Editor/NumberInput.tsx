import { useCallback } from 'react'

interface NumberInputProps {
  value: string | number
  onChange: (value: string) => void
}

export default function NumberInput({ value, onChange }: NumberInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  )

  return <input type="number" value={value} onChange={handleChange} />
}
