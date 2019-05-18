import { NextFunction, Request, RequestHandler, Response } from "express"

import { MODE } from "../config"

/**
 * Middleware function for catching errors and sending an appropriate response depending on error
 * type. Should be positioned as the last piece in the Express app handler chain, to ensure that all
 * errors actually reach it.
 */
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (MODE !== "test") {
    console.error(error)
  }
  const { name, message } = error
  const defaultResponse = { name, message }

  switch (name) {
    case "ValidationError": {
      return res
        .status(400)
        .json(defaultResponse)
    }
    case "CastError": {
      return res
        .status(400)
        .json({
          name: "BadRequestError",
          message: "invalid id format"
        })
    }
    case "NotFoundError": {
      return res
        .status(404)
        .json(defaultResponse)
    }
    default: {
      return res
        .status(500)
        .json(defaultResponse)
    }
  }
}

/**
 * Wrapper function for catching errors in async code (i.e. rejected Promises) and passing them on
 * in the handler chain. If an error occurs anywhere within the wrapped function, the wrapper
 * catches it and pushes it forward with {@code next()}. In other words, {@code .catch(next)} is
 * "implied" whenever a Promise is rejected inside the wrapper.
 *
 * @param handler Express middleware function
 */
export const asyncWrapper = (handler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next)
  }
}
