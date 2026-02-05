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

## Maintenance Rule

Always update `AGENTS.md` when important structure, build, or deployment details change.
