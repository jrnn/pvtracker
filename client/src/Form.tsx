import { Component } from "react"
import { FormState, FormFieldState } from "./interfaces"

function setBase<T>(state: FormFieldState<T>, base?: T): FormFieldState<T> {
  return {
    ...state,
    base: base || state.value
  }
}

function updateField<T, S extends FormState>(key: keyof S, value: FormFieldState<T>) {
  return (state: S): S => {
    return {
      ...state,
      [key]: value
    }
  }
}

class Form<S extends FormState> extends Component<{}, S> {
  constructor(props: {}) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange<T>(name: string, state: FormFieldState<T>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: state
      }
    })
  }

  resetBaseValues = (keys: (keyof S)[]): void => {
    this.setState((prevState) => {
      return keys
        .map((key) => updateField(key, setBase(prevState[key])))
        .reduce((_s, op) => op(_s), prevState)
    })
  }
}

export default Form
