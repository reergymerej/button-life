const accrue = {
  type: 'accrue',
  text: 'Accrue Assets',
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
  enabled(state) {
    return true
  },
}

const increaseAccretionRate = {
  type: 'increaseAccretionRate',
  text: 'Increase Accretion Rate',
  getInitialState(state) {
    return {
      ...state,
      accretionRateThreshold: 50,
      increaseAccretionRateStep: 15,
    }
  },
  mutator(state) {
    return {
      ...state,
      accretionRate: state.accretionRate + state.increaseAccretionRateStep,
    }
  },
  enabled(state) {
    return state.assets >= state.accretionRateThreshold
  },
}

let initialState = {
  clicks: 0,
  assets: 0,
  plugins: [
    accrue,
    increaseAccretionRate,
  ],
}

initialState.plugins.forEach(plugin => {
  initialState = plugin.getInitialState(initialState)
})

const reducer = (state = initialState, action) => {
  state.plugins.forEach(plugin => {
    if (plugin.type === action.type) {
      state = plugin.mutator(state)
      state.clicks = state.clicks + 1
    }
  })

  return state
}

// TODO: register the initial plugin like this too
const addPlugin = plugin => {
  initialState.plugins.forEach(plugin => {
    // We need to do this when adding a new plugin at runtime as well.
    initialState = plugin.getInitialState(initialState)
  })
}

// addPlugin(accrue)

export default reducer
