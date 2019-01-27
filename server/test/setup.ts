import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

let mongoServer: MongoMemoryServer

export const init = async () => {
  mongoServer = new MongoMemoryServer()
  const dbUri = await mongoServer.getConnectionString()
  console.log("Setting up in-memory database for testing")
  await mongoose
    .connect(dbUri, {
      autoReconnect: true,
      promiseLibrary: global.Promise,
      reconnectInterval: 1000,
      useNewUrlParser: true
    })
    .then(() => console.log("In-memory mongo database now up and running"))
    .catch((e) => console.log(`Error setting up in-memory database = ${e}`))
}

export const teardown = async () => {
  console.log("Shutting down in-memory mongo database")
  await mongoose.disconnect()
  await mongoose.connection.close()
    .then(() => console.log("Connection to database closed"))
    .catch((e) => console.log(`Something went wrong = ${e}`))
  await mongoServer.stop()
    .then(() => console.log("In-memory database successfully stopped"))
    .catch((e) => console.log(`Something went wrong = ${e}`))
}
