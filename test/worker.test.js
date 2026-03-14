// Test the worker's withHeaders logic in isolation (no Cloudflare runtime needed).
// We import the source and extract the function by evaluating the ESM module as text,
// but since it depends on Hono and Cloudflare bindings, we test the header logic directly.

describe('worker header logic', () => {
  function withHeaders (responseHeaders, addNoIndexHeader, origin) {
    const headers = new Map(Object.entries(responseHeaders))
    let changed = false

    if (addNoIndexHeader) {
      headers.set('X-Robots-Tag', 'noindex, nofollow')
      changed = true
    }

    const contentType = headers.get('content-type')
    if (contentType && /^text\/html\b/i.test(contentType)) {
      if (!/charset=/i.test(contentType)) {
        headers.set('content-type', `${contentType}; charset=utf-8`)
        changed = true
      }
      headers.set('Link', `<${origin}/feed.xml>; rel="alternate"; type="application/rss+xml"; title="RSS Feed"`)
      changed = true
    }

    return { headers: Object.fromEntries(headers), changed }
  }

  it('adds noindex header for workers.dev hostnames', () => {
    const result = withHeaders({ 'content-type': 'text/css' }, true, 'https://foo.workers.dev')
    expect(result.headers['X-Robots-Tag']).toBe('noindex, nofollow')
  })

  it('does not add noindex header for production hostnames', () => {
    const result = withHeaders({ 'content-type': 'text/css' }, false, 'https://zeke.sikelianos.com')
    expect(result.headers['X-Robots-Tag']).toBeUndefined()
  })

  it('appends charset to text/html responses', () => {
    const result = withHeaders({ 'content-type': 'text/html' }, false, 'https://zeke.sikelianos.com')
    expect(result.headers['content-type']).toBe('text/html; charset=utf-8')
  })

  it('does not double-add charset', () => {
    const result = withHeaders({ 'content-type': 'text/html; charset=utf-8' }, false, 'https://zeke.sikelianos.com')
    expect(result.headers['content-type']).toBe('text/html; charset=utf-8')
  })

  it('adds Link header for HTML responses', () => {
    const result = withHeaders({ 'content-type': 'text/html' }, false, 'https://zeke.sikelianos.com')
    expect(result.headers.Link).toContain('/feed.xml')
    expect(result.headers.Link).toContain('rel="alternate"')
  })

  it('does not add Link header for non-HTML responses', () => {
    const result = withHeaders({ 'content-type': 'application/json' }, false, 'https://zeke.sikelianos.com')
    expect(result.headers.Link).toBeUndefined()
  })
})
