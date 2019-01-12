const asyncWrapper = (f) => (req, res, next) => {
  f(req, res, next).catch(next)
}

const catchAll = (req, res) => {
  res
    .status(404)
    .send("404")
}

module.exports = {
  asyncWrapper,
  catchAll
}
