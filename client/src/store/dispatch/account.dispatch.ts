import axios from "axios"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AccountAction } from "../actions"
import * as actions from "../actions"
import { AccountState } from "../state"

const API_URI = "/accounts"

// TODO: could this awful clutter be generalized away as an interface...?
type Action = ThunkAction<void, AccountState, void, AccountAction>
type Dispatch = ThunkDispatch<AccountState, void, AccountAction>

export const fetchAccounts = (): Action => (dispatch: Dispatch) => {
  dispatch(actions.fetchAccountsInit())
  axios
    .get(API_URI)
    .then((res) => dispatch(actions.fetchAccountsOk(res.data)))
    .catch((error) => dispatch(actions.fetchAccountsError(error)))
}
