import { Router } from "express"

import { asyncWrapper as wrapper } from "../errors"

export const router = Router()

router.get("/", wrapper(async (req, res) => {
  res.json("hello node.js + typescript world")
}))

router.get("/secret", wrapper(async (req, res) => {
  res.json("the owls are not what they seem")
}))
