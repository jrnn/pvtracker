import { app, server } from "../../src/index"
import supertest from "supertest"
import * as setup from "../setup"
import { Account, IAccount, IAccountDocument } from "../../src/models/account"

const api = supertest(app)
const uri = "/accounts"

if (process.env.NODE_ENV !== "test") {
  server.close()
  throw new Error("Tests must be run in test mode")
}

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
  await Account.remove({}).exec()
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

beforeAll(async () => {
  await setup.init()
})

describe("API: Account", async () => {
  describe(`GET ${uri}`, async () => {
    beforeAll(async () => {
      await init()
    })

    it("returns all accounts", async () => {
      const accounts = await Account.find().exec()
      const emails = accounts.map((a) => a.email)

      const res = await api
        .get(`${uri}`)
        .expect(200)
        .expect("content-type", /application\/json/)

      expect(res.body.length).toBe(accounts.length)
      res.body.map((a: IAccount) => expect(emails).toContain(a.email))
    })
  })

  describe(`GET ${uri}/:id`, async () => {
    it("returns the correct account", async () => {
      const accounts = await Account.find().exec()
      const account = pickRandom(accounts)

      const res = await api
        .get(`${uri}/${account._id}`)
        .expect(200)
        .expect("content-type", /application\/json/)

      expect(res.body.email).toEqual(account.email)
      expect(res.body.firstName).toEqual(account.firstName)
      expect(res.body.lastName).toEqual(account.lastName)
    })

    it("fails if account does not exit", async () => {
      const res = await api
        .get(`${uri}/${new Account()._id}`)
        .expect(404)

      expect(res.body.name).toEqual("NotFoundError")
    })

    it("fails if invalid id", async () => {
      const res = await api
        .get(`${uri}/THIS_IS_NOT_A_VALID_ID`)
        .expect(400)

      expect(res.body.name).toEqual("BadRequestError")
    })
  })

  describe(`POST ${uri}`, async () => {
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

    it("creates a new account", async () => {
      const res = await api
        .post(`${uri}`)
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
      await Account.deleteOne({ _id }).exec()
    })

    it("fails if firstName is missing", async () => {
      const { firstName, ..._account } = account
      const res = await api
        .post(`${uri}`)
        .send(_account)
        .expect(400)

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
      expect(res.body.name).toEqual("ValidationError")
    })

    it("fails if lastName is missing", async () => {
      const { lastName, ..._account } = account
      const res = await api
        .post(`${uri}`)
        .send(_account)
        .expect(400)

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
      expect(res.body.name).toEqual("ValidationError")
    })

    it("fails if email is missing", async () => {
      const { email, ..._account } = account
      const res = await api
        .post(`${uri}`)
        .send(_account)
        .expect(400)

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
      expect(res.body.name).toEqual("ValidationError")
    })

    it("fails if email format is invalid", async () => {
      account.email = "THIS_IS_NOT_A_VALID_EMAIL"
      const res = await api
        .post(`${uri}`)
        .send(account)
        .expect(400)

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
      expect(res.body.name).toEqual("ValidationError")
    })

    it("fails if email is already associated with another account", async () => {
      account.email = pickRandom(accountsBefore).email
      const res = await api
        .post(`${uri}`)
        .send(account)
        .expect(400)

      const accountsAfter = await Account.find().exec()
      expect(accountsAfter.length).toBe(accountsBefore.length)
      expect(res.body.name).toEqual("ValidationError")
    })
  })
})

afterAll(async () => {
  console.log("test suite complete, tearing down")
  await setup.teardown()
  server.close()
})
