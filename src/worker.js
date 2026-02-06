/* global Headers, Response */

import { Hono } from 'hono'

const app = new Hono()

app.all('*', async (c) => {
  const url = new URL(c.req.url)

  // Prevent staging `*.workers.dev` deploys from being indexed.
  const addNoIndexHeader = url.hostname.endsWith('.workers.dev')

  // Cloudflare's assets binding applies `html_handling` + `not_found_handling`.
  const response = await c.env.ASSETS.fetch(c.req.raw)
  return withHeaders(response, addNoIndexHeader)
})

export default app

function withHeaders (response, addNoIndexHeader) {
  const headers = new Headers(response.headers)
  let changed = false

  if (addNoIndexHeader) {
    headers.set('X-Robots-Tag', 'noindex, nofollow')
    changed = true
  }

  const contentType = headers.get('content-type')
  if (contentType && /^text\/html\b/i.test(contentType) && !/charset=/i.test(contentType)) {
    headers.set('content-type', `${contentType}; charset=utf-8`)
    changed = true
  }

  if (!changed) return response
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}
