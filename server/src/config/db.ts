import mongoose from "mongoose"

const mongoOptions = {
  autoReconnect: true,
  promiseLibrary: global.Promise,
  reconnectInterval: 1000,
  useNewUrlParser: true
}

/**
 * Simple class for encapsulating the configuration, opening, and closing of connections to MongoDB.
 */
export class DatabaseConnection {

  public connect = (uri: string) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(uri, mongoOptions)
        .then(() => {
          console.log("Now connected to database at", uri)
          resolve()
        })
        .catch(error => {
          console.error("Failed to connect to database at", uri, "=", error)
          reject(error)
        })
    })
  }

  public disconnect = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .disconnect()
        .then(() => {
          console.log("Connection to database closed")
          resolve()
        })
        .catch(error => {
          console.error("Failed to disconnect from database =", error)
          reject(error)
        })
    })
  }
}
