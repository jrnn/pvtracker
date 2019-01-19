import React from "react"

interface Props {
  message?: string
}

const Message: React.SFC<Props> = (props) => {
  const style = {
    color: "#850b16",
    padding: "1rem"
  }
  const { message } = props

  return (
    <div style={style}>
      <p>{message || "default message"}</p>
    </div>
  )
}

export default Message
