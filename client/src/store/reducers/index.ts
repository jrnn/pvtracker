import { combineReducers } from "redux"
import { accounts } from "./account.reducer"

export const reducers = combineReducers(
  {
    accounts
  }
)
