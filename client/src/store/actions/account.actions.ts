import { Account, Action } from "../interfaces"

export enum Types {
  FETCH_ALL_INIT = "[ACCOUNTS] FETCH ALL",
  FETCH_ALL_OK = "[ACCOUNTS] FETCH ALL => OK",
  FETCH_ALL_ERROR = "[ACCOUNTS] FETCH ALL => ERROR"
}
export type AccountAction = Action<Account, Types>

export const fetchAccountsInit = (): AccountAction => {
  return {
    type: Types.FETCH_ALL_INIT
  }
}

export const fetchAccountsOk = (items: Account[]): AccountAction => {
  return {
    type: Types.FETCH_ALL_OK,
    payload: { items }
  }
}

export const fetchAccountsError = (error: string): AccountAction => {
  return {
    type: Types.FETCH_ALL_ERROR,
    payload: { error }
  }
}
