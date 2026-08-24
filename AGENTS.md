# Development Notes for AI Agents

This repo builds a static personal site from local content and deploys it to Cloudflare.

## URLs + Hosting

- Production: https://zeke.sikelianos.com
- Alternate/staging: https://website.ziki.workers.dev
- Hosted on Cloudflare (Workers + static assets)
- `src/worker.js` adds `X-Robots-Tag: noindex, nofollow` on `*.workers.dev` to avoid indexing the staging host.
- `src/worker.js` also handles pretty URLs (`/cv` -> `/cv/index.html`), adds trailing slashes for navigations, and serves the custom `content/404/` page for HTML 404s.
- Cloudflare zone setting **Hotlink Protection is intentionally OFF** for `sikelianos.com`. It was blocking any cross-origin `Referer` request to image assets with a 403, which broke `og:image`/`twitter:image` fetches from OpenGraph scanners and some link-preview tools. Don't re-enable it.

## Site Structure

- Pages live in `content/` as `index.md` / `index.html` (plus per-page assets like images and JS).
- Some project pages include photo galleries backed by `content/<page>/photos.json` with image files stored in `content/<page>/photos/`.
- Page rendering is handled by an Express dev server (`server.js`) using middleware in `middleware/` and page model/rendering in `lib/`.
- JSON-backed collections live in `data/` (currently `data/posts.json`, `data/talks.json`, `data/redirects.json`, `data/slop.json`).
- `data/redirects.json` maps old paths to new ones (e.g. `/resume` -> `/cv`). It's applied in dev via `middleware/redirects.js` (first in the chain in `middleware/index.js`) and in production via `src/worker.js` (checked before the assets fetch, since `dist/` is static and only contains scraped pages).
- Client-side scripts live in `scripts/` (served statically in dev and included in the scraped build).

## Build + Deploy

- Dev server: `npm run dev` (nodemon + express)
- Build output: `dist/`
- Build process: `npm run build` -> `script/build` -> `node script/scrape.js` (runs the dev server and uses `website-scraper` to materialize the site into `dist/`).
- Tests: `npm test` -> `script/test` (build + `node script/test-build.js`); respects `SITE_URL` for canonical URL checks.
- Cloudflare config: `wrangler.jsonc` (serves `dist/` via the `assets` binding; `run_worker_first: true`, `html_handling: none`).
- Deployment happens via GitHub Actions: `.github/workflows/deploy.yml` (runs `npm ci`, `npm run build`, then `wrangler deploy`, then a small smoke test).
- Prefer repo scripts under `script/`/`scripts/` over ad-hoc commands.

## Slop indicators

Every scanned page discloses how much of its prose was written by AI.

- Source of truth is [zeke/slop-detector](https://github.com/zeke/slop-detector), which scans the live site with Pangram and commits per-page results.
- `script/sync-slop` fetches its `results/latest.json` into `data/slop.json`. `.github/workflows/sync-slop.yml` runs it daily and commits changes, which triggers a deploy.
- `lib/slop.js` shapes that file for templates: a sorted `pages` list and a `byPath` lookup, with percentages and emoji precomputed. A page counts as AI-written at 5% or more combined AI + AI-assisted, since Pangram attributes a percent or two of some human posts to AI.
- `layout.html` renders the indicator above the prose for AI pages and below it for human pages. Pages missing from `data/slop.json` get nothing.
- The `/slop-detection` table is generated from the same data.
- Anything rendered from slop data must carry `class="slop-indicator"` or `data-slop-ignore`, so slop-detector strips it before hashing a page's prose. Without that, results would change a page's text and trigger a paid rescan on every run.

## Styling

Plain CSS, no build step. Edit files directly under `styles/`.

- Entry point: `styles/index.css`, which uses native `@import` to pull in `variables.css`, `theme.css`, `util.css`, `base.css`, `styles/components/*.css`, `styles/third-party/tipsy.css`, and `print.css`.
- Design tokens live in `styles/variables.css` (sizes, fonts) and `styles/theme.css` (light/dark colors) as CSS custom properties (`--color-*`, `--card-width`, etc). Prefer adding new tokens there over hardcoding values.
- CSS custom properties don't work inside `@media` conditions, so breakpoint values (`480px`, `1080px`, `720px`, `360px`) are hardcoded at each `@media` usage site. See the comment at the top of `variables.css` for what they correspond to, and keep them in sync if the underlying tokens change.
- No `@extend`-equivalent exists in plain CSS. Where a rule used to extend a shared utility class (`.text-column`, `.main-column`, `.float-left`, etc, still defined in `util.css` for standalone use), its declarations are duplicated inline at the call site with a comment noting which utility it mirrors.
- In dev, `middleware/static.js` serves `styles/` as-is via `express.static`; the browser resolves the `@import` chain itself. In production, `website-scraper` follows and downloads every `@import`ed file during `npm run build`, so no bundling step is needed.

## Thumbnails

Every content page should have a `thumbnail.jpg` or `thumbnail.png` in its directory. Thumbnails are used for the homepage gallery, and as the fallback OpenGraph/Twitter image when no `opengraph.{jpg,png}` exists.

- Aspect ratio: 4:3
- Preferred size: 1200x900 (minimum for social/chat link previews — Google Chat, Slack, etc. ignore images below ~800px wide)
- Use ImageMagick to resize/crop: `magick input.jpg -resize 1200x900^ -gravity center -extent 1200x900 thumbnail.jpg`

## OpenGraph images

A page may also have an `opengraph.jpg` or `opengraph.png` in its directory. When present, it is used for `og:image` and `twitter:image` instead of the thumbnail. Use this when the 4:3 thumbnail crops badly at the 1.91:1 social aspect.

- Aspect ratio: 1.91:1 (matches Facebook/LinkedIn/X large card previews)
- Preferred size: 1200x630
- Use ImageMagick to resize/crop: `magick input.jpg -resize 1200x630^ -gravity center -extent 1200x630 opengraph.jpg`
- `script/build` copies `opengraph.{jpg,png}` files into `dist/` after scraping, since the scraper does not follow `og:image` URLs.

## Large Assets (R2)

Files too large for git (videos, large images, etc.) are hosted on a public R2 bucket with a custom domain.

- Bucket: `zeke-assets`
- Public URL: https://assets.zeke.sikelianos.com
- Upload script: `script/upload-asset <local-file> <destination-path>`
- Example: `script/upload-asset ~/Desktop/video.mp4 my-page/video.mp4`
- Convention: R2 paths mirror the content directory structure (`<page-slug>/<filename>`)
- Reference the public URL directly in markdown `<video>` or `<img>` tags

## Maintenance Rule

Always update `AGENTS.md` when important structure, build, or deployment details change.
