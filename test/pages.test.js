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

describe('pages', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('serves the homepage', async () => {
    const res = await request(server, '/')
    expect(res.status).toBe(200)
    expect(res.body).toContain('</html>')
  })

  it('serves /cv', async () => {
    const res = await request(server, '/cv')
    expect(res.status).toBe(200)
    expect(res.body).toContain('</html>')
  })
})
