import React from 'react'
import { connect } from 'react-redux'
import { selectors } from './reducer'

const State = (props) => (
  <div className="State">
    {Object.keys(props.values).map(key => (
      <div key={key}>
        {key}: {props.values[key]}
      </div>
    ))}
  </div>
)

const mapStateToProps = state => ({
  values: selectors.getVisibleStateValues(state),
})

export default connect(mapStateToProps)(State)
