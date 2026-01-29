const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'

module.exports = function robots (req, res, next) {
  if (req.path !== '/robots.txt') return next()

  const body = `User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`

  res.type('text/plain; charset=utf-8')
  res.send(body)
}
