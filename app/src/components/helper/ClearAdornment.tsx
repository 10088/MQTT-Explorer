import * as React from 'react'
import Clear from '@material-ui/icons/Clear'
import { IconButton, Theme } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'

interface Props {
  value?: string
  action: any
  style?: React.CSSProperties
  variant?: 'primary'
  theme: Theme
}

/**
 * Clear button for text input fields
 */
function ClearAdornment(props: Props) {
  if (!props.value) {
    return null
  }

  const color = props.variant === 'primary' ? props.theme.palette.primary.contrastText : undefined
  return (
    <IconButton style={{ ...props.style, padding: '1px' }} onClick={props.action}>
      <Clear style={{ color, fontSize: '16px' }} />
    </IconButton>
  )
}

export default withTheme(ClearAdornment)
