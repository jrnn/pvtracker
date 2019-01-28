import { NextFunction, Request, Response } from "express"

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error)
  }
  const defaultResponse = {
    name: error.name,
    message: error.message
  }

  switch (error.name) {
    case "ValidationError":
      return res
        .status(400)
        .json(defaultResponse)
    case "CastError":
      return res
        .status(400)
        .json({
          name: "BadRequestError",
          message: "Invalid id format"
        })
    case "NotFoundError":
      return res
        .status(404)
        .json(defaultResponse)
    default:
      return res
        .status(500)
        .json(defaultResponse)
  }
}
