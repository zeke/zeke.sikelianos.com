const http = require('http')
const app = require('../server')

function request (server, path) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:${server.address().port}${path}`
    http.get(url, (res) => {
      res.resume()
      res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

let server

describe('redirects', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('redirects a known path', async () => {
    const res = await request(server, '/resume')
    expect(res.status).toBe(301)
    expect(res.location).toBe('/cv')
  })

  it('redirects a known path with a trailing slash in one hop', async () => {
    const res = await request(server, '/resume/')
    expect(res.status).toBe(301)
    expect(res.location).toBe('/cv')
  })

  it('drops trailing slashes', async () => {
    const res = await request(server, '/cv/')
    expect(res.status).toBe(301)
    expect(res.location).toBe('/cv')
  })

  it('preserves the query string when dropping a trailing slash', async () => {
    const res = await request(server, '/cv/?foo=bar')
    expect(res.status).toBe(301)
    expect(res.location).toBe('/cv?foo=bar')
  })

  it('leaves the homepage alone', async () => {
    const res = await request(server, '/')
    expect(res.status).toBe(200)
  })
})
