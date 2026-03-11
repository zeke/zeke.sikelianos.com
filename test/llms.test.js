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

describe('llms.txt', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('responds at /llms.txt', async () => {
    const res = await request(server, '/llms.txt')
    expect(res.status).toBe(200)
  })

  it('has an H1 title', async () => {
    const res = await request(server, '/llms.txt')
    const lines = res.body.split(/\r?\n/)
    expect(lines[0]).toMatch(/^# /)
  })

  it('has a summary blockquote', async () => {
    const res = await request(server, '/llms.txt')
    expect(res.body).toContain('\n> ')
  })
})

describe('llms-full.txt', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('responds at /llms-full.txt', async () => {
    const res = await request(server, '/llms-full.txt')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/text\/plain/)
  })

  it('has an H1 title', async () => {
    const res = await request(server, '/llms-full.txt')
    const lines = res.body.split(/\r?\n/)
    expect(lines[0]).toMatch(/^# /)
  })

  it('has a summary blockquote', async () => {
    const res = await request(server, '/llms-full.txt')
    expect(res.body).toContain('\n> ')
  })

  it('contains section headings', async () => {
    const res = await request(server, '/llms-full.txt')
    expect(res.body).toMatch(/^## /m)
  })

  it('contains markdown links', async () => {
    const res = await request(server, '/llms-full.txt')
    expect(res.body).toMatch(/\[.+\]\(https?:\/\/.+\)/)
  })
})
