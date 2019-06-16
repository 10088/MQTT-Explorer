import * as diff from 'diff'
import * as q from '../../../../../backend/src/Model'
import * as React from 'react'
import Add from '@material-ui/icons/Add'
import ChartPreview from './ChartPreview'
import Remove from '@material-ui/icons/Remove'
import ShowChart from '@material-ui/icons/ShowChart'
import { Theme, Tooltip } from '@material-ui/core'
import { JsonPropertyLocation } from '../../../../../backend/src/JsonAstParser'
import { lineChangeStyle, trimNewlineRight } from './util'
import { withStyles } from '@material-ui/styles'

interface Props {
  changes: Array<diff.Change>
  literalPositions: Array<JsonPropertyLocation>
  classes: any
  className: string
  treeNode: q.TreeNode<any>
}

const style = (theme: Theme) => {
  const icon = {
    verticalAlign: 'top',
    width: '12px',
    height: '12px',
    marginTop: '2px',
    borderRadius: '50%',
  }

  return {
    icon,
    iconButton: {
      ...icon,
      marginTop: '0px',
      width: '16px',
      height: '16px',
      padding: '2px',
      '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      },
    },
    gutterLine: {
      textAlign: 'right' as 'right',
      paddingRight: theme.spacing(0.5),
      height: '16px',
      width: '100%',
    },
  }
}

function tokensForLine(change: diff.Change, line: number, props: Props) {
  const { classes, literalPositions } = props
  const literal = literalPositions[line]

  let chartPreview = null
  if (literal) {
    chartPreview = (
      <ChartPreview treeNode={props.treeNode} classes={{ icon: props.classes.iconButton }} literal={literal} />
    )
  }

  if (change.added) {
    return [chartPreview, <Add key="add" className={classes.icon} />]
  } else if (change.removed) {
    return [<Remove key="remove" className={classes.icon} />]
  } else {
    return [
      chartPreview,
      <div
        key="placeholder"
        style={{ width: '12px', display: 'inline-block' }}
        dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
      />,
    ]
  }
}

function Gutters(props: Props) {
  let currentLine = -1
  const gutters = props.changes
    .map((change, key) => {
      return trimNewlineRight(change.value)
        .split('\n')
        .map((_, idx) => {
          currentLine = !change.removed ? currentLine + 1 : currentLine
          return (
            <div key={`${key}-${idx}`} style={lineChangeStyle(change)} className={props.classes.gutterLine}>
              {tokensForLine(change, currentLine, props)}
            </div>
          )
        })
    })
    .reduce((a, b) => a.concat(b), [])

  return (
    <span>
      <pre className={props.className}>{gutters}</pre>
    </span>
  )
}

export default withStyles(style)(Gutters)
