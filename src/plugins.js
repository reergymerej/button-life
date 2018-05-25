export const accrue = {
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

export const increaseAccretionRate = {
  type: 'increaseAccretionRate',
  text: 'Increase Accretion Rate',
  getInitialState(state) {
    return {
      ...state,
      accretionRateIncreaseCost: 20,
      increaseAccretionRateStep: 15,
    }
  },
  mutator(state) {
    return {
      ...state,
      accretionRate: state.accretionRate + state.increaseAccretionRateStep,
      accretionRateIncreaseCost: state.accretionRateIncreaseCost * 2,
      assets: state.assets - state.accretionRateIncreaseCost,
    }
  },
  enabled(state) {
    return state.assets >= state.accretionRateIncreaseCost
  },
}

// This makes it so the user must sleep after accruing assets.
export const sleep = {
  type: 'sleep',
  text: 'Sleep',
  getInitialState(state) {
    return {
      ...state,
      'sleep.needsSleep': false,
    }
  },
  mutator(state) {
    return {
      ...state,
      'sleep.needsSleep': false,
    }
  },
  enabled(state) {
    return state['sleep.needsSleep']
  },
  augmentations: {
    'accrue': {
      mutator(state) {
        return {
          ...state,
          'sleep.needsSleep': true,
        }
      },
    }
  },
}
