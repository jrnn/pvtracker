import { Request, Response } from "express"

/**
 * Unconditionally send 404 response. Should be used as the very last "fall-through" handler in the
 * Express app handler chain.
 */
export const catchAll = (req: Request, res: Response) => {
  res
    .status(404)
    .send("404")
}
