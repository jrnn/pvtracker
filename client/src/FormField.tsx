import { Component } from "react"
import { FormFieldProps, FormFieldState } from "./interfaces"
import { validate } from "./validators"

type Props<T> = {
  handleChange: (name: string, state: FormFieldState<T>) => void
  props: FormFieldProps<T>
  state: FormFieldState<T>
}

class FormField<T> extends Component<Props<T>> {
  protected hasChanged: boolean
  protected hasErrors: boolean

  renderPrep = () => {
    const { props, state } = this.props

    // // TODO: some kind of reliable .equals() that works regardless of type... lodash?
    this.hasChanged = state.base !== state.value
    this.hasErrors = state.errors.length > 0

    const helperText = this.hasErrors
      ? state.errors[0]
      : null
    const label = this.hasChanged
      ? `${props.label} **`
      : props.label

    return { helperText, label }
  }

  validate = (value: T) => {
    const { validators } = this.props.props
    return validate(validators)(value)
  }
}

export default FormField
