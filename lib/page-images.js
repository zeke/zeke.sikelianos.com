const fs = require('fs')
const path = require('path')
const walk = require('walk-sync').entries
const formats = [
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg'
]

module.exports = function pageImages (pagePath) {
  const result = {}
  const images = walk(path.dirname(pagePath))
    .filter(({ relativePath }) => {
      return formats.includes(path.extname(relativePath))
    })
    .map(fileData => {
      const ext = path.extname(fileData.relativePath)
      return {
        ...fileData,
        slug: path.basename(fileData.relativePath, ext),
        href: '/' + path.relative(path.join(process.cwd(), 'content'), fileData.fullPath)
      }
    })

  // allow images to be referenced by slug
  images.forEach(image => {
    result[image.slug] = image
  })

  return result
}
