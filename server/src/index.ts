import express from "express"
import http from "http"
import path from "path"
import dotenv from "dotenv"
import mongoose from "mongoose"

import AccountController from "./controllers/accountController"
import HelloController from "./controllers/helloController"
import { errorHandler } from "./errors/handler"
import * as mw from "./utils/mw"

export const app = express()
export const server = http.createServer(app)
dotenv.config()

app.use(express.static(path.resolve(__dirname, "..", "static")))
app.use(express.json())
app.use("/accounts", new AccountController().routes())
app.use("/api", new HelloController().routes())
app.use(errorHandler)
app.use(mw.catchAll)

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.DB_URI, {
      autoReconnect: true,
      promiseLibrary: global.Promise,
      reconnectInterval: 1000,
      useNewUrlParser: true
    })
    .then(() => console.log("Now connected to database"))
    .catch((e) => console.log(`Error connecting to database = ${e}`))
}

const port = Number(process.env.PORT) || 7777
server.listen(port, () => {
  console.log(`pvtracker now listening on port ${port} in ${process.env.NODE_ENV} mode`)
})

server.on("close", () => {
  console.log("Now closing server and connection to database")
  mongoose.connection.close()
    .then(() => console.log("Connection to database closed"))
    .catch((e) => console.log(`Error occurred when closing database connection = ${e}`))
})
