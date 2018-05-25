import React from 'react'
import { connect } from 'react-redux'
import { selectors } from './reducer'

const Button = (props) => (
  <button
    disabled={!props.enabled}
    onClick={props.execute}
    className="Button"
    >{props.text}</button>
)

const mapStateToProps = (state, ownProps) => {
  const { plugin } = ownProps
  return {
    enabled: selectors.isEnabled(plugin, state),
    text: plugin.text,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    execute() {
      dispatch({
        type: 'plugin-execute',
        pluginType: ownProps.plugin.type,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button)
