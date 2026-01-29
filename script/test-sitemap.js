#!/usr/bin/env node

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'
const distDir = path.join(__dirname, '../dist')

async function main () {
  const sitemapPath = path.join(distDir, 'sitemap.xml')
  const robotsPath = path.join(distDir, 'robots.txt')

  assert.ok(fs.existsSync(sitemapPath), 'sitemap.xml exists in dist')
  assert.ok(fs.existsSync(robotsPath), 'robots.txt exists in dist')

  const sitemapBody = fs.readFileSync(sitemapPath, 'utf8')
  assert.ok(sitemapBody.startsWith('<?xml'), 'sitemap xml declaration')
  assert.ok(sitemapBody.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap xmlns')

  const locs = extractTags(sitemapBody, 'loc')
  assert.ok(locs.length > 0, 'sitemap has urls')
  const uniqueLocs = new Set(locs)
  assert.equal(uniqueLocs.size, locs.length, 'sitemap has unique urls')
  for (const loc of locs) {
    assert.ok(loc.startsWith(SITE_URL), `canonical url: ${loc}`)
  }

  const lastmods = extractTags(sitemapBody, 'lastmod')
  assert.ok(lastmods.length > 0, 'sitemap has lastmod entries')
  for (const lastmod of lastmods) {
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(lastmod), `lastmod format: ${lastmod}`)
  }

  const robotsBody = fs.readFileSync(robotsPath, 'utf8')
  assert.ok(robotsBody.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots sitemap reference')
}

function extractTags (xml, tagName) {
  const results = []
  const regex = new RegExp(`<${tagName}>([^<]+)<\\/${tagName}>`, 'g')
  let match
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1])
  }
  return results
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
