/**
 * Set up and configure the Express app instance. In practice this just means gathering the various
 * handlers and middleware that process requests, and chaining them in the right order. This is done
 * exactly the same regardless of mode (prod, dev, test...) -- further mode-specific adjustments are
 * done elsewhere, on top of the base app instance assembled here.
 */

import express from "express"
import path from "path"

import { errorHandler } from "./errors"
import { accountRouter, helloRouter } from "./routers"
import { catchAll } from "./utils"

export const app = express()

// TODO: rename to `public`?
const PUBLIC_DIR = path.resolve(__dirname, "..", "static")

/**
 * Set location from which static resources are served.
 */
app.use(express.static(PUBLIC_DIR))

/**
 * Register handlers for pre-processing requests before they reach the routers.
 */
app.use(express.json())

/**
 * Register routers that pair API endpoints with business logic.
 */
app.use("/accounts", accountRouter)
app.use("/api", helloRouter)

/**
 * Register "fall-through" handlers for dealing with garbage that the prior chain fails or refuses
 * to handle (errors, unauthorized requests, 404s etc.)
 */
app.use(errorHandler)
app.use(catchAll)
