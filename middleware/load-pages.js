let pages
const { set } = require('lodash')

module.exports = async function loadPages (req, res, next) {
  if (!pages) pages = await require('../lib/pages')()

  set(req, 'context.pages', pages)
  set(req, 'context.projectPages', pages.filter(page => page.kind == 'project' && !page.noIndex))
  set(req, 'context.talkPages', pages.filter(page => page.kind == 'talk' && !page.noIndex))
  set(req, 'context.postPages', pages.filter(page => page.kind == 'post' && !page.noIndex))
  set(req, 'context.page', pages[req.path])

  return next()
}
