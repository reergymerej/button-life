import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import State from './State'
import Button from './Button'

class App extends React.Component {
  render() {
    const { plugins } = this.props
    return (
      <div className="App">
        <h1>Button Life</h1>
        <div className="content">
          <State />
          <div className="buttons">
            {
              plugins.map(plugin =>
                <Button key={plugin.name} plugin={plugin} />
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  plugins: state.plugins,
})

export default connect(mapStateToProps)(App)
