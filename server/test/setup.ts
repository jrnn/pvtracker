/**
 * Set up and tear down the test environment before and after each test suite.
 *
 * The Express app is abstracted through supertest, so it does not actually need to listen for HTTP
 * requests on a port. Hence test suites can be run in parallel without having to worry about port
 * conflicts.
 *
 * Database is set up in-memory, so that (1) tests can be run without any external dependencies, and
 * (2) test suites can run in parallel without messing up each other. This requires bumping up Jest
 * timeout from the default 5-second mark, to allow sufficient time for downloading the MongoDB
 * binary.
 */

import { MongoMemoryServer } from "mongodb-memory-server"
import supertest from "supertest"

import { app } from "../src/app"
import { db, MODE } from "../src/config"

export const api = supertest(app)
const dbServer = new MongoMemoryServer()

jest.setTimeout(60 * 1000)  // one minute

if (MODE !== "test") {
  console.error("Tests must be run in test mode")
  process.exit(1)
}

beforeAll(async () => {
  const dbUri = await dbServer.getConnectionString()
  db.connect(dbUri)
})

afterAll(async () => {
  await db.disconnect()
  await dbServer.stop()
})
