import { NextFunction, Request, Response } from "express"

export const asyncWrapper = (f: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    f(req, res, next).catch(next)
}

export const catchAll = (req: Request, res: Response) => {
  res
    .status(404)
    .send("404")
}
