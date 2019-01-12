const router = require("express").Router()
const { asyncWrapper } = require("../utils/mw")

router.get("/", asyncWrapper(async (req, res) => {
  res.send("hello world")
}))

module.exports = router
