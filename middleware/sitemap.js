const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'
const SITE_ORIGIN = new URL(SITE_URL).origin

module.exports = function sitemap (req, res, next) {
  if (req.path !== '/sitemap.xml') return next()

  const entries = getSitemapEntries(req.context)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entryToXml).join('\n')}
</urlset>
`

  res.type('application/xml; charset=utf-8')
  res.send(xml)
}

function getSitemapEntries (context) {
  const urls = new Map()

  const pages = ((context && context.pages) || [])
    .filter(page => page && !page.noIndex && page.kind !== 'section')
    .map(page => ({
      href: page.href,
      lastmod: page.update_date || page.publish_date
    }))

  const posts = ((context && context.posts) || [])
    .filter(post => post && post.href)
    .map(post => ({
      href: post.href,
      lastmod: post.publish_date
    }))

  const talks = ((context && context.talks) || [])
    .filter(talk => talk && talk.href)
    .map(talk => ({
      href: talk.href,
      lastmod: talk.publish_date
    }))

  for (const item of [...pages, ...posts, ...talks]) {
    const absoluteUrl = toAbsoluteUrl(item.href)
    if (!isCanonicalUrl(absoluteUrl)) continue
    const normalizedUrl = normalizeUrl(absoluteUrl)
    if (!urls.has(normalizedUrl)) {
      urls.set(normalizedUrl, {
        loc: normalizedUrl,
        lastmod: toIsoDate(item.lastmod)
      })
    }
  }

  return Array.from(urls.values())
}

function entryToXml (entry) {
  const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
  return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
  </url>`
}

function toAbsoluteUrl (href) {
  if (!href) return SITE_URL
  if (href.startsWith('http://') || href.startsWith('https://')) return href
  if (!href.startsWith('/')) href = `/${href}`
  return `${SITE_URL}${href}`
}

function isCanonicalUrl (url) {
  try {
    return new URL(url).origin === SITE_ORIGIN
  } catch (err) {
    return false
  }
}

function normalizeUrl (url) {
  if (!url) return `${SITE_URL}/`
  if (url === SITE_URL || url === `${SITE_URL}/`) return `${SITE_URL}/`
  return url.replace(/\/+$/, '')
}

function toIsoDate (dateValue) {
  if (!dateValue) return null
  const date = toDate(dateValue)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

function toDate (dateValue) {
  if (dateValue instanceof Date) return dateValue
  if (typeof dateValue === 'number') return new Date(dateValue)
  const str = String(dateValue || '')
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(`${str}T00:00:00.000Z`)
  return new Date(str)
}

function escapeXml (str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
