import React, { ChangeEvent } from "react"
import { Checkbox, FormControlLabel } from "@material-ui/core"
import FormField from "./FormField"
import { FormFieldState } from "./interfaces"

export const initCheckboxField = (base?: boolean): FormFieldState<boolean> => {
  return {
    base: base || false,
    errors: [],
    value: base || false
  }
}

class CheckboxField extends FormField<boolean> {
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target
    const { handleChange, state } = this.props
    handleChange(name, {
      ...state,
      value: checked
    })
  }

  render = () => {
    // TODO: where and how to plug in possible error message(s)?
    const { props, state } = this.props
    const { label } = this.renderPrep()
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={state.value}
            color="primary"
            id={`input-${props.name}`}
            name={props.name}
            onChange={this.onChange}
          />
        }
        label={label}
      />
    )
  }
}

export default CheckboxField
