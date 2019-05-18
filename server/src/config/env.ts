/**
 * Look up environment variables. Doing this in one place helps reduce the "process.env.__" clutter
 * elsewhere, and ensures consistent default values where applicable.
 */

import dotenv from "dotenv"

dotenv.config()

export const DB_URI = process.env.DB_URI
export const MODE = process.env.NODE_ENV || "development"
export const PORT = Number(process.env.PORT) || 1337
