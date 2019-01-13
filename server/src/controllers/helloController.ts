import { Request, Response } from "express"
import Controller from "./controller"
import { asyncWrapper as aw } from "../utils/mw"

export default class HelloController extends Controller {
  public routes() {
    this.router.get("/", aw(async (req: Request, res: Response) => {
      res.send("hello node.js + typescript world")
    }))

    this.router.get("/secret", aw(async (req: Request, res: Response) => {
      res.send("the owls are not what they seem")
    }))

    return this.router
  }
}
