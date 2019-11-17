const walk = require('walk-sync').entries
const path = require('path')
const Page = require('./page')

module.exports = async function loadPages (dir) {
  dir = dir || path.join(process.cwd(), 'content')

  const pages = walk(dir)
    .filter(({ relativePath }) => {
      return relativePath.endsWith('.md') &&
      !relativePath.includes('README')
    })
    .map(fileData => new Page({ ...fileData }))

  // attach hrefs as keys
  pages.forEach(page => {
    pages[page.href] = page
  })

  return pages
}
