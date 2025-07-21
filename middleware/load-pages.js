let pages
const { set } = require('lodash')
const fs = require('fs/promises')
const path = require('path')

module.exports = async function loadPages (req, res, next) {
  if (!pages) pages = await require('../lib/pages')()

  set(req, 'context.pages', pages)
  set(req, 'context.projectPages', pages.filter(page => page.kind == 'project' && !page.noIndex))
  set(req, 'context.postPages', pages.filter(page => page.kind == 'post' && !page.noIndex))
  set(req, 'context.page', pages[req.path])

  // Load talks from JSON
  const talksPath = path.join(process.cwd(), 'data', 'talks.json')
  let talks = []
  try {
    const talksRaw = await fs.readFile(talksPath, 'utf8')
    talks = JSON.parse(talksRaw)
    talks = talks.sort((a, b) => (b.publish_date || '').localeCompare(a.publish_date || ''))
  } catch (err) {
    // If file missing or invalid, fallback to empty
    talks = []
  }
  set(req, 'context.talks', talks)

  return next()
}
