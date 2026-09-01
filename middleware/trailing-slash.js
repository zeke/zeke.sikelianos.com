// Canonical URLs have no trailing slash, matching the production
// `html_handling: drop-trailing-slash` setting in wrangler.jsonc.
module.exports = function trailingSlash (req, res, next) {
  if (req.path === '/' || !req.path.endsWith('/')) return next()

  const search = req.originalUrl.slice(req.path.length)
  res.redirect(301, req.path.replace(/\/+$/, '') + search)
}
