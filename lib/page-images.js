const fs = require('fs')
const path = require('path')
const walk = require('walk-sync').entries
const getImageColors = require('get-image-colors')
const formats = [
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg'
]

module.exports = async function pageImages (pagePath) {
  const result = {}
  const images = walk(path.dirname(pagePath))
    .filter(({ relativePath }) => {
      return formats.includes(path.extname(relativePath))
    })
    .map(fileData => {
      const ext = path.extname(fileData.relativePath)
      fullPath = path.join(fileData.basePath, fileData.relativePath)
      return {
        ...fileData,
        fullPath,
        slug: path.basename(fileData.relativePath, ext),
        href: '/' + path.relative(path.join(process.cwd(), 'content'), fileData.fullPath)
      }
    })

  // load color palette for each image
  // for (image of images) {
  //   try {
  //     image.colors = await getImageColors(image.fullPath)
  //   } catch (err) {
  //     console.error('unable to load colors for image', image.fullPath)
  //     console.error(err)
  //   }
  // }

  // allow images to be referenced by slug
  images.forEach(image => {
    result[image.slug] = image
  })

  return result
}
