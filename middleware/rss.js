const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'

module.exports = function rss (req, res, next) {
  if (req.path !== '/feed.xml' && req.path !== '/rss.xml') return next()

  const items = getAllItems(req.context)
    .slice(0, 50)
    .map(thingToItem)
    .join('\n')

  const lastBuildDate = getLastBuildDate(req.context)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml('Zeke Sikelianos')}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml('Updates: pages, posts, talks.')}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>zeke.sikelianos.com</generator>
${items}
  </channel>
</rss>
`

  res.type('application/rss+xml; charset=utf-8')
  res.send(xml)
}

function getAllItems (context) {
  const posts = ((context && context.posts) || [])
    .filter(post => post && post.title && post.href)
    .map(post => ({
      title: post.title,
      href: post.href,
      publish_date: post.publish_date,
      description: post.description,
      category: 'Post'
    }))

  // If something is in posts.json and also exists as a local page (often kind: project),
  // prefer the Post entry and omit the Page entry to avoid duplicates.
  const internalPostLinks = new Set(
    posts
      .map(p => String(p.href))
      .filter(href => href.startsWith('/'))
      .map(href => normalizeUrl(toAbsoluteUrl(href)))
  )

  const pages = ((context && context.pages) || [])
    .filter(page => page && !page.noIndex && page.kind !== 'section')
    .filter(page => page.publish_date || page.update_date)
    .filter(page => {
      return !internalPostLinks.has(normalizeUrl(toAbsoluteUrl(page.href)))
    })
    .map(page => ({
      title: page.title,
      href: page.href,
      publish_date: page.update_date || page.publish_date,
      description: page.description,
      category: 'Page'
    }))

  const pageLinks = new Set(pages.map(p => normalizeUrl(toAbsoluteUrl(p.href))))

  const talks = ((context && context.talks) || [])
    .filter(talk => talk && talk.title && talk.href)
    .filter(talk => {
      const href = String(talk.href)
      if (!href.startsWith('/')) return true
      return !pageLinks.has(normalizeUrl(toAbsoluteUrl(href)))
    })
    .map(talk => ({
      title: talk.title,
      href: talk.href,
      publish_date: talk.publish_date,
      description: talk.venue ? `Venue: ${talk.venue}` : undefined,
      category: 'Talk'
    }))

  return [...pages, ...posts, ...talks]
    .filter(item => item.publish_date)
    .sort((a, b) => {
      return toSortableDate(b.publish_date) - toSortableDate(a.publish_date)
    })
}

function thingToItem (thing) {
  const title = escapeXml(thing.title || '')
  const link = escapeXml(toAbsoluteUrl(thing.href || ''))
  const guid = link
  const pubDate = thing.publish_date ? `\n      <pubDate>${toRfc822Date(thing.publish_date)}</pubDate>` : ''
  const description = thing.description ? `\n      <description>${escapeXml(thing.description)}</description>` : ''
  const category = thing.category ? `\n      <category>${escapeXml(thing.category)}</category>` : ''

  return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>${pubDate}${description}${category}
    </item>`
}

function toAbsoluteUrl (href) {
  if (!href) return SITE_URL
  if (href.startsWith('http://') || href.startsWith('https://')) return href
  if (!href.startsWith('/')) href = `/${href}`
  return `${SITE_URL}${href}`
}

function normalizeUrl (url) {
  url = String(url || '')
  if (url === SITE_URL) return url
  return url.replace(/\/+$/, '')
}

function getLastBuildDate (context) {
  const newest = getAllItems(context)[0]
  if (newest && newest.publish_date) return toRfc822Date(newest.publish_date)
  return new Date().toUTCString()
}

function toSortableDate (dateValue) {
  const date = toDate(dateValue)
  return Number.isNaN(date.getTime()) ? 0 : date.getTime()
}

function toRfc822Date (dateValue) {
  const date = toDate(dateValue)
  if (Number.isNaN(date.getTime())) return new Date().toUTCString()
  return date.toUTCString()
}

function toDate (dateValue) {
  if (dateValue instanceof Date) return dateValue
  if (typeof dateValue === 'number') return new Date(dateValue)
  const str = String(dateValue || '')
  // Common case: YYYY-MM-DD
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
