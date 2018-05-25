import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import State from './State'
import Button from './Button'

class App extends React.Component {
  componentDidMount() {
    this.props.addPlugin('accrue')
    this.props.addPlugin('increaseAccretionRate')
  }

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
                <Button key={plugin.type} plugin={plugin} />
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

const mapDispatchToProps = {
  addPlugin(type) {
    return {
      type: 'plugin-add',
      pluginType: type,
    }
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
