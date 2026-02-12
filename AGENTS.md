# Development Notes for AI Agents

This repo builds a static personal site from local content and deploys it to Cloudflare.

## URLs + Hosting

- Production: https://zeke.sikelianos.com
- Alternate/staging: https://website.ziki.workers.dev
- Hosted on Cloudflare (Workers + static assets)
- `src/worker.js` adds `X-Robots-Tag: noindex, nofollow` on `*.workers.dev` to avoid indexing the staging host.
- `src/worker.js` also handles pretty URLs (`/cv` -> `/cv/index.html`), adds trailing slashes for navigations, and serves the custom `content/404/` page for HTML 404s.

## Site Structure

- Pages live in `content/` as `index.md` / `index.html` (plus per-page assets like images and JS).
- Some project pages include photo galleries backed by `content/<page>/photos.json` with image files stored in `content/<page>/photos/`.
- Page rendering is handled by an Express dev server (`server.js`) using middleware in `middleware/` and page model/rendering in `lib/`.
- JSON-backed collections live in `data/` (currently `data/posts.json`, `data/talks.json`; `data/redirects.json` exists but is not wired up in app code).
- Client-side scripts live in `scripts/` (served statically in dev and included in the scraped build).

## Build + Deploy

- Dev server: `npm run dev` (nodemon + express)
- Build output: `dist/`
- Build process: `npm run build` -> `script/build` -> `node script/scrape.js` (runs the dev server and uses `website-scraper` to materialize the site into `dist/`).
- Tests: `npm test` -> `script/test` (build + `node script/test-build.js`); respects `SITE_URL` for canonical URL checks.
- Cloudflare config: `wrangler.jsonc` (serves `dist/` via the `assets` binding; `run_worker_first: true`, `html_handling: none`).
- Deployment happens via GitHub Actions: `.github/workflows/deploy.yml` (runs `npm ci`, `npm run build`, then `wrangler deploy`, then a small smoke test).
- Prefer repo scripts under `script/`/`scripts/` over ad-hoc commands.

## Styling

Always edit Stylus source files (`.styl`) instead of generated CSS.

- Edit: `styles/**/*.styl`
- Do not edit: `styles/index.css` (generated; will be overwritten)
- Entry point: `styles/index.styl` (imports base + components)

## Thumbnails

Every content page should have a `thumbnail.jpg` or `thumbnail.png` in its directory. Thumbnails are used for OpenGraph/Twitter meta tags and the homepage gallery.

- Aspect ratio: 4:3
- Preferred size: 640x480 (or 320x240 for older pages)
- Use ImageMagick to resize/crop: `magick input.jpg -resize 640x480^ -gravity center -extent 640x480 thumbnail.jpg`

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
