import React from "react"
import ReactDOM from "react-dom"
import Message from "./Message"

const App = () => {
  return (
    <div>
      <Message message={"hello react.js + typescript world"} />
      <Message message={"the owls are not what they seem"} />
      <Message />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
