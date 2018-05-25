import React from 'react'
import { connect } from 'react-redux'
import { selectors } from './reducer'

const StateItem = (props) => (
  <div className="StateItem">
    <label>{props.name}</label>: <span className="value">{Math.round(props.value * 100) / 100}</span>
  </div>
)

const State = (props) => (
  <div className="State">
    {Object.keys(props.values).map(key => (
      <StateItem key={key}
        name={key}
        value={props.values[key]}
      />
    ))}
  </div>
)

const mapStateToProps = state => ({
  values: selectors.getVisibleStateValues(state),
})

export default connect(mapStateToProps)(State)
