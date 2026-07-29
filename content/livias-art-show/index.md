<!--
title: Livia's Art Show
description: Building custom software to catalog and sell hundreds of artworks at a one-time show.
publish_date: 2026-07-28
kind: project
-->

<figure>
  <a href="https://liviazirkel.gallery/">
    <img src="/livias-art-show/livia.jpg" alt="Livia Zirkel talking about art">
  </a>
  <figcaption>Livia Zirkel, talking about art :)</figcaption>
</figure>

My aunt Livia is one of the coolest and most creative people I know. Okay, she's not technically my aunt, but she truly is a multi-talented artist, having worked in a wide variety of media over the years. She paints, she draws, she collages, but most importantly she brings people together to create art. She runs no fewer than three distinct art collectives in Santa Barbara, meeting every week with groups of friends to make art together. It seems like she pretty much knows everyone on the local art scene, having lived in Santa Barbara for over five decades.

Last week, Livia hosted [her first show](https://liviazirkel.gallery/) since 1986, at the [Community Arts Workshop](https://www.sbcaw.org/) in Santa Barbara. She had over 650 artworks on display, and I helped her photograph, label, title, and price every single piece.

Using powerful AI tools and [Cloudflare's Developer platform](https://www.cloudflare.com/products/), I was able to build and deploy a complete custom point-of-sale system, just for this one show, in a matter of days. Livia sold over half of her pieces in the course of a weekend, and the whole system ran without a hitch. This is a post to document how I built it, and the tools I used to do it.

<figure>
  <a href="https://liviazirkel.gallery">
    <img src="/livias-art-show/matilija-poppy.jpg" alt="Matilija poppy painting by Livia Zirkel">
  </a>
  <figcaption>Matilija poppy painting by Livia Zirkel</figcaption>
</figure>

## How I built it

This project was spontaneous! I didn't sit down and design a schema or sketch a wireframe before writing anything. I just opened a terminal, started [chatting with Pi](https://pi-school.ziki.boo), and described the problem in front of me: my aunt has hundreds of pieces of art, no way to track them, and a show in a few days. From there it was a conversation, not a plan. I'd describe what I needed in plain English, the agent would go read the existing code, ask clarifying questions when something was ambiguous, and then write and test the change itself, right down to [opening a browser and clicking around](https://github.com/zeke/faster-chrome-devtools-skill) to make sure it worked.

Most sessions started with something small and real, not hypothetical. "The list of pieces is getting long, let's add a filter." "I need to mark five pieces sold to one buyer at once." "This photo is crooked, can we straighten it without leaving the browser." Because Livia and I were actually using the tool to catalog real artwork while I was building it, every feature request came from something that had just gotten annoying in practice, not from imagining what a point-of-sale system "should" have. That's the biggest difference between this and how I used to build software: I wasn't writing code, I was narrating a problem and reviewing the solution.

The design followed the same instinct. The public site is a plain, whitespace-heavy grid of art, because a room full of paintings doesn't need a UI framework competing for attention. The admin side went the opposite direction: dense, mobile-first, built for someone standing at a folding table with a phone in one hand and a buyer in the other, checking pieces out as fast as possible. A lot of that shape emerged live, mid-conversation, after actually trying to use the thing during a real sale.

Giving an AI agent this much rope means it will occasionally take a wrong turn, and mine did: at one point I asked it to help clean up some sold pieces, and a few days of transaction history briefly vanished before I recovered it from an uncommitted branch. The lesson wasn't "don't trust the agent," it was the same lesson every developer has learned since git existed: commit early, commit often, and don't deploy from a dirty working tree. I wrote that rule down for the agent too, in a project file it reads at the start of every session, so it wouldn't happen again. The lesson there for me was: **Don't try to do too many things at once on the same project**, even if you think they're distinct enough tasks to not intersect. 

<figure>
  <a href="https://liviazirkel.gallery/">
    <img src="/livias-art-show/radishes.jpg" alt="Radishes painting by Livia Zirkel">
  </a>
  <figcaption>Radishes</figcaption>
</figure>

## The tools

Here's a breakdown of the tools I used to build the whole thing, and why I chose them.

### 1. [Pi](https://pi-school.ziki.boo)

Pi is the coding agent harness that gives you a chat interface to an AI model. It's the thing that actually reads your files, runs commands in a terminal, edits code, and talks back to you in plain English. I used it entirely from the command line, in short back-and-forth sessions, usually right inside the gallery, responding to situations as they came up.

### 2. [Claude Sonnet 5](https://www.anthropic.com/claude)

[Claude Sonnet 5](https://www.anthropic.com/claude/sonnet) is the language model doing the actual thinking inside Pi. There are more capable frontier models out there right now, but Sonnet is a good balance of price and performance: it's a fraction of the cost of [Claude Opus](https://www.anthropic.com/claude/opus) or [GPT 5.6](https://openai.com/index/gpt-5-6/), and for this kind of project it was more than good enough. I could have gone even cheaper with an open-weights model like [GLM](https://z.ai/) or [Kimi](https://www.moonshot.ai/), but in my experience those models still aren't reliable enough... they tend to get too many things wrong, and the token cost savings aren't worth the lost time and frustration.

### 3. [Cloudflare Workers](https://developers.cloudflare.com/workers/)

Cloudflare Workers is the compute platform the whole site runs on. It's Cloudflare's take on "serverless": instead of renting a server that sits there idling most of the day, you write a function that only runs when a request comes in, and it runs on infrastructure Cloudflare already has spun up in hundreds of cities. There's no container to boot and no OS to warm up, since Workers run in lightweight [V8](https://v8.dev/) isolates rather than virtual machines, so a request can start executing code in a fraction of a millisecond. You're billed for the CPU time you actually use, not for the hours a server sat around waiting for traffic. For a project like this, where usage was near zero most of the year and then spiked hard for one week, that model fits perfectly.

### 4. [Hono](https://hono.dev/)

[Hono](https://hono.dev/) is the web framework inside the Worker: small, fast, and it does server-rendered [JSX](https://react.dev/learn/writing-markup-with-jsx), which meant no client-side framework, no build step for the UI, and no React hydration issues to debug. Hono is created and maintained by [Yusuke Wada](https://github.com/yusukebe), who works at Cloudflare, which probably explains why Workers and Hono fit together so well.

### 5. [D1](https://developers.cloudflare.com/d1/)

D1 is Cloudflare's serverless SQL database, and it holds the metadata: every piece of art's title, price, and sale status, references to its photos, and every transaction. The photos themselves don't live here, just pointers to where they're actually stored (see R2, below). Under the hood D1 is just [SQLite](https://sqlite.org/), which happens to be one of the most widely used and well-documented pieces of software in existence, and because a language model has seen an enormous amount of SQLite in its training data, I could describe the data model and the operations I wanted in plain English, and the agent could translate that into correct schema changes and queries without me having to spell out the specific SQL myself.

### 6. [R2](https://developers.cloudflare.com/r2/)

R2 is Cloudflare's object storage, and it's where every actual photo file lives, full-size and thumbnail, with D1 just holding the references to them. It's the same idea as [Amazon S3](https://aws.amazon.com/s3/), and it's even compatible with the S3 API, but without S3's notorious egress fees for pulling data back out.

### 7. [GitHub Actions](https://github.com/features/actions)

[GitHub Actions](https://github.com/features/actions) is GitHub's built-in automation system: you describe a workflow in a [YAML](https://yaml.org/) file, and GitHub runs it for you whenever something happens in the repo, like a push or a [pull request](https://docs.github.com/en/pull-requests). Every change to the codebase went through a pull request, and Actions ran a check on it before I'd ever consider merging.

The more useful piece was a [skill I wrote](https://github.com/zeke/preview-deployments-skill) that has an agent set up a preview deployment workflow: every pull request automatically got its own short-lived Worker and its own cloned copy of the database, deployed and torn down by Actions. That meant I could try out a change on a real, live, disposable copy of the site, on my phone, standing in the gallery, before it ever touched production.

### 8. [GitHub CLI](https://cli.github.com/)

[`gh`](https://cli.github.com/) is GitHub's official command-line tool, and it let the agent operate on GitHub directly from the terminal: opening pull requests, checking whether [CI](https://docs.github.com/en/actions/concepts/overview/continuous-integration) passed, merging once I gave the go-ahead. It meant the whole loop of "make a change, open a PR, review it, ship it" could happen without either of us touching the GitHub website.

### 9. [Remote-controlled browsers](https://github.com/zeke/faster-chrome-devtools-skill)

[faster-chrome-devtools-skill](https://github.com/zeke/faster-chrome-devtools-skill) is a skill I wrote that lets an agent drive my actual, already-logged-in Chrome browser over the [DevTools protocol](https://developer.chrome.com/docs/devtools/). This was huge for testing admin-facing changes: the agent could open the real admin tool, log in, click through a mock sale, check that a transaction landed correctly in the database, and take a screenshot to confirm the UI looked right, all without me lifting a finger.

<figure>
  <a href="https://liviazirkel.gallery/">
    <img src="/livias-art-show/two-ladies-fruit.jpg" alt="Two ladies, fruit painting by Livia Zirkel">
  </a>
  <figcaption>two ladies, fruit</figcaption>
</figure>

## Worth it!

This was such a fun project for me to work on. I got to build something completely custom for one specific event that will only ever happen once, and not worry about whether it would generalize, scale, or ever be used again. We built it live, during the show itself, and we got to focus on making the event a success.

So much software development is done in a vacuum, with no real users, and no real reason to exist, other than to satisfy the creative whims of a single developer. There's nothing wrong with that, but it's more fulfilling to create software that solves real problems for real people.

Check out Livia's website at [liviazirkel.gallery](https://liviazirkel.gallery/) to see her work, and if you're in Santa Barbara, check out the Community Arts Workshop to see the gallery space where she hosted her show.

<figure>
  <a href="https://liviazirkel.gallery/">
    <img src="/livias-art-show/two-doggies.jpg" alt="Two doggies painting by Livia Zirkel">
  </a>
  <figcaption>Two doggies</figcaption>
</figure>