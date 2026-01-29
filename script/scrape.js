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
    .concat([`${host}/feed.xml`, `${host}/rss.xml`, `${host}/sitemap.xml`, `${host}/robots.txt`])

  const finalDirectory = path.join(__dirname, '../dist')
  const tempDirectory = path.join(__dirname, '../website-scraper-temp')
  rimraf(tempDirectory)

  // remove and recreate empty target directory
  rimraf(finalDirectory)
  fs.mkdirSync(finalDirectory, { recursive: true })

  const scraperOptions = {
    urls,
    urlFilter: (url) => {
      // Do not download assets from other hosts like S3 or octodex.github.com
      // (this will keep them as remote references in the downloaded pages)
      return url.startsWith(`http://localhost:${port}/`) || url.startsWith('/')
    },
    directory: tempDirectory,
    filenameGenerator: 'bySiteStructure',
    requestConcurrency: 20
  }

  server.listen(port, async () => {
    console.log(`scraping ${host}...`)

    await scrape(scraperOptions).catch(err => {
      console.error('scraping error')
      console.error(err)
    })

    fs.renameSync(
      path.join(tempDirectory, `/localhost_${port}`),
      path.join(finalDirectory)
    )
    rimraf(tempDirectory)

    process.exit()
  })
}
