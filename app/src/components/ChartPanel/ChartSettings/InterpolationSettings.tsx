import * as React from 'react'
import { AppState } from '../../../reducers'
import { bindActionCreators } from 'redux'
import { chartActions } from '../../../actions'
import { ChartParameters, PlotCurveTypes } from '../../../reducers/Charts'
import { connect } from 'react-redux'
import { Menu, MenuItem, Typography } from '@material-ui/core'

function chartParametersForAction(chart: ChartParameters, action: string) {
  return {
    topic: chart.topic,
    dotPath: chart.dotPath,
    interpolation: action as any,
  }
}

const curves: Array<PlotCurveTypes> = ['curve', 'linear', 'step_after', 'step_before', 'cubic_basis_spline']

function InterpolationSettings(props: {
  chart: ChartParameters
  actions: {
    chart: typeof chartActions
  }
  anchorEl?: Element
  open: boolean
  close: () => void
}) {
  const callbacks = React.useMemo(() => {
    const createCurveCallback = (curve: PlotCurveTypes) => () => {
      props.actions.chart.updateChart(chartParametersForAction(props.chart, curve))
    }

    const callbacks: { [key: string]: () => void } = {}
    for (const curve of curves) {
      callbacks[curve] = createCurveCallback(curve)
    }
    return callbacks
  }, [curves])

  const menuItems = React.useMemo(() => {
    return curves.map((curve) => (
      <MenuItem key={curve} onClick={callbacks[curve]} selected={props.chart.interpolation === curve}>
        <Typography variant="inherit">{curve.replace(/_/g, ' ')}</Typography>
      </MenuItem>
    ))
  }, [curves, props.chart])

  return (
    <Menu anchorEl={props.anchorEl} open={props.open} onClose={props.close}>
      {menuItems}
    </Menu>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      chart: bindActionCreators(chartActions, dispatch),
    },
  }
}

export default connect(undefined, mapDispatchToProps)(InterpolationSettings)
