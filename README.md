[zeke.sikelianos.com](https://zeke.sikelianos.com)

## Deployment

This site builds to static files in `dist/` and deploys to Cloudflare Workers (static assets).

- GitHub Actions deploys on pushes to `main` using `.github/workflows/deploy.yml`.
- Cloudflare config lives in `wrangler.jsonc`.

Required GitHub repo secret:

- `CLOUDFLARE_API_TOKEN`

The staging URL is `https://website.ziki.workers.dev`.


- [x] redirect /talks to /#talks
- [ ] Add these apps as projects:
    - [Scribble Diffusion](https://scribblediffusion.com)
    - [TileMaker](https://tilemaker.app)
    - [Paint by Text](https://paintbytext.chat)
    - [Inpainter](https://inpainter.vercel.app)


- [ ] Fix google images
- [ ] Optimize all the thumbnail.png and thumbnail.jpg images
- [ ] Add Gemini video interpreter: https://x.com/zeke/status/1935092740217520290
