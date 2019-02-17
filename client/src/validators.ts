export interface Validator<T> {
  message: string
  validator: (value: T) => boolean
}

export const validate = <T>(vs: Validator<T>[]) => (value: T) => {
  return vs
    .filter((v) => !v.validator(value))
    .map((v) => v.message)
}

export const EmailFormat: Validator<string> = {
  message: "Invalid email format",
  validator: (s: string) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9-]+(\.[a-z0-9]+)*(\.[a-z]{2,})$/
    return re.test(s
      .trim()
      .toLowerCase())
  }
}

export const NotEmpty: Validator<string> = {
  message: "Cannot be empty",
  validator: (s: string) => s.trim().length > 0
}
