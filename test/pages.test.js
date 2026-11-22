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

function projectNav (body) {
  return body.match(/<nav class="project-nav"[\s\S]*?<\/nav>/)?.[0] || ''
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

  it('links adjacent projects in homepage order without wrapping', async () => {
    const home = await request(server, '/')
    const cards = Array.from(home.body.matchAll(/class="card-thumbnail" href="([^"]+)"/g), match => match[1])
    const outsideSequence = new Set(['/404/index', '/karpathy', '/http', '/parallax/index'])
    const projects = cards.filter(href => href.startsWith('/') && !outsideSequence.has(href))
    expect(projects.length).toBeGreaterThan(3)

    for (const index of [0, Math.floor(projects.length / 2), projects.length - 1]) {
      const page = await request(server, projects[index])
      expect(page.status).toBe(200)
      const nav = projectNav(page.body)
      expect(nav).toContain('aria-label="Project navigation"')
      expect(nav).toContain('href="/" aria-label="All projects"')

      if (index === 0) {
        expect(nav).not.toContain('rel="prev"')
      } else {
        expect(nav).toContain(`href="${projects[index - 1]}" rel="prev" aria-label="Previous project: `)
      }

      if (index === projects.length - 1) {
        expect(nav).not.toContain('rel="next"')
      } else {
        expect(nav).toContain(`href="${projects[index + 1]}" rel="next" aria-label="Next project: `)
      }
    }
  })

  it('omits project navigation on the homepage, sections, talks, and sibling content', async () => {
    for (const path of ['/', '/cv', '/karpathy', '/dial-a-repo/transcript']) {
      const res = await request(server, path)
      expect(res.status).toBe(200)
      expect(projectNav(res.body)).toBe('')
    }
  })

  it('serves /cv', async () => {
    const res = await request(server, '/cv')
    expect(res.status).toBe(200)
    expect(res.body).toContain('</html>')
  })
})
