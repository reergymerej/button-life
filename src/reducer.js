import * as plugins from './plugins'

let initialState = {
  clicks: 0,
  assets: 0,
  plugins: [],
  registeredPluginsByType: {},
}

const exists = (x) => !!x

const getAugmentations = (forPluginType, plugins) => {
  return plugins
    .map(x => (x.augmentations || {})[forPluginType])
    .filter(exists)
}

const getMutatorAugmentations = (forPluginType, plugins) => {
  const augmentations = getAugmentations(forPluginType, plugins)
  return augmentations
    .map(x => x.mutator)
    .filter(exists)
}

const getEnabledAugmentations = (forPluginType, plugins) => {
  const augmentations = getAugmentations(forPluginType, plugins)
  return augmentations
    .map(x => x.enabled)
    .filter(exists)
}

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

export const selectors = {
  isEnabled(plugin, state) {
    // The plugin checks if it is enabled based on state.
    // Other plugins can add additional checks.
    // All must be true.
    const enabled = plugin.enabled(state)
    const augmentations = getEnabledAugmentations(plugin.type, state.plugins)
    return augmentations.reduce((accumulator, enabledAugmentation) => {
      return accumulator && enabledAugmentation(state)
    }, enabled)
  },

  getVisibleStateValues(state) {
    // We could determine this by state, modifying when adding/removing a
    // plugin, but this is more functional.
    const visibleStateValues = [
      {
        'Clicks': 'clicks',
        'Assets': 'assets',
      },
    ]
    state.plugins.forEach(plugin => {
      if (plugin.visibleState) {
        visibleStateValues.push(plugin.visibleState)
      }
    })

    const values = {}
    visibleStateValues.forEach(x => {
      Object.keys(x).forEach(key => {
        values[key] = state[x[key]]
      })
    })

    return values
  },
}
