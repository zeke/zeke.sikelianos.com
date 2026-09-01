const redirectMap = require('../data/redirects.json')

module.exports = function redirects (req, res, next) {
  const path = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path
  const destination = redirectMap[path]
  if (!destination) return next()
  res.redirect(301, destination)
}
