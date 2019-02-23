import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { RootState, AccountState } from "./store/state"
import { fetchAccounts } from "./store/dispatch"
import { AccountAction } from "./store/actions"
import { TempList } from "./TempList"

// can this be exported from "./store/dispatch..." ?
type Dispatch = ThunkDispatch<AccountState, void, AccountAction>

const mapStateToProps = (state: RootState) => {
  return {
    accounts: state.accounts.items
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onMount: () => dispatch(fetchAccounts())
  }
}

const TempListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TempList)

export default TempListContainer
