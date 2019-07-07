import QosSelect from './QosSelect'
import React from 'react'
import { Checkbox, FormControlLabel, Tooltip } from '@material-ui/core'
import { publishActions } from '../../../actions'
import { bindActionCreators } from 'redux'
import { AppState } from '../../../reducers'
import { connect } from 'react-redux'

export function RetainSwitch(props: { retain: boolean; actions: typeof publishActions }) {
  const labelStyle = { margin: '0 8px 0 8px' }
  return (
    <div style={{ marginTop: '8px', clear: 'both' }}>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <FormControlLabel style={labelStyle} control={<QosSelect />} label="QoS" labelPlacement="start" />
        <Tooltip
          title="Retained messages only appear to be retained, when client subscribes after the initial publish."
          placement="top"
        >
          <FormControlLabel
            value="retain"
            style={labelStyle}
            control={<Checkbox color="primary" checked={props.retain} onChange={props.actions.toggleRetain} />}
            label="retain"
            labelPlacement="end"
          />
        </Tooltip>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(publishActions, dispatch),
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    retain: state.publish.retain,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetainSwitch)
