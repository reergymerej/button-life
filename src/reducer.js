import * as plugins from './plugins'

let initialState = {
  clicks: 0,
  assets: 0,
  plugins: [],
  registeredPluginsByType: {},
}

const getMutatorAugmentations = (forPluginType, plugins) =>
  plugins
    .map(x => (x.augmentations || {})[forPluginType])
    .filter(x => !!x)

const getPlugin = (type, state) => {
  const registeredPluginIndex = state.registeredPluginsByType[type]
  if (registeredPluginIndex !== undefined) {
    return state.plugins[registeredPluginIndex]
  }
}

const pluginExecute = (state, action) => {
  const type = action.pluginType
  const plugin = getPlugin(type, state)
  if (plugin) {
    state.clicks = state.clicks + 1
    state = plugin.mutator(state)
    const plugins = state.plugins
    const otherMutators = getMutatorAugmentations(type, plugins)
    state = otherMutators.reduce(
      (accumulator, mutator) => mutator(accumulator),
      state
    )
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
