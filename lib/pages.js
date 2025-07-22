const walk = require('walk-sync').entries
const path = require('path')
const Page = require('./page')

module.exports = async function loadPages (dir) {
  dir = dir || path.join(process.cwd(), 'content')

  const pages = walk(dir)
    .filter(({ relativePath }) => {
      return (relativePath.endsWith('.md') || relativePath.endsWith('.html')) &&
      !relativePath.includes('README')
    })
    .map(fileData => new Page({ ...fileData }))

  for (page of pages) {
    await page.loadImages()
  }

  // attach hrefs as keys
  pages.forEach(page => {
    pages[page.href] = page
  })

  return pages.sort((a, b) => (b.publish_date > a.publish_date) ? 1 : -1)
}
