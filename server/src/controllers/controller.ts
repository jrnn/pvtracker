import { Router } from "express"

export default abstract class Controller {
  public router: Router = Router()

  public abstract routes(): Router
}
