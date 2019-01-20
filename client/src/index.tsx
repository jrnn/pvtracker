import React from "react"
import ReactDOM from "react-dom"

import Clickable from "./Clickable"
import Message from "./Message"

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Message message="hello react.js + typescript world" />
      <Clickable
        message="click here to learn a secret"
        secret="the owls are not what they seem"
      />
      <Message />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
