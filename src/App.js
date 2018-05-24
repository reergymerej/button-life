import React from 'react'
import './App.css'
import State from './State'
import AccrueAssets from './AccrueAssets'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Button Life</h1>
        <div className="content">
          <State />
          <div className="buttons">
            <AccrueAssets />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
