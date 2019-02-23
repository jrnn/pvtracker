import { AccountState } from "./account.state"

export { AccountState, initAccountState } from "./account.state"

export interface RootState {
  accounts: AccountState
}
