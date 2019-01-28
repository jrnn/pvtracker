import { Request, Response } from "express"
import Controller from "./controller"
import { Account } from "../models/account"
import { NotFoundError } from "../errors/errors"
import { asyncWrapper as wrapper } from "../utils/mw"

export default class AccountController extends Controller {
  public routes() {
    this.router.get("/", wrapper(async (req: Request, res: Response) => {
      const accounts = await Account.find().exec()
      res
        .status(200)
        .json(accounts)
    }))

    this.router.get("/:id", wrapper(async (req: Request, res: Response) => {
      const { id } = req.params
      const account = await Account.findById(id).exec()
      if (!account) {
        throw new NotFoundError()
      }
      res
        .status(200)
        .json(account)
    }))

    this.router.post("/", wrapper(async (req: Request, res: Response) => {
      const account = await new Account(req.body).save()
      res
        .status(201)
        .json(account)
    }))

    return this.router
  }
}
