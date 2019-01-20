import express from "express"
import http from "http"
import helloController from "./controllers/helloController"
import * as mw from "./utils/mw"

export const app = express()
export const server = http.createServer(app)

const PORT = Number(process.env.PORT || 1337)

app.use(express.static("public"))
app.use(express.json())
app.use("/api", new helloController().routes())
app.use(mw.catchAll)

server.listen(PORT, () => {
  console.log(`pvtracker now listening on port ${PORT} in ${app.get("env")} mode`)
})
