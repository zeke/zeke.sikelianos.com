const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'

module.exports = function robots (req, res, next) {
  if (req.path !== '/robots.txt') return next()

  const body = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`

  res.type('text/plain; charset=utf-8')
  res.send(body)
}
