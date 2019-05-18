import { api } from "../setup"

describe("just some dummy tests", async () => {
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
