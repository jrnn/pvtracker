const express = require("express")
const app = express()
const server = require("http").createServer(app)
const { catchAll } = require("./utils/mw")

const PORT = process.env.PORT || 1337

app.use(express.static("public"))
app.use(express.json())
app.use("/api", require("./routers/router"))
app.use(catchAll)

server.listen(PORT, () => {
  console.log(`pvtracker now listening on port ${PORT} in ${app.get("env")} mode`)
})

module.exports = {
  app,
  server
}
