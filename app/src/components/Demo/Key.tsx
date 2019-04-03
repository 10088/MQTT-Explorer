import * as React from 'react'
import { Theme, withStyles } from '@material-ui/core'

interface Props {
  keyboardKey: string
  classes: any
}

class Key extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props)
    this.state = { location: 'bottom' }
  }

  public render() {

    return (
      <div className={this.props.classes.keyStyle}>
        <div className={this.props.classes.keyTextStyle}>{this.props.keyboardKey}</div>
      </div>
    )
  }
}

const style = (theme: Theme) => ({
  keyStyle: {
    display: 'inline-block' as 'inline-block',
    width: '1em',
    height: '1em',
    backgroundColor: '#bbb',
    borderRadius: '10%',
    verticalAlign: 'middle' as 'middle',
    textAlign: 'center' as 'center',
    textShadow: '1px 1px rgba(255,255,255,0.45)',
    boxShadow: '0.08em 0.15em 0.01em 0px rgba(100,100,100,0.75)',
  },
  keyTextStyle: {
    marginTop: '0.65em',
    fontSize: '0.4em',
    fontWeight: 'bold' as 'bold',
  },
})

export default withStyles(style)(Key)
