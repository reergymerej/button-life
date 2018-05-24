import React from 'react'
import './App.css'

import { createStore, applyMiddleware, compose } from 'redux'

const reducer = (state = {}, action) => state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = {}
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware)
))

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Button Life</h1>
      </div>
    )
  }
}

export default App;
