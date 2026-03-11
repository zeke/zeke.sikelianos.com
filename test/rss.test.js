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

describe('RSS feed', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('responds at /feed.xml', async () => {
    const res = await request(server, '/feed.xml')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/rss\+xml/)
  })

  it('responds at /rss.xml', async () => {
    const res = await request(server, '/rss.xml')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/rss\+xml/)
  })

  it('is valid RSS', async () => {
    const res = await request(server, '/feed.xml')
    expect(res.body).toMatch(/^<\?xml/)
    expect(res.body).toContain('<rss version="2.0">')
    expect(res.body).toContain('<channel>')
    expect(res.body).toContain('<title>')
  })

  it('contains feed items', async () => {
    const res = await request(server, '/feed.xml')
    expect(res.body).toContain('<item>')
    expect(res.body).toContain('<link>')
  })

  it('has a lastBuildDate', async () => {
    const res = await request(server, '/feed.xml')
    expect(res.body).toContain('<lastBuildDate>')
  })
})
