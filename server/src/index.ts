import express from "express"
import http from "http"
import path from "path"
import dotenv from "dotenv"

import { DatabaseConnection } from "./config/db"
import AccountController from "./controllers/accountController"
import HelloController from "./controllers/helloController"
import { errorHandler } from "./errors/handler"
import * as mw from "./utils/mw"

export const app = express()
export const server = http.createServer(app)
export const db = new DatabaseConnection()

dotenv.config()

app.use(express.static(path.resolve(__dirname, "..", "static")))
app.use(express.json())
app.use("/accounts", new AccountController().routes())
app.use("/api", new HelloController().routes())
app.use(errorHandler)
app.use(mw.catchAll)

const port = Number(process.env.PORT) || 7777
server.listen(port, () => {
  console.log(`pvtracker now listening on port ${port} in ${process.env.NODE_ENV} mode`)
  if (process.env.NODE_ENV !== "test") {
    db.connect(process.env.DB_URI, "external mongo database")
  }
})

server.on("close", () => {
  console.log("Now closing server and connection to database")
  db.disconnect()
})

process.on("SIGTERM", () => {
  server.close()
})
