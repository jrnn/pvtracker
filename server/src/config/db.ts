import mongoose from "mongoose"

const mongoOptions = {
  autoReconnect: true,
  promiseLibrary: global.Promise,
  reconnectInterval: 1000,
  useNewUrlParser: true
}

export class DatabaseConnection {
  public connect = (dbUri: string, dbType: string) => {
    mongoose
      .connect(dbUri, mongoOptions)
      .then(() => console.log(`Now connected to ${dbType}`))
      .catch((error) => {
        console.error(`Error connecting to database = ${error}`)
        process.exit(1)
      })
  }
  public disconnect = () => {
    mongoose
      .disconnect()
      .then(() => console.log("Connection to database closed"))
      .catch((error) => console.error(`Error disconnecting from database = ${error}`))
  }
}
