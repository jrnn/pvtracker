import React from "react"
import Message from "./Message"

type Props = {
  message: string,
  secret: string
}
type State = { isOpen: boolean }

export default class Clickable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { isOpen: false }
  }

  onClick = () => {
    this.setState((state, props) => ({ isOpen: !state.isOpen }))
  }

  render() {
    const { message, secret } = this.props

    return (
      <div onClick={this.onClick}>
        <Message message={message} />
        {this.state.isOpen
          ? <small>{secret}</small>
          : null
        }
      </div>
    )
  }
}
