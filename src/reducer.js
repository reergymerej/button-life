import * as plugins from './plugins'

let initialState = {
  clicks: 0,
  assets: 0,
  plugins: [],
}

const reducer = (state = initialState, action) => {
  state.plugins.forEach(plugin => {
    if (plugin.type === action.type) {
      state = plugin.mutator(state)
      state.clicks = state.clicks + 1
    }
  })

  if (action.type === 'add-plugin') {
    const plugin = plugins[action.pluginType]
    state.plugins = [
      ...state.plugins,
      plugin,
    ]
    state = plugins[action.pluginType].getInitialState(state)
  }

  return state
}

export default reducer
