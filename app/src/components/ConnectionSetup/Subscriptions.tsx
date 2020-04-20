import React, { useCallback, useState } from 'react'
import Delete from '@material-ui/icons/Delete'
import { connectionManagerActions } from '../../actions'
import { ConnectionOptions } from '../../model/ConnectionOptions'
import {
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Theme,
} from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'

function Subscriptions(props: {
  classes: any
  connection: ConnectionOptions
  managerActions: typeof connectionManagerActions
}) {
  const { classes, connection, managerActions } = props

  return (
    <TableContainer component={Paper} className={`${classes.topicList} advanced-connection-settings-topic-list`}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" padding="checkbox" className={classes.tableTitleCell}></TableCell>
            <TableCell className={classes.tableTitleCell}>Topic</TableCell>
            <TableCell align="right" className={classes.tableTitleCell}>
              QoS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {connection.subscriptions.map(subscription => (
            <TableRow key={subscription.topic + '_qos_' + subscription.qos}>
              <TableCell align="right" className={classes.tableCell}>
                <IconButton
                  onClick={() => managerActions.deleteSubscription(subscription, connection.id)}
                  style={{ padding: '6px' }}
                >
                  <Delete />
                </IconButton>
              </TableCell>

              <TableCell component="th" scope="row" className={classes.tableCell}>
                {subscription.topic}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {subscription.qos}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    managerActions: bindActionCreators(connectionManagerActions, dispatch),
  }
}

const styles = (theme: Theme) => ({
  tableCell: {
    paddingTop: 0,
    paddingBottom: 0,
    wordBbreak: 'break-word',
  },
  tableTitleCell: {
    paddingTop: `${theme.spacing(0.5)}px`,
    paddingBottom: `${theme.spacing(0.5)}px`,
  },
  topicList: {
    height: '196px',
    overflowY: 'scroll' as 'scroll',
    margin: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 ${theme.spacing(1)}px`,
    backgroundColor: theme.palette.background.default,
    width: 'auto',
  },
})

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(Subscriptions))
