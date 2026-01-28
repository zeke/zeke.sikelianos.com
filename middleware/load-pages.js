let pages
const { set } = require('lodash')
const fs = require('fs/promises')
const path = require('path')

module.exports = async function loadPages (req, res, next) {
  if (!pages) pages = await require('../lib/pages')()

  set(req, 'context.pages', pages)
  set(req, 'context.projectPages', pages.filter(page => page.kind == 'project'))
  set(req, 'context.page', pages[req.path])
  set(req, 'context.siteUrl', process.env.SITE_URL || 'https://zeke.sikelianos.com')

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

  // Load posts from JSON
  const postsPath = path.join(process.cwd(), 'data', 'posts.json')
  let posts = []
  try {
    const postsRaw = await fs.readFile(postsPath, 'utf8')
    posts = JSON.parse(postsRaw)
    posts = posts.sort((a, b) => (b.publish_date || '').localeCompare(a.publish_date || ''))
  } catch (err) {
    posts = []
  }
  set(req, 'context.posts', posts)

  return next()
}
