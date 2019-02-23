import React, { Component } from "react"
import { Account } from "./store/interfaces"

type Props = {
  accounts: Account[]
  onMount: () => void
}

const renderer = (a: Account) => {
  return (
    <li key={a.email}>
      {a.firstName} {a.lastName} || <em>{a.email}</em>
    </li>
  )
}

export class TempList extends Component<Props> {
  componentDidMount = () => {
    this.props.onMount()
  }

  render = () => {
    return (
      <ul>
        {this.props.accounts.map(renderer)}
      </ul>
    )
  }
}
