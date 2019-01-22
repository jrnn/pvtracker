import { app, server } from "../../src/index"
import supertest from "supertest"

const api = supertest(app)

if (process.env.NODE_ENV !== "test") {
  server.close()
  throw new Error("Tests must be run in test mode")
}

describe("just some dummy tests", async () => {
  beforeAll(async () => {
    console.log("preparing to run test suite")
  })

  test("GET / returns 200 and landing html page", async () => {
    await api
      .get("/")
      .expect(200)
      .expect("content-type", /text\/html/)
  })

  test("GET /api returns 200 and a greeting as json", async () => {
    const res = await api
      .get("/api")
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(res.body)
      .toContain("hello")
  })

  test("GET /api/secret returns 200 and a twin peaks quote as json", async () => {
    const res = await api
      .get("/api/secret")
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(res.body)
      .toEqual("the owls are not what they seem")
  })
})

afterAll(() => {
  console.log("test suite complete, tearing down")
  server.close()
})
