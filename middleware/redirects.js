const redirectMap = require('../data/redirects.json')

module.exports = function redirects (req, res, next) {
  const destination = redirectMap[req.path]
  if (!destination) return next()
  res.redirect(301, destination)
}
