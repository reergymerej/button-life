import * as plugins from './plugins'

const curry = (fn, arg) => (...args) => fn(arg, ...args)

const exists = (x) => !!x

const getTypeOrDefault = (obj, type) => obj[type] || obj['*']

const getAugmentatinosForPlugin = (plugin, type) => {
  const augmentations = plugin.augmentations || {}
  return getTypeOrDefault(augmentations, type)
}

const getAugmentations = (forPluginType, plugins) =>
  plugins
  .map(x => getAugmentatinosForPlugin(x, forPluginType))
  .filter(exists)

const getAugmentationsOfType = (augmentationType, forPluginType, plugins) => {
  const augmentations = getAugmentations(forPluginType, plugins)
  return augmentations
    .map(x => x[augmentationType])
    .filter(exists)
}

const getMutatorAugmentations = curry(getAugmentationsOfType, 'mutator')
const getEnabledAugmentations= curry(getAugmentationsOfType, 'enabled')

const byPropValue = (prop, value) => (x) => x[prop] === value
const byType = curry(byPropValue, 'type')

const getPlugin = (type, state) => state.plugins.find(byType(type))

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
  return state
}

const pluginRemove = (state, action) => {
  const index = state.plugins.findIndex(byType(action.pluginType))
  const plugins = [
    ...state.plugins.slice(0, index),
    ...state.plugins.slice(index + 1),
  ]
  return {
    ...state,
    plugins,
  }
}

const reducerBranches = {
  'plugin-execute': pluginExecute,
  'plugin-add': pluginAdd,
  'plugin-remove': pluginRemove,
}

const initialState = {
  clicks: 0,
  assets: 0,
  plugins: [],
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
        const computer = x[key]
        values[key] = typeof computer === 'function'
          ? computer(state)
          : state[computer]
      })
    })

    return values
  },
}
