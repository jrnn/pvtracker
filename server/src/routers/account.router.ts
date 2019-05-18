import { Router } from "express"

import { asyncWrapper as wrapper, NotFoundError } from "../errors"
import { AccountModel } from "../models"

/**
 * Controls endpoints for fetching, creating, editing, and deleting Accounts.
 */
export const router = Router()

router.get("/", wrapper(async (req, res) => {
  const accounts = await AccountModel
    .find()
    .exec()
  res
    .status(200)
    .json(accounts)
}))

router.get("/:id", wrapper(async (req, res) => {
  const { id } = req.params
  const account = await AccountModel
    .findById(id)
    .exec()
  if (!account) {
    throw new NotFoundError()
  }
  res
    .status(200)
    .json(account)
}))

router.post("/", wrapper(async (req, res) => {
  const account = await new AccountModel(req.body).save()
  res
    .status(201)
    .json(account)
}))

router.put("/:id", wrapper(async (req, res) => {
  const { id } = req.params
  const account = await AccountModel
    .findById(id)
    .exec()
  if (!account) {
    throw new NotFoundError()
  }
  account.patch(req.body)
  const patched = await account.save()
  res
    .status(200)
    .json(patched)
}))
