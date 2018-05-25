import * as plugins from './plugins'

let initialState = {
  clicks: 0,
  assets: 0,
  plugins: [],
  registeredPluginsByType: {},
}

const pluginExecute = (state, action) => {
  const registeredPluginIndex = state.registeredPluginsByType[action.pluginType]
  if (registeredPluginIndex !== undefined) {
    const plugin = state.plugins[registeredPluginIndex]
    state = plugin.mutator(state)
    state.clicks = state.clicks + 1
  }
  return state
}

const pluginAdd = (state, action) => {
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
  return state
}

const reducerBranches = {
  'plugin-execute': pluginExecute,
  'plugin-add': pluginAdd,
}

const reducer = (state = initialState, action) => {
  const fn = reducerBranches[action.type]
  return fn ? fn(state, action) : state
}

export default reducer
