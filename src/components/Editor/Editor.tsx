import type { BlockData, BlockProps, FontStyle, FontWeight } from '../../types/block'
import AlignmentInput from './AlignmentInput'
import Field from './Field'
import FontStyleInput from './FontStyleInput'
import NumberInput from './NumberInput'
import TextInput from './TextInput'
import URLInput from './URLInput'

function maybeNumber(value: string): number | undefined {
  const n = Number(value)
  return value && !Number.isNaN(n) ? n : undefined
}

interface EditorProps {
  block?: BlockData
  onUpdate: (id: string, updates: Partial<BlockProps>) => void
  onDelete?: (id: string) => void
}

export default function Editor({ block, onUpdate, onDelete }: EditorProps) {
  if (!block) {
    return (
      <aside className="editor-panel">
        <p className="editor-hint">Select a block to edit</p>
      </aside>
    )
  }

  const { id, type, props } = block

  const setText = (v: string) => onUpdate(id, { text: v || undefined })
  const setFontSize = (v: string) => onUpdate(id, { fontSize: maybeNumber(v) })
  const setColor = (v: string) => onUpdate(id, { color: v || undefined })
  const setFontStyle = (fontWeight: FontWeight, fontStyle: FontStyle) =>
    onUpdate(id, { fontWeight, fontStyle })
  const setBackgroundColor = (v: string) =>
    onUpdate(id, { backgroundColor: v || undefined })
  const setAlign = (v: 'left' | 'center' | 'right') =>
    onUpdate(id, { align: v })
  const setPadding = (v: string) => onUpdate(id, { padding: maybeNumber(v) })
  const setWidth = (v: string) => {
    const n = maybeNumber(v)
    onUpdate(id, { width: n === undefined ? undefined : Math.min(Math.max(n, 0), 100) })
  }
  const setUrl = (v: string) => onUpdate(id, { url: v || undefined })

  return (
    <aside className="editor-panel">
      <div className="editor-header">
        <span className="editor-title">{type}</span>
        <span className="editor-id">{id}</span>
      </div>

      {(type === 'text' || type === 'heading' || type === 'button') && (
        <Field label="Content">
          <TextInput
            value={props.text ?? ''}
            onChange={setText}
            multiline
            rows={4}
          />
        </Field>
      )}

      {(type === 'text' || type === 'heading') && (
        <Field label="Font size">
          <NumberInput value={props.fontSize ?? ''} onChange={setFontSize} />
        </Field>
      )}

      {(type === 'text' || type === 'heading' || type === 'button') && (
        <Field label="Color">
          <TextInput value={props.color ?? ''} onChange={setColor} />
        </Field>
      )}

      {(type === 'text' || type === 'heading') && (
        <Field label="Font style">
          <FontStyleInput
            fontWeight={props.fontWeight}
            fontStyle={props.fontStyle}
            onChange={setFontStyle}
          />
        </Field>
      )}

      {(type === 'button' || type === 'container') && (
        <Field label="Background">
          <TextInput
            value={props.backgroundColor ?? ''}
            onChange={setBackgroundColor}
          />
        </Field>
      )}

      {type === 'container' && (
        <Field label="Padding">
          <NumberInput value={props.padding ?? ''} onChange={setPadding} />
        </Field>
      )}

      {type === 'image' && (
        <Field label="Size">
          <NumberInput value={props.width ?? ''} onChange={setWidth} />
        </Field>
      )}

      {(type === 'image' || type === 'button') && (
        <Field label="URL">
          <URLInput value={props.url ?? ''} onChange={setUrl} />
        </Field>
      )}

      {type !== 'divider' && type !== 'image' && (
        <Field label="Alignment">
          <AlignmentInput value={props.align} onChange={setAlign} />
        </Field>
      )}

      {onDelete && (
        <div className="editor-actions">
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(id)}
          >
            Delete block
          </button>
        </div>
      )}
    </aside>
  )
}
