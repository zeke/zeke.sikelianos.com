let pages
const { set } = require('lodash')

module.exports = async function loadPages (req, res, next) {
  if (!pages) pages = await require('../lib/pages')()

  set(req, 'context.pages', pages)
  set(req, 'context.page', pages[req.path])

  return next()
}
