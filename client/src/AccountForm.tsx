import React, { MouseEvent } from "react"
import { Button, FormGroup, Typography } from "@material-ui/core"
import Form from "./Form"
import CheckboxField, { initCheckboxField } from "./CheckboxField"
import InputField, { initInputField } from "./InputField"
import { FormFields, FormFieldState } from "./interfaces"
import { EmailFormat, NotEmpty } from "./validators"

type State = {
  email: FormFieldState<string>
  firstName: FormFieldState<string>
  hasAccess: FormFieldState<boolean>
  isAdmin: FormFieldState<boolean>
  lastName: FormFieldState<string>
}

const stateKeys: (keyof State)[] = [
  "email",
  "firstName",
  "hasAccess",
  "lastName",
  "isAdmin"
]

const fields: FormFields = {
  email: {
    label: "Email",
    name: "email",
    validators: [ EmailFormat ]
  },
  firstName: {
    label: "First name",
    name: "firstName",
    validators: [ NotEmpty ]
  },
  hasAccess: {
    label: "Has access rights?",
    name: "hasAccess",
    validators: []
  },
  isAdmin: {
    label: "Administrator?",
    name: "isAdmin",
    validators: []
  },
  lastName: {
    label: "Last name",
    name: "lastName",
    validators: [ NotEmpty ]
  }
}

class AccountForm extends Form<State> {
  state = {
    email: initInputField(),
    firstName: initInputField(),
    hasAccess: initCheckboxField(true),
    lastName: initInputField(),
    isAdmin: initCheckboxField()
  }

  submit = (e: MouseEvent) => {
    e.preventDefault()
    this.resetBaseValues(stateKeys)
  }

  render = () => {
    return(
      <form>
        <Typography
          paragraph
          variant="h4"
        >
          Create new account
        </Typography>
        <InputField
          handleChange={this.handleChange}
          props={fields.firstName}
          state={this.state.firstName}
        />
        <InputField
          handleChange={this.handleChange}
          props={fields.lastName}
          state={this.state.lastName}
        />
        <InputField
          handleChange={this.handleChange}
          props={fields.email}
          state={this.state.email}
        />
        <FormGroup>
          <CheckboxField
            handleChange={this.handleChange}
            props={fields.isAdmin}
            state={this.state.isAdmin}
          />
          <CheckboxField
            handleChange={this.handleChange}
            props={fields.hasAccess}
            state={this.state.hasAccess}
          />
        </FormGroup>
        <Button
          color="primary"
          fullWidth
          onClick={this.submit}
          variant="outlined"
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default AccountForm
