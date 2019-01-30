import supertest from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import { app, db, server } from "../src/index"

export const api = supertest(app)

let dbServer: MongoMemoryServer

if (process.env.NODE_ENV !== "test") {
  console.error("Tests must be run in test mode")
  server.close()
  process.exit(1)
}

beforeAll(async () => {
  dbServer = new MongoMemoryServer()
  const dbUri = await dbServer.getConnectionString()
  db.connect(dbUri, "in-memory mongo server")
})

afterAll(async () => {
  await db.disconnect()
  await dbServer.stop()
  server.close()
})
