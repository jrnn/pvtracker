import React, { FunctionComponent } from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { Grid } from "@material-ui/core"
import { store } from "./store"
import AccountForm from "./AccountForm"
import TempListContainer from "./TempListContainer"

const App: FunctionComponent = () => {
  return (
    <Grid
      container
      justify="center"
    >
      <AccountForm />
      <TempListContainer />
    </Grid>
  )
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
