import React from 'react'
import { connect } from 'react-redux'

const State = (props) => (
  <div className="State">
    {props.assets}
  </div>
)


const mapStateToProps = state => ({
  assets: state.assets,
})

export default connect(mapStateToProps)(State)
