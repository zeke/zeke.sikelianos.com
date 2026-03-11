const http = require('http')
const app = require('../server')

function request (server, path) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:${server.address().port}${path}`
    http.get(url, (res) => {
      let body = ''
      res.on('data', (chunk) => { body += chunk })
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

let server

describe('sitemap.xml', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('responds at /sitemap.xml', async () => {
    const res = await request(server, '/sitemap.xml')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/application\/xml/)
  })

  it('starts with an XML declaration', async () => {
    const res = await request(server, '/sitemap.xml')
    expect(res.body).toMatch(/^<\?xml/)
  })

  it('uses the correct xmlns', async () => {
    const res = await request(server, '/sitemap.xml')
    expect(res.body).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
  })

  it('contains <loc> entries', async () => {
    const res = await request(server, '/sitemap.xml')
    expect(res.body).toContain('<loc>')
  })

  it('has URLs starting with the site URL', async () => {
    const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'
    const res = await request(server, '/sitemap.xml')
    const locs = [...res.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
    expect(locs.length).toBeGreaterThan(0)
    for (const loc of locs) {
      expect(loc).toMatch(new RegExp(`^${SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))
    }
  })

  it('has unique URLs', async () => {
    const res = await request(server, '/sitemap.xml')
    const locs = [...res.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
    const unique = new Set(locs)
    expect(unique.size).toBe(locs.length)
  })

  it('has lastmod entries in YYYY-MM-DD format', async () => {
    const res = await request(server, '/sitemap.xml')
    const lastmods = [...res.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1])
    expect(lastmods.length).toBeGreaterThan(0)
    for (const lastmod of lastmods) {
      expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})
