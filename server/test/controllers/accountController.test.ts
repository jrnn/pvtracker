import { api } from "../setup"
import { Account, IAccount, IAccountDocument } from "../../src/models/account"
import { Test } from "supertest"

const root = "/accounts"

const init = async () => {
  const accounts = [
    {
      email: "peter.griffin@pvtracker.com",
      firstName: "Peter",
      lastName: "Griffin"
    },
    {
      email: "chuck.norris@pvtracker.com",
      firstName: "Chuck",
      lastName: "Norris"
    },
    {
      email: "spongebob.squarepants@pvtracker.com",
      firstName: "Spongebob",
      lastName: "Squarepants"
    }
  ]
  await Account.deleteMany({}).exec()
  await Promise.all(
    accounts.map((a) =>
      new Account(a).save()
    )
  )
}

const pickRandom = <T>(array: T[]) => {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

const throwsError = (test: Test, expectedStatus: number, expectedError: string) => {
  return test
    .expect(expectedStatus)
    .expect("content-type", /application\/json/)
    .then((res) => {
      expect(res.body.name).toEqual(expectedError)
    })
}

describe("API: Account", async () => {
  beforeAll(async () => {
    await init()
  })

  describe(`GET ${root}`, async () => {
    it("returns all accounts as json", async () => {
      const accounts = await Account.find().exec()
      const emails = accounts.map((a) => a.email)
      await api
        .get(root)
        .expect(200)
        .expect("content-type", /application\/json/)
        .then((res) => {
          expect(res.body.length).toBe(accounts.length)
          res.body.map((a: IAccount) => expect(emails).toContain(a.email))
        })
    })
  })

  describe(`GET ${root}/:id`, async () => {
    it("returns the correct account as json", async () => {
      const accounts = await Account.find().exec()
      const account = pickRandom(accounts)
      await api
        .get(`${root}/${account._id}`)
        .expect(200)
        .expect("content-type", /application\/json/)
        .then((res) => {
          expect(res.body.email).toEqual(account.email)
          expect(res.body.firstName).toEqual(account.firstName)
          expect(res.body.lastName).toEqual(account.lastName)
        })
    })

    it("fails if account does not exit", async () => {
      const req = api.get(`${root}/${new Account()._id}`)
      await throwsError(req, 404, "NotFoundError")
    })

    it("fails with invalid id", async () => {
      const req = api.get(`${root}/THIS_IS_NOT_A_VALID_ID`)
      await throwsError(req, 400, "BadRequestError")
    })
  })

  describe(`POST ${root}`, async () => {
    let account: IAccount
    let accountsBefore: IAccountDocument[]
    const emptyValues = [ "", " ", null, undefined ]

    beforeEach(async () => {
      account = {
        email: "boaty.mcboatface@pvtracker.com",
        firstName: "Boaty",
        lastName: "McBoatface"
      }
      accountsBefore = await Account.find().exec()
    })

    afterEach(async () => {
      await Account
        .deleteOne({ email: "boaty.mcboatface@pvtracker.com" })
        .exec()
    })

    const post = (payload: any): Test => {
      return api
        .post(root)
        .send(payload)
    }

    const hasNoEffect = async (test: Function) => {
      await test()
      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
    }

    const invalidationTest = async (key: string, values: any[]) => {
      await hasNoEffect(async () => {
        await Promise.all(
          values.map((value) => {
            const _account = { ...account, [key]: value }
            return throwsError(post(_account), 400, "ValidationError")
          }))
      })
    }

    it("creates a new account", async () => {
      const res = await post(account)
        .expect(201)
        .expect("content-type", /application\/json/)

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length + 1)

      accountsAfter
        .filter((a) => a._id === res.body._id)
        .map((a) => {
          expect(a.email).toEqual(account.email)
          expect(a.firstName).toEqual(account.firstName)
          expect(a.lastName).toEqual(account.lastName)
        })
    })

    it("does not affect other accounts in database", async () => {
      // to be implemented
    })

    it("fails if firstName is missing", async () => {
      await invalidationTest("firstName", emptyValues)
    })

    it("fails if lastName is missing", async () => {
      await invalidationTest("lastName", emptyValues)
    })

    it("fails if email is missing", async () => {
      await invalidationTest("email", emptyValues)
    })

    it("fails if email format is invalid", async () => {
      // TODO: test with array of malformed emails?
      await hasNoEffect(async () => {
        account.email = "THIS_IS_NOT_A_VALID_EMAIL"
        await throwsError(post(account), 400, "ValidationError")
      })
    })

    it("fails if email is already associated with another account", async () => {
      const emails = accountsBefore.map((a) => a.email)
      await invalidationTest("email", emails)
    })
  })

  describe(`PUT ${root}/:id`, async () => {
    let put: (payload: any) => Test
    let patch: IAccount
    let original: IAccountDocument

    const emptyValues = [ "", " ", null ]

    beforeEach(async () => {
      const account = {
        email: "boaty.mcboatface@pvtracker.com",
        firstName: "Boaty",
        lastName: "McBoatface"
      }
      patch = {
        email: "ned.flanders@pvtracker.com",
        firstName: "Ned",
        lastName: "Flanders"
      }
      original = await new Account(account).save()

      put = (payload: any): Test => {
        return api
          .put(`${root}/${original._id}`)
          .send(payload)
      }
    })

    afterEach(async () => {
      await Account
        .deleteOne({ _id: original._id })
        .exec()
    })

    const invalidationTest = async (key: string, values: any[]) => {
      await Promise.all(
        values.map((value) => {
          const _patch = { ...patch, [key]: value }
          return throwsError(put(_patch), 400, "ValidationError")
        }))
    }

    it("patches the correct account", async () => {
      await put(patch)
        .expect(200)
        .expect("content-type", /application\/json/)

      await Account
        .findById(original._id)
        .then((patched) => {
          expect(patched.email).toBe(patch.email)
          expect(patched.firstName).toBe(patch.firstName)
          expect(patched.lastName).toBe(patch.lastName)
        })
    })

    it("does not affect other accounts in database", async () => {
      // to be implemented
    })

    it("ignores attempts to change 'isAdmin' property", async () => {
      const { isAdmin } = original
      await put({ isAdmin: !isAdmin })
        .expect(200)
        .expect("content-type", /application\/json/)

      await Account
        .findById(original._id)
        .then((patched) => {
          expect(patched.isAdmin).toBe(original.isAdmin)
        })
    })

    it("ignores attempts to change 'hasAccess' property", async () => {
      const { hasAccess } = original
      await put ({ hasAccess: !hasAccess })
        .expect(200)
        .expect("content-type", /application\/json/)

      await Account
        .findById(original._id)
        .then((patched) => {
          expect(patched.hasAccess).toBe(original.hasAccess)
        })
    })

    it("fails if account does not exit", async () => {
      const req = api
        .put(`${root}/${new Account()._id}`)
        .send(patch)
      await throwsError(req, 404, "NotFoundError")
    })

    it("fails if invalid id", async () => {
      const req = api
        .put(`${root}/THIS_IS_NOT_A_VALID_ID`)
        .send(patch)
      await throwsError(req, 400, "BadRequestError")
    })

    it("fails if trying to patch empty firstName", async () => {
      await invalidationTest("firstName", emptyValues)
    })

    it("fails if trying to patch empty lastName", async () => {
      await invalidationTest("lastName", emptyValues)
    })

    it("fails if trying to patch empty email", async () => {
      await invalidationTest("email", emptyValues)
    })

    it("fails if trying to patch email with invalid format", async () => {
      // TODO: test with array of malformed emails?
      const _patch = { ...patch, email: "THIS_IS_NOT_A_VALID_EMAIL" }
      await throwsError(put(_patch), 400, "ValidationError")
    })

    it("fails if email is already associated with another account", async () => {
      const accounts = await Account
        .find({ _id: { $ne: original._id }})
        .exec()
      await invalidationTest("email", accounts.map((a) => a.email))
    })
  })
})
