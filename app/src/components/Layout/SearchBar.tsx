import React, { useCallback, useState, useRef } from 'react'
import ClearAdornment from '../helper/ClearAdornment'
import Search from '@material-ui/icons/Search'
import { AppState } from '../../reducers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { InputBase } from '@material-ui/core'
import { settingsActions } from '../../actions'
import { fade, Theme, withStyles } from '@material-ui/core/styles'
import { useGlobalKeyEventHandler } from '../../effects/useGlobalKeyEventHandler'
import { KeyCodes } from '../../utils/KeyCodes'

function SearchBar(props: {
  classes: any
  topicFilter?: string
  hasConnection: boolean
  actions: {
    settings: typeof settingsActions
  }
}) {
  const { actions, classes, hasConnection, topicFilter } = props

  const [hasFocus, setHasFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>()
  const onFocus = useCallback(() => setHasFocus(true), [])
  const onBlur = useCallback(() => setHasFocus(false), [])

  const clearFilter = useCallback(() => {
    actions.settings.filterTopics('')
  }, [])

  const onFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    actions.settings.filterTopics(event.target.value)
  }, [])

  useGlobalKeyEventHandler(undefined, event => {
    const isCharacter = event.key.length === 1
    const isAllowedControlCharacter = event.keyCode === KeyCodes.backspace || event.keyCode === KeyCodes.delete
    const tagNameBlacklist = ['INPUT', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'OPTION', 'FORM']

    const tagElementIsNotBlacklisted =
      document.activeElement && tagNameBlacklist.indexOf(document.activeElement.tagName) === -1

    if ((isCharacter || isAllowedControlCharacter) && !hasFocus && tagElementIsNotBlacklisted && hasConnection) {
      // Focus input field, no preventDefault the event will reach the input element after it has been focussed
      inputRef.current && inputRef.current.focus()
    }
  })

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        value={topicFilter}
        inputProps={{
          onFocus,
          onBlur,
          ref: inputRef,
        }}
        onChange={onFilterChange}
        placeholder="Search…"
        endAdornment={
          <div style={{ width: '24px', paddingRight: '8px' }}>
            <ClearAdornment variant="primary" action={clearFilter} value={topicFilter} />
          </div>
        }
        classes={{ root: classes.inputRoot, input: classes.inputInput }}
      />
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    topicFilter: state.settings.get('topicFilter'),
    hasConnection: Boolean(state.connection.connectionId),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      settings: bindActionCreators(settingsActions, dispatch),
    },
  }
}

const styles = (theme: Theme) => ({
  search: {
    position: 'relative' as 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    flexGrow: 1,
    maxWidth: '60%',

    [theme.breakpoints.up('md')]: {
      maxWidth: '30%',

      marginLeft: theme.spacing(4),
      width: 'auto' as 'auto',
    },
    [theme.breakpoints.up(750)]: {
      marginLeft: theme.spacing(4),
      width: 'auto' as 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute' as 'absolute',
    pointerEvents: 'none' as 'none',
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
  },
  inputRoot: {
    color: 'inherit' as 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SearchBar))
