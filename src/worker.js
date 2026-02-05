/* global Headers, Request, Response */

import {
  HTTP_MESSAGE_SIGNATURES_DIRECTORY,
  MediaType,
  directoryResponseHeaders
} from 'web-bot-auth'
import { Ed25519Signer } from 'web-bot-auth/crypto'

export default {
  async fetch (request, env) {
    const url = new URL(request.url)

    // We deploy to `website.ziki.workers.dev` as a staging host while DNS still
    // points production traffic at GitHub Pages. This prevents the staging URL
    // from getting indexed (or outranking the canonical domain) during the
    // migration.
    const addNoIndexHeader = url.hostname.endsWith('.workers.dev')

    // Serve the Web Bot Auth JWKS directory
    // https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/
    if (url.pathname === HTTP_MESSAGE_SIGNATURES_DIRECTORY) {
      return handleJwksDirectory(request, env)
    }

    // If we serve `/foo` as `/foo/index.html` without redirecting, relative asset
    // URLs in the HTML resolve against `/foo` (a "file" URL), not `/foo/` (a
    // directory URL). That breaks assets like `outpainter.mp4`.
    const accept = request.headers.get('accept') || ''
    const looksLikeNavigation = request.method === 'GET' && accept.includes('text/html')
    if (looksLikeNavigation && url.pathname !== '/' && !url.pathname.endsWith('/')) {
      const lastSegment = url.pathname.split('/').pop() || ''
      const isFileLike = lastSegment.includes('.')
      if (!isFileLike) {
        const redirectUrl = new URL(request.url)
        redirectUrl.pathname += '/'
        return withHeaders(Response.redirect(redirectUrl.toString(), 301), addNoIndexHeader)
      }
    }

    // First try exact asset match
    let response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return withHeaders(response, addNoIndexHeader)

    // For pretty URLs, retry as directory index: `/cv` -> `/cv/index.html`
    const lastSegment = url.pathname.split('/').pop() || ''
    const isFileLike = lastSegment.includes('.')
    if (!isFileLike) {
      const indexUrl = new URL(request.url)
      indexUrl.pathname = indexUrl.pathname.replace(/\/?$/, '/') + 'index.html'
      response = await env.ASSETS.fetch(new Request(indexUrl, request))
      if (response.status !== 404) return withHeaders(response, addNoIndexHeader)
    }

    // If this looks like a browser navigation, serve our custom 404 page.
    if (accept.includes('text/html')) {
      const notFoundUrl = new URL(request.url)
      notFoundUrl.pathname = '/404/index.html'
      const notFound = await env.ASSETS.fetch(new Request(notFoundUrl, request))
      if (notFound.status !== 404) {
        return withHeaders(
          new Response(notFound.body, {
            status: 404,
            headers: notFound.headers
          }),
          addNoIndexHeader
        )
      }
    }

    return withHeaders(response, addNoIndexHeader)
  }
}

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

/**
 * Handle requests to /.well-known/http-message-signatures-directory
 * Returns a signed JWKS directory for Web Bot Auth verification
 */
async function handleJwksDirectory (request, env) {
  // Get the signing key from environment
  const jwk = JSON.parse(env.WEB_BOT_AUTH_KEY)

  // Build the JWKS directory
  const directory = {
    keys: [{
      kty: jwk.kty,
      crv: jwk.crv,
      x: jwk.x
    }]
  }

  // Create the signer
  const signer = await Ed25519Signer.fromJWK(jwk)

  // directoryResponseHeaders requires a ResponseRequestPair
  // We build a minimal response object and pair it with the original request
  const responseBody = JSON.stringify(directory)
  const responseLike = {
    status: 200,
    headers: {
      'Content-Type': MediaType.HTTP_MESSAGE_SIGNATURES_DIRECTORY
    }
  }
  const requestLike = {
    method: request.method,
    url: request.url,
    headers: request.headers
  }

  // Sign the response with the directory-specific headers
  const now = new Date()
  const expires = new Date(now.getTime() + 300000) // 5 minutes
  const signedHeaders = await directoryResponseHeaders(
    { response: responseLike, request: requestLike },
    [signer],
    { created: now, expires }
  )

  return new Response(responseBody, {
    headers: {
      ...signedHeaders,
      'Content-Type': MediaType.HTTP_MESSAGE_SIGNATURES_DIRECTORY,
      'Cache-Control': 'max-age=86400'
    }
  })
}
