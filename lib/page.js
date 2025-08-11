const assert = require('assert')
const fs = require('fs')
const path = require('path')
const renderContent = require('@github-docs/render-content')
const { liquid } = renderContent
const frontmatter = require('html-frontmatter')
const defaultLayout = fs.readFileSync(path.join(__dirname, '../layout.html'), 'utf8')
const getImages = require('./page-images')
const getData = require('./page-data')

class Page {
  constructor (opts) {
    assert(opts.relativePath, 'relativePath is required')
    assert(opts.basePath, 'basePath is required')

    Object.assign(this, { ...opts })
    this.fullPath = path.join(this.basePath, this.relativePath)
    this.raw = fs.readFileSync(this.fullPath, 'utf8')

    const data = frontmatter(this.raw)

    Object.assign(this, data)

    // convert single-value redirect strings into an array
    this.redirect_from = this.redirect_from || []
    if (typeof this.redirect_from === 'string') {
      this.redirect_from = [this.redirect_from]
    }

    this.href = this.redirect || filepathToHref(this.relativePath)

    this.data = getData(this.fullPath)

    return this
  }

  async loadImages () {
    this.images = await getImages(this.fullPath)
    return this
  }

  async render (context) {
    const renderedPage = await renderContent(this.raw, context)
    const layout = context.page.layout === false ? '{{renderedPage}}' : defaultLayout
    const wrappedPage = await liquid.parseAndRender(layout, { ...context, renderedPage })
    return wrappedPage
  }
}

module.exports = Page

const trailingSlash = /^(.+?)\/+?$/

function filepathToHref (filepath) {
  return '/' + filepath
    .replace('index.md', '')
    .replace('.md', '')
    .replace('.html', '')
    .replace(trailingSlash, '$1')
}
