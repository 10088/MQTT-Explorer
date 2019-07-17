import * as React from 'react'
import ChartSettings from '.'
import CustomIconButton from '../../helper/CustomIconButton'
import MoreVertIcon from '@material-ui/icons/Settings'
import { ChartParameters } from '../../../reducers/Charts'

export function SettingsButton(props: {
  parameters: ChartParameters
  resetDataAction: () => void
  menuAnchor: React.MutableRefObject<undefined>
}) {
  const [visible, setVisible] = React.useState(false)
  const toggleSettings = React.useCallback(() => {
    setVisible(!visible)
  }, [visible])

  const close = React.useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <span>
      <ChartSettings
        open={visible}
        close={close}
        anchorEl={props.menuAnchor}
        chart={props.parameters}
        resetDataAction={props.resetDataAction}
      />
      <CustomIconButton tooltip="Chart settings" onClick={toggleSettings}>
        <MoreVertIcon
          data-test-type="ChartSettings"
          data-test={`${props.parameters.topic}-${props.parameters.dotPath || ''}`}
        />
      </CustomIconButton>
    </span>
  )
}
