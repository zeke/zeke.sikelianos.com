const http = require('http')
const app = require('../server')
const slop = require('../data/slop.json')

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

function findPage (predicate) {
  const page = slop.pages.find(predicate)
  if (!page) throw new Error('No matching page in data/slop.json')
  return page
}

let server

describe('slop indicator', () => {
  beforeAll((done) => {
    server = http.createServer(app)
    server.listen(0, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('discloses AI-generated prose below the post', async () => {
    const page = findPage(p => p.fractionAi >= 0.05)
    const res = await request(server, page.path)
    const percent = Math.round((page.fractionAi + page.fractionAiAssisted) * 100)

    expect(res.body).toContain(`Disclosure: ${percent}% of this post was written by AI`)
    expect(res.body).toContain('<a href="/slop-detection">See the analysis.</a>')
    // below the prose, at the end of the page content
    expect(res.body).toMatch(/<p class="slop-indicator slop-indicator--ai"[\s\S]*<\/p>\s*<\/div>\s*<\/article>/)
  })

  it('credits the human below the post', async () => {
    const page = findPage(p => p.fractionAi === 0 && p.fractionAiAssisted === 0)
    const res = await request(server, page.path)

    expect(res.body).toContain('This post was written entirely by a human')
    expect(res.body).toContain('<a href="/slop-detection">See the analysis.</a>')
    // below the prose, at the end of the page content
    expect(res.body).toMatch(/<p class="slop-indicator slop-indicator--human"[\s\S]*<\/p>\s*<\/div>\s*<\/article>/)
  })

  it('says nothing on pages with no detection results', async () => {
    const res = await request(server, '/cv')
    expect(res.body).not.toContain('slop-indicator')
  })

  it('lists every scanned page on /slop-detection', async () => {
    const res = await request(server, '/slop-detection')

    for (const page of slop.pages) {
      expect(res.body).toContain(`href="${page.dataUrl}"`)
    }
  })
})
