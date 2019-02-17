import React, { FunctionComponent } from "react"
import ReactDOM from "react-dom"
import { Grid } from "@material-ui/core"
import AccountForm from "./AccountForm"

const App: FunctionComponent = () => {
  return (
    <Grid
      container
      justify="center"
    >
      <AccountForm />
    </Grid>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
