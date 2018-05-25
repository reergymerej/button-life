import React from 'react'
import { connect } from 'react-redux'

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
  values: {
    clicks: state.clicks,
    assets: state.assets,
  },
})

export default connect(mapStateToProps)(State)
