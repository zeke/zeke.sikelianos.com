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

describe('robots.txt', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('responds at /robots.txt', async () => {
    const res = await request(server, '/robots.txt')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/text\/plain/)
  })

  it('references the sitemap', async () => {
    const SITE_URL = process.env.SITE_URL || 'https://zeke.sikelianos.com'
    const res = await request(server, '/robots.txt')
    expect(res.body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
  })

  it('allows common bots', async () => {
    const res = await request(server, '/robots.txt')
    expect(res.body).toContain('User-agent: *')
    expect(res.body).toContain('Allow: /')
  })
})
