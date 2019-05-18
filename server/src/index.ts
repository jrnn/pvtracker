/**
 * Point of entry in development and production modes, where the API must be available for HTTP
 * requests via a port, and a connection to an external MongoDB must be established. There is a
 * separate setup for test mode, as both the API and DB are handled differently when running tests.
 */

import { app } from "./app"
import { db, DB_URI, MODE, PORT } from "./config"

app.listen(PORT, () => {
  console.log(`pvtracker now listening on port ${PORT} in ${MODE} mode`)
  db
    .connect(DB_URI)
    .catch(() => process.exit(1))
})

process.on("SIGTERM", () => db.disconnect())
