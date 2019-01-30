import mongoose from "mongoose"
import { Account, IAccount } from "../../src/models/account"

let account: IAccount

const emptyInputs = [ "", " ", null, undefined ]

const testInvalidAttribute = async <T>(inputs: T[], attribute: string, errorMessage: string) => {
  let errorCount = 0
  await Promise.all(
    inputs.map(async (input) => {
      const _account = {
        ...account,
        [ attribute ]: input
      }
      await new Account(_account).validate()
        .catch((error) => {
          errorCount += 1
          expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
          expect(error.errors[attribute].message).toEqual(errorMessage)
        })
    })
  )
  expect(errorCount).toBe(inputs.length)
}

describe("Models: Account", () => {
  beforeEach(() => {
    account = {
      email: "first.last@pvtracker.com",
      firstName: "First",
      lastName: "Last"
    }
  })

  it("must have email", async () => {
    await testInvalidAttribute(emptyInputs, "email", "Attribute `email` missing")
  })

  it("must have first name", async () => {
    await testInvalidAttribute(emptyInputs, "firstName", "Attribute `firstName` missing")
  })

  it("must have last name", async () => {
    await testInvalidAttribute(emptyInputs, "lastName", "Attribute `lastName` missing")
  })

  it("by default does not have admin rights", () => {
    expect(new Account(account).isAdmin).toBe(false)
  })

  it("by default has access rights", () => {
    expect(new Account(account).hasAccess).toBe(true)
  })

  it("detects invalid email format", async () => {
    const invalidEmails = [
      "a@b.c", "  .a,b@_@  c ", "@domain.com", "first.last@", "first_last@com", "abcdefghijklmnopqrstuvwxyz1234567890",
      "firs\\t.las\"t@domain.com", "first.last@domain@domain.com", "first last@domain.com", "first.last@domain.123",
      "first,last@domain.com", "012_345@012-34.567.89", "first.last_domain.com", "first..last@domain.com",
      "first.last@domain..com", "first.last@domain,com", "first.last@!#$%&'*+/=?^_`{|}~-.org", "first.last@domain.c",
      "f irst.last@domain.co m", "first.last@@domain.com", "first.last@domain"
    ]
    await testInvalidAttribute(invalidEmails, "email", "Invalid email format")
  })

  it("can tell its full name", () => {
    const fullName = `${account.firstName} ${account.lastName}`
    expect(new Account(account).fullName()).toEqual(fullName)
  })
})
