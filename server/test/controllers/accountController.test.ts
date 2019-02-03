import { api } from "../setup"
import { Account, IAccount, IAccountDocument } from "../../src/models/account"

const root = "/accounts"
const emptyInputs = [ "", " ", null ]  // notice: undefined ok in PUT

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
    accounts.map(async (a) =>
      await new Account(a).save()
    )
  )
}

const pickRandom = <T>(array: T[]) => {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
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
        .get(`${root}`)
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
      await api
        .get(`${root}/${new Account()._id}`)
        .expect(404).then((res) => {
          expect(res.body.name).toEqual("NotFoundError")
        })
    })

    it("fails with invalid id", async () => {
      await api
        .get(`${root}/THIS_IS_NOT_A_VALID_ID`)
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("BadRequestError")
        })
    })
  })

  describe(`POST ${root}`, async () => {
    let account: IAccount
    let accountsBefore: IAccountDocument[]

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

    it("creates a new account", async () => {
      const res = await api
        .post(`${root}`)
        .send(account)
        .expect(201)
        .expect("content-type", /application\/json/)

      const { _id } = res.body
      const accountsAfter = await Account.find().exec()
      accountsAfter
        .filter((a) => a._id === _id)
        .map((a) => {
          expect(a.email).toEqual(account.email)
          expect(a.firstName).toEqual(account.firstName)
          expect(a.lastName).toEqual(account.lastName)
        })

      expect(accountsAfter.length).toBe(accountsBefore.length + 1)
    })

    it("does not affect other accounts in database", async () => {
      // to be implemented
    })

    it("fails if firstName is missing", async () => {
      const { firstName, ..._account } = account
      await api
        .post(`${root}`)
        .send(_account)
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("ValidationError")
        })

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
    })

    it("fails if lastName is missing", async () => {
      const { lastName, ..._account } = account
      await api
        .post(`${root}`)
        .send(_account)
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("ValidationError")
        })

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
    })

    it("fails if email is missing", async () => {
      const { email, ..._account } = account
      await api
        .post(`${root}`)
        .send(_account)
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("ValidationError")
        })

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
    })

    it("fails if email format is invalid", async () => {
      account.email = "THIS_IS_NOT_A_VALID_EMAIL"
      await api
        .post(`${root}`)
        .send(account)
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("ValidationError")
        })

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
    })

    it("fails if email is already associated with another account", async () => {
      account.email = pickRandom(accountsBefore).email
      await api
        .post(`${root}`)
        .send(account)
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("ValidationError")
        })

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
    })
  })

  describe(`PUT ${root}/:id`, async () => {
    let original: IAccountDocument

    beforeEach(async () => {
      const account = {
        email: "boaty.mcboatface@pvtracker.com",
        firstName: "Boaty",
        lastName: "McBoatface"
      }
      original = await new Account(account).save()
    })

    afterEach(async () => {
      await Account.deleteOne({ _id: original._id }).exec()
    })

    it("patches the correct account", async () => {
      const patch = {
        email: "ned.flanders@pvtracker.com",
        firstName: "Ned",
        lastName: "Flanders"
      }
      await api
        .put(`${root}/${original._id}`)
        .send(patch)
        .expect(200)

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
      await api
        .put(`${root}/${original._id}`)
        .send({ isAdmin: !isAdmin })
        .expect(200)

      await Account
        .findById(original._id)
        .then((patched) => {
          expect(patched.isAdmin).toBe(original.isAdmin)
        })
    })

    it("ignores attempts to change 'hasAccess' property", async () => {
      const { hasAccess } = original
      await api
        .put(`${root}/${original._id}`)
        .send({ hasAccess: !hasAccess })
        .expect(200)

      await Account
        .findById(original._id)
        .then((patched) => {
          expect(patched.hasAccess).toBe(original.hasAccess)
        })
    })

    it("fails if account does not exit", async () => {
      await api
        .put(`${root}/${new Account()._id}`)
        .expect(404)
        .then((res) => {
          expect(res.body.name).toEqual("NotFoundError")
        })
    })

    it("fails if invalid id", async () => {
      await api
        .put(`${root}/THIS_IS_NOT_A_VALID_ID`)
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("BadRequestError")
        })
    })

    it("fails if trying to patch empty firstName", async () => {
      await Promise.all(
        emptyInputs.map(async (input) => {
          await api
            .put(`${root}/${original._id}`)
            .send({ firstName: input })
            .expect(400)
            .then((res) => {
              expect(res.body.name).toEqual("ValidationError")
            })
          }))
    })

    it("fails if trying to patch empty lastName", async () => {
      await Promise.all(
        emptyInputs.map(async (input) => {
          await api
            .put(`${root}/${original._id}`)
            .send({ lastName: input })
            .expect(400)
            .then((res) => {
              expect(res.body.name).toEqual("ValidationError")
            })
          }))
    })

    it("fails if trying to patch empty email", async () => {
      await Promise.all(
        emptyInputs.map(async (input) => {
          await api
            .put(`${root}/${original._id}`)
            .send({ email: input })
            .expect(400)
            .then((res) => {
              expect(res.body.name).toEqual("ValidationError")
            })
          }))
    })

    it("fails if trying to patch email with invalid format", async () => {
      // TODO: test with array of malformed emails?
      await api
        .put(`${root}/${original._id}`)
        .send({ email: "THIS_IS_NOT_A_VALID_EMAIL" })
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual("ValidationError")
        })
    })

    it("fails if email is already associated with another account", async () => {
      const accounts = await Account
        .find({ _id: { $ne: original._id }})
        .exec()

      await Promise.all(
        accounts.map((a) => a.email).map(async (email) => {
          await api
            .put(`${root}/${original._id}`)
            .send({ email })
            .expect(400)
            .then((res) => {
              expect(res.body.name).toEqual("ValidationError")
            })
        })
      )
    })
  })
})
