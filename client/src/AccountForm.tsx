import React, { ChangeEvent, Component } from "react"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"

class AccountForm extends Component {
  state = {
    email: "",
    firstName: "",
    hasAccess: true,
    isAdmin: false,
    lastName: ""
  }

  handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: checked
      }
    })
  }

  render () {
    return (
      <form>
        <Typography
          paragraph
          variant="h4"
        >
          Create new account
        </Typography>
        <TextField
          fullWidth
          id="firstName"
          label="First name"
          margin="normal"
          name="firstName"
          onChange={this.handleTextChange}
          value={this.state.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          label="Last name"
          margin="normal"
          name="lastName"
          onChange={this.handleTextChange}
          value={this.state.lastName}
        />
        <TextField
          fullWidth
          id="email"
          label="Email"
          margin="normal"
          name="email"
          onChange={this.handleTextChange}
          type="email"
          value={this.state.email}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isAdmin}
                color="primary"
                id="isAdmin"
                name="isAdmin"
                onChange={this.toggleCheckbox}
              />
            }
            label="Administrator?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.hasAccess}
                color="primary"
                id="hasAccess"
                name="hasAccess"
                onChange={this.toggleCheckbox}
              />
            }
            label="Has access rights?"
          />
        </FormGroup>
        <Button
          color="primary"
          fullWidth
          variant="outlined"
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default AccountForm
