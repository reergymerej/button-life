import React from 'react'
import { connect } from 'react-redux'

const Button = (props) => (
  <button
    disabled={props.disabled}
    onClick={props.onClick}
    className="Button"
    >{props.text}</button>
)

const AccrueAssets = (props) => (
  <Button
    text="Accrue Assets"
    disabled={props.disabled}
    onClick={props.accrueAssets}
  />
)

const mapStateToProps = state => ({
  disabled: false,
})

const mapDispatchToProps = {
  accrueAssets: () => {
    return {
      type: 'accrueAssets',
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccrueAssets)
