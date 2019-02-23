import { Account, State } from "../interfaces"

export interface AccountState extends State<Account> {
}

export const initAccountState: AccountState = {
  items: [],
  error: null,
  isLoading: false
}
