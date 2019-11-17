const path = require('path')
const dataDirectory = require('@github-docs/data-directory')

module.exports = function pageData (pagePath) {
  return dataDirectory(path.dirname(pagePath))
}
