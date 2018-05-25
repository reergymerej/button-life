export const accrue = {
  type: 'accrue',
  text: 'Accrue Assets',
  getInitialState(state) {
    return {
      ...state,
      accrue_rate: 10,
      accrue_rateModifier: 1,
    }
  },
  mutator(state) {
    return {
      ...state,
      assets: state.assets + (state.accrue_rate * state.accrue_rateModifier),
    }
  },
  enabled(state) {
    return true
  },
  visibleState: {
    'Accrue': (state) => {
      return (state.accrue_rate * state.accrue_rateModifier)
    },
  },
}

// Allows the user to upgrade earning power.
export const accretion = {
  type: 'accretion',
  text: 'Increase Accretion Rate',
  getInitialState(state) {
    return {
      ...state,
      accretion_upgradeCost: 100,
      accretion_rateModifierStep: 2,
    }
  },
  mutator(state) {
    return {
      ...state,
      accrue_rate: state.accrue_rate * state.accretion_rateModifierStep,
      accretion_upgradeCost: state.accretion_upgradeCost * 2,
      assets: state.assets - state.accretion_upgradeCost,
    }
  },
  enabled(state) {
    return state.assets >= state.accretion_upgradeCost
  },
  visibleState: {
    'Accretion Rate Upgrade': 'accretion_upgradeCost',
  },
}

// Makes the user seem to tire while accruing assets.
export const fatigue = {
  type: 'fatigue',
  text: 'Sleep',
  getInitialState(state) {
    return {
      ...state,
      fatigue_accretionRateModifier: 1,
      fatigue_maxAccretionRate: state.accrue_rate,
    }
  },
  mutator(state) {
    return {
      ...state,
      fatigue_accretionRateModifier: 1,
      accrue_rateModifier: 1,
    }
  },
  enabled(state) {
    return state.fatigue_accretionRateModifier < 1
  },
  augmentations: {
    accrue: {
      mutator(state) {
        const accretionRateModifier = Math.max(
          state.fatigue_accretionRateModifier - 0.20,
          0
        )
        return {
          ...state,
          accrue_rateModifier: state.accrue_rateModifier * accretionRateModifier,
          fatigue_accretionRateModifier: accretionRateModifier,
        } },
      enabled(state) {
        return state.accrue_rateModifier > 0.005
      },
    },
  },
}

// randomly stops you from sleeping
export const insomnia = {
  type: 'insomnia',
  text: 'Relieve Insomnia',
  getInitialState(state) {
    return {
      ...state,
      insomnia_active: false,
    }
  },
  mutator(state) {
    return {
      ...state,
      insomnia_active: false,
    }
  },
  enabled(state) {
    return state.insomnia_active
  },
  augmentations: {
    fatigue: {
      mutator(state) {
        return {
          ...state,
          insomnia_active: Math.random() <= 0.5,
        }
      },
      enabled(state) {
        return !state.insomnia_active
      },
    },
  },
}
