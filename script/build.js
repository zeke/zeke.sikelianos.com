#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const server = require('../server')
const port = '4001'
const host = `http://localhost:${port}`
const scrape = require('website-scraper')
const rimraf = require('rimraf').sync

main()

async function main () {
  const urls = (await require('../lib/pages')())
    .map(page => page.href)
    .map(href => `${host}${href}`)

  console.log('urls', urls)

  const dist = path.join(__dirname, '../docs')

  rimraf(dist)
  fs.mkdirSync(dist, { recursive: true })

  const scraperOptions = {
    urls,
    urlFilter: (url) => {
      // Do not download assets from other hosts like S3 or octodex.github.com
      // (this will keep them as remote references in the downloaded pages)
      return url.startsWith(`http://localhost:${port}/`)
    },
    directory: dist,
    filenameGenerator: 'bySiteStructure',
    requestConcurrency: 6
  }

  server.listen(port, async () => {
    console.log(`started server on ${host}`)

    await scrape(scraperOptions).catch(err => {
      console.error('scraping error')
      console.error(err)
    })

    process.exit()
  })
}
