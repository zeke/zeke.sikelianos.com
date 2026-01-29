const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'
const SITE_ORIGIN = new URL(SITE_URL).origin

module.exports = function llmsFull (req, res, next) {
  if (req.path !== '/llms-full.txt') return next()

  const body = buildLlmsFull(req.context)
  res.type('text/plain; charset=utf-8')
  res.send(body)
}

function buildLlmsFull (context) {
  const entries = getEntries(context)
  const lines = []

  lines.push('# Zeke Sikelianos (Full Index)')
  lines.push('')
  lines.push('> Expanded list of site URLs for LLM ingestion.')
  lines.push('')
  lines.push(`Generated from site data. Canonical base: ${SITE_URL}.`)

  if (entries.sections.length) {
    lines.push('')
    lines.push('## Sections')
    lines.push(...entries.sections.map(entryToLine))
  }

  if (entries.projects.length) {
    lines.push('')
    lines.push('## Projects')
    lines.push(...entries.projects.map(entryToLine))
  }

  if (entries.pages.length) {
    lines.push('')
    lines.push('## Pages')
    lines.push(...entries.pages.map(entryToLine))
  }

  if (entries.posts.length) {
    lines.push('')
    lines.push('## Posts')
    lines.push(...entries.posts.map(entryToLine))
  }

  if (entries.talks.length) {
    lines.push('')
    lines.push('## Talks')
    lines.push(...entries.talks.map(entryToLine))
  }

  return `${lines.join('\n')}\n`
}

function getEntries (context) {
  const pages = (context && context.pages) || []
  const posts = (context && context.posts) || []
  const talks = (context && context.talks) || []

  const pageEntries = pages
    .filter(page => page && page.href)
    .map(page => ({
      href: page.href,
      title: page.title || page.href,
      description: page.description || '',
      kind: page.kind || ''
    }))
    .map(toEntry)
    .filter(Boolean)

  const postEntries = posts
    .filter(post => post && post.href)
    .map(post => ({
      href: post.href,
      title: post.title || post.href,
      description: formatPostMeta(post),
      kind: 'post'
    }))
    .map(toEntry)
    .filter(Boolean)

  const talkEntries = talks
    .filter(talk => talk && talk.href)
    .map(talk => ({
      href: talk.href,
      title: talk.title || talk.href,
      description: formatTalkMeta(talk),
      kind: 'talk'
    }))
    .map(toEntry)
    .filter(Boolean)

  const sections = pageEntries.filter(entry => entry.kind === 'section')
  const projects = pageEntries.filter(entry => entry.kind === 'project')
  const otherPages = pageEntries.filter(entry => !['section', 'project'].includes(entry.kind))

  return {
    sections: sortEntries(sections),
    projects: sortEntries(projects),
    pages: sortEntries(otherPages),
    posts: sortEntries(postEntries),
    talks: sortEntries(talkEntries)
  }
}

function toEntry (item) {
  const absoluteUrl = toAbsoluteUrl(item.href)
  if (!isCanonicalUrl(absoluteUrl)) return null
  return {
    href: normalizeUrl(absoluteUrl),
    title: sanitizeText(item.title || ''),
    description: sanitizeText(item.description || ''),
    kind: item.kind || ''
  }
}

function entryToLine (entry) {
  const description = entry.description ? `: ${entry.description}` : ''
  return `- [${entry.title}](${entry.href})${description}`
}

function sortEntries (entries) {
  return entries.slice().sort((a, b) => a.title.localeCompare(b.title))
}

function formatPostMeta (post) {
  return [post.publish_date].filter(Boolean).join(' - ')
}

function formatTalkMeta (talk) {
  return [talk.publish_date, talk.venue].filter(Boolean).join(' - ')
}

function sanitizeText (value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
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
