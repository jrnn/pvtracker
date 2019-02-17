import { Validator } from "./validators"

export interface FormFields {
  [key: string]: FormFieldProps<any>
}

export interface FormState {
  [key: string]: FormFieldState<any>
}

export interface FormFieldProps<T> {
  label: string,
  name: string
  validators: Validator<T>[]
}

export interface FormFieldState<T> {
  base: T
  errors: string[]
  value: T
}
