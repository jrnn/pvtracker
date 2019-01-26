import { app, server } from "../../src/index"
import supertest from "supertest"
import * as setup from "../setup"

const api = supertest(app)

if (process.env.NODE_ENV !== "test") {
  server.close()
  throw new Error("Tests must be run in test mode")
}

beforeAll(async () => {
  await setup.init()
})

describe("just some dummy tests", async () => {
  beforeAll(async () => {
    console.log("preparing to run test suite")
  })

  it("GET / returns 404", async () => {
    await api
      .get("/")
      .expect(404)
  })

  it("GET /api returns 200 and a greeting as json", async () => {
    const res = await api
      .get("/api")
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(res.body)
      .toContain("hello")
  })

  it("GET /api/secret returns 200 and a twin peaks quote as json", async () => {
    const res = await api
      .get("/api/secret")
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(res.body)
      .toEqual("the owls are not what they seem")
  })
})

afterAll(async () => {
  console.log("test suite complete, tearing down")
  await setup.teardown()
  server.close()
})
