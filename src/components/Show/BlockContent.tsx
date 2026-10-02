import { memo } from 'react'
import type { BlockData } from '../../types/block'
import { sanitizeUrl } from '../../utils/helpers'

interface BlockContentProps {
  block: BlockData
}

const BlockContent = memo(function BlockContent({ block }: BlockContentProps) {
  const { type, props } = block
  const textStyle = {
    color: props.color,
    fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
    fontWeight: props.fontWeight,
    fontStyle: props.fontStyle,
  }
  const buttonStyle = {
    color: props.color,
    backgroundColor: props.backgroundColor,
  }
  const imageUrl = sanitizeUrl(props.url)

  switch (type) {
    case 'heading':
      return <h2 style={textStyle}>{props.text}</h2>
    case 'text':
      return <p style={textStyle}>{props.text}</p>
    case 'image':
      return imageUrl ? (
        <img src={imageUrl} alt="" />
      ) : (
        <div className="image-placeholder">
          <p>Image — add an https URL</p>
        </div>
      )
    case 'button':
      return (
        <button type="button" style={buttonStyle}>
          {props.text}
        </button>
      )
    case 'container':
      return <div>{props.text || 'Container'}</div>
    case 'divider':
      return <hr />
  }
})

export default BlockContent
