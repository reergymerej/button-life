import * as plugins from './plugins'

let initialState = {
  clicks: 0,
  assets: 0,
  plugins: [],
  registeredPluginsByType: {},
}

const reducer = (state = initialState, action) => {
  const registeredPluginIndex = state.registeredPluginsByType[action.type]
  if (registeredPluginIndex !== undefined) {
    const plugin = state.plugins[registeredPluginIndex]
    state = plugin.mutator(state)
    state.clicks = state.clicks + 1
  }

  if (action.type === 'add-plugin') {
    const plugin = plugins[action.pluginType]
    state.plugins = [
      ...state.plugins,
      plugin,
    ]
    state = plugins[action.pluginType].getInitialState(state)
    state.registeredPluginsByType = {
      ...state.registeredPluginsByType,
      [action.pluginType]: state.plugins.length - 1,
    }
  }

  return state
}

export default reducer
