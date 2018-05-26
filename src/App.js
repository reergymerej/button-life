import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import State from './State'
import Button from './Button'

const nextPlugins = [
]

const activePlugins = [
  'accrue',
  'accretion',
  'fatigue',
  'insomnia',
  'defend',
]

class App extends React.Component {
  componentDidMount() {
    activePlugins.forEach(plugin =>
      this.props.addPlugin(plugin)
    )
  }

  handleNextClick = () => {
    const plugin = nextPlugins.shift()
    activePlugins.push(plugin)
    this.props.addPlugin(plugin)
  }

  handleRemoveClick = () => {
    const plugin = activePlugins.pop()
    nextPlugins.unshift(plugin)
    this.props.removePlugin(plugin)
  }

  render() {
    const { plugins } = this.props
    return (
      <div className="App">
        <h1>Button Life</h1>
        <div>
          {
            nextPlugins.length > 0 &&
              <button onClick={this.handleNextClick}>add plugin</button>
          }
          {
            activePlugins.length > 0 &&
              <button onClick={this.handleRemoveClick}>remove plugin</button>
          }
        </div>
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

  removePlugin(type) {
    return {
      type: 'plugin-remove',
      pluginType: type,
    }
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
