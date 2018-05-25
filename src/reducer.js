const accrue = {
  name: 'accrue',
  text: 'Accrue Assets',
  enabled(state) {
    return true
  },
  getInitialState(state) {
    return {
      ...state,
      accretionRate: 10,
    }
  },
  mutator(state) {
    return {
      ...state,
      assets: state.assets + state.accretionRate,
      accretionRate: state.accretionRate ? state.accretionRate * 0.9 : 0,
    }
  },
}

let initialState = {
  clicks: -1,
  assets: 0,
  plugins: [
    accrue,
  ],
}

initialState.plugins.forEach(plugin => {
  initialState = plugin.getInitialState(initialState)
})

const reducer = (state = initialState, action) => {
  state.clicks = state.clicks + 1
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  // TODO: use reducer
  state.plugins.forEach(plugin => {
    state = plugin.mutator(state)
  })

  switch (action.type) {
    default:
      return state
  }
}

// TODO: register the initial plugin like this too
const addPlugin = plugin => {
  initialState.plugins.forEach(plugin => {
    // We need to do this when adding a new plugin at runtime as well.
    initialState = plugin.getInitialState(initialState)
  })
}

addPlugin(accrue)

export default reducer
