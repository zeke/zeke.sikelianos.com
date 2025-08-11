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

  const sortedPages = pages.sort((a, b) => {
    // Handle cases where publish_date is falsy
    if (!a.publish_date) return 1
    if (!b.publish_date) return -1

    // Compare dates, newest first
    return b.publish_date - a.publish_date
  })

  return sortedPages
}
