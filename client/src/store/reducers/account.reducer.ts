import { AccountAction, AccountTypes as types } from "../actions"
import { AccountState, initAccountState } from "../state/"

export const accounts = (state = initAccountState, action: AccountAction): AccountState => {
  const { type, payload } = action
  switch (type) {
    case types.FETCH_ALL_INIT: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.FETCH_ALL_OK: {
      return {
        ...initAccountState,
        items: payload.items
      }
    }
    case types.FETCH_ALL_ERROR: {
      return {
        ...state,
        error: payload.error,
        isLoading: false
      }
    }
    default:
      return state
  }
}
