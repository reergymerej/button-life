import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

const initialState = {
  clicks: -1,
  assets: 0,
  accretionRate: 10,
}

const reducer = (state = initialState, action) => {
  state.clicks = state.clicks + 1
  switch (action.type) {
    case 'accrueAssets':
      return {
        ...state,
        assets: state.assets + state.accretionRate,
        accretionRate: state.accretionRate ? state.accretionRate * 0.9 : 0,
      }
    default:
      return state
  }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = {}
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware)
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
