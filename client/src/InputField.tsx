import React, { ChangeEvent } from "react"
import { TextField } from "@material-ui/core"
import FormField from "./FormField"
import { FormFieldState } from "./interfaces"

export const initInputField = (base?: string): FormFieldState<string> => {
  return {
    base: base || "",
    errors: [],
    value: base || ""
  }
}

class InputField extends FormField<string> {
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { handleChange, state } = this.props
    handleChange(name, {
      ...state,
      errors: this.validate(value),
      value
    })
  }

  render = () => {
    const { props, state } = this.props
    const { helperText, label } = this.renderPrep()
    return (
      <TextField
        error={this.hasErrors}
        fullWidth
        helperText={helperText}
        id={`input-${props.name}`}
        label={label}
        margin="normal"
        name={props.name}
        onChange={this.onChange}
        value={state.value}
      />
    )
  }
}

export default InputField
