# Research notes: the yogo-api development arc

Raw material collected from the git/PR/issue history of `zeke/yogo-api`, plus live
production D1 queries, for writing the adaptive-software narrative. This is
reference material, not the essay itself.

Source repo: https://github.com/zeke/yogo-api

---

## The origin (2026-05-29)

`human-plan.md`, the very first commit, is Zeke's actual product brief, in his
own words:

> "Let's build yogo, an HTTP API that collects and serves data about yoga
> studios... Use test-driven development, working in small increments and
> testing each component as you go."

TDD and incrementalism were a **day-one instruction**, not something
discovered later. Other guardrails baked in from commit #1:

- "Favor using CLIs and APIs to do stuff whenever possible, rather than manual
  setup and click-ops."
- "Use GitHub Actions workflows for linting, tests, and to deploy every merged
  PR to main."
- "Create an AGENTS.md file... make it keep itself up to date as the
  implementation evolves."

`agent-plan.md` (same commit) expands this into the concrete MVP: Cloudflare
Workers + Hono + D1, Google Places for studio discovery, `studios` table only
at first, classes/teachers/schedules explicitly deferred.

---

## Phase 1 — Concrete foundations (PR #2, #6, #10 — May 29–30)

- **PR #2** (`feat: add classes ingestion api`, issue #1): the Classes model.
  Idempotency was designed up front — dedupe keys, studio-local offset
  timestamp + normalized UTC timestamp + IANA timezone, stored as three
  separate fields. This exact design decision comes back to bite later
  (issue #52 → PR #54).
- **PR #6** (`feat: add PR preview deployments`): the safety net, stood up
  early, *before* any risky agentic work began. Each PR gets its own Worker, a
  D1 database copied from production, and its own Queue; GitHub Deployment
  statuses drive PR UI and teardown on close/merge.
- **PR #10** (`fix(preview): fix migrations target, stale-run guard...`): a
  real near-disaster caught before it mattered. `wrangler d1 migrations apply`
  was being called with the Worker's binding name (`"DB"`) instead of the
  actual preview database name — meaning **every migration added after the
  last production export would silently never apply to preview databases**.
  Fixed one PR before the harvest schema migrations started flowing (#12).
  This is the "preview mirrors production, and we verified that claim" beat.

---

## Phase 2 — Framing the hard problem (issue #3, 2026-05-30)

Issue #3 is the mission statement for the whole harvesting subsystem. Quotable
lines:

> "The point of this app is schedule data. We want anyone to be able to open a
> website or app and see upcoming yoga classes in their area, across all
> studios, regardless of how those studios publicize or manage their
> schedules."

> "LLM-powered agentic browser sessions: harvesting should be driven by an
> agentic loop that can use tools to navigate, inspect, extract, summarize,
> and retry during Cloudflare Browser Run sessions."

> "Cost bounding is a goal over time, not for the initial implementation.
> Early harvest runs may use ample tool calls and time to figure out what
> works. Tighten budgets once we have signal from real runs."

That last line is the thesis, stated before a single line of harvest code
existed.

---

## Phase 3 — Trying harness options, letting agents roam (issues #4, #5, #18; PRs #8, #14-17, #20-21)

- **Issue #4**: spike Flue (a workflow framework) as the agent harness,
  explicitly scoped as *"a contained spike... should not own durable product
  state until proven."*
- **Issue #5** (2026-05-31, early!): already proposes recipe-distillation
  almost exactly as it eventually shipped — explore → distill → validate →
  code → repair modes, a `harvest_procedures` table, a restricted tool API for
  generated code. **This issue was closed/deferred** — they didn't yet have
  real evidence of what "successful" looked like, so they chose not to build
  the sophisticated version yet. Disciplined deferral, not a missed idea.
- **PR #8** (`feat: add on-demand Think harvests`): a Think-based agent,
  built, then abandoned as a draft. Never merged.
- **Issue #18** (research spike, no production code riding on it): point a
  Browser Run/CDP session at 6 real Berkeley studios (Adeline Yoga, Arise
  Yoga, Ashtanga Yoga Berkeley, Banana Yoga, BODYROK Berkeley, Ananda Yoga &
  Meditation Center) purely to learn platform patterns before writing
  production code. Explicit non-goals: *"Do not build a full production
  harvester in this research issue... Do not write brittle one-off scrapers
  for individual studios unless they reveal a reusable pattern."*
- **PR #14–16**: Flue scaffold wired into the deploy path.
- **PR #17** (`feat: run harvests with browser agent`, informed by #18):
  pivots away from Flue to Cloudflare Agents' Browser Run + CDP Code Mode.
- **PR #21** (`chore: remove obsolete Flue harvest scaffold`): rips the whole
  framework back out. A framework adopted and discarded within about a month,
  in public commits.
- **PR #20** (`feat: learn harvest profiles`): first-generation memory —
  persist discovered schedule URL / platform / notes so the *next* agent run
  skips rediscovery. Still LLM-driven every time, but cheaper. Direct seed of
  the later recipe idea.

Messy, undocumented trial-and-error visible directly in commit history the
same week (not PRs — raw same-day fixup commits fighting infrastructure, not
intelligence):

```
fix: use Kimi Workers AI model for harvest workflow
fix: avoid skill activation in harvest smoke workflow
fix: try AI Gateway OpenAI model for harvest smoke
fix: route harvest model through yogo AI Gateway
fix: bound harvest workflow and use Sonnet via AI binding
fix: use supported AI binding gateway options
fix: try GPT-5.5 through harvest gateway
```

---

## Phase 4 — Observability before optimization (issue #25/#26 → PR #36)

**PR #36** (`feat: store harvest agent event history`) adds a full per-run
event trail — `agent_started`, `step_finished`, `tool_call`, `tool_result`,
`agent_finished`, `agent_failed` — recursively sanitized/truncated so binary
blobs (screenshots, base64) don't blow up storage, but every tool call and
response is otherwise captured. Explicit purpose: *"so failed or unexpected
harvests can be audited after the fact."*

This is the instrument that later analysis (issue #39) and the case studies
below are built on top of.

---

## Phase 5 — Systematic model comparison (PRs #37–38, 2026-07-08)

- **PR #37** (`Support alternate harvest models and fix gpt-5.5 cost
  estimate`): sourced, cited pricing table for 5 models — `openai/gpt-5.5`,
  `anthropic/claude-sonnet-5`, `anthropic/claude-haiku-4-5`,
  `@cf/zai-org/glm-5.2`, `@cf/moonshotai/kimi-k2.7-code`. Found their own
  existing GPT-5.5 cost estimate was **wrong by ~3.5x** (a guess, not sourced).
  Added a `model` request param so real side-by-sides could be run on preview.
- **PR #38** (`Enable Anthropic prompt caching, add step-budget nudges, fix
  cost gap`): found Claude Sonnet 5 and Claude Haiku 4.5 both burned real
  tokens without ever calling `save_harvest_result` — they fetched real data,
  then kept re-fetching/reshaping it instead of finishing, until they hit the
  20-step cap. Also found prompt caching was silently not happening at all
  (Anthropic requires an explicit `cacheControl` marker per message/tool part,
  unlike OpenAI's automatic caching). Fixed via caching + a step-budget nudge
  in the final 5 steps + forcing `toolChoice: save_harvest_result` on the very
  last step so a run that already has good data can never again fail purely
  by running out of turns.

This is the "frontier models are expensive, and you have to fight them to
finish the job" phase, backed by real traces, not vibes.

---

## Phase 6 — The pivot to deterministic recipes (issue #39, 2026-07-08)

The turning point, in the team's own retrospective words:

> "Real preview testing (PRs #37, #38) shows every successful harvest so
> far... resolves to the same shape: the model spends 12+ steps and ~$0.50
> rediscovering that the studio's schedule widget is backed by a plain,
> public, unauthenticated JSON API... Today we pay full agentic-browsing
> price on every single recurring harvest for a studio whose schedule
> mechanics don't change day to day."

> "This directly builds on #5... which sketched this architecture in detail
> but was closed before the simpler LLM-every-time approach shipped instead.
> Re-opening the idea now that we have real evidence of what a 'successful
> harvest' actually looks like in practice."

Explicit phasing decision: Phase 1 is declarative HTTP recipes (data, not
code) — a JSON template with a URL, a dot-path into the response, and a field
map. Phase 2 (full generated TypeScript procedures via Dynamic
Workers/Code Mode, from issue #5's original sketch) is deliberately deferred
until they know how much of the studio population Phase 1 alone covers.

---

## Phase 7 — Building the recipe system (PRs #40–51, all 2026-07-08, one dense day)

- **PR #40** (`Add Phase 1 harvest recipes`): the `http_json` recipe kind.
  Recipes are **platform-level templates**, not per-studio blobs — a real
  failure in #39's sample cost $1.37 rediscovering Momence from scratch on a
  studio when a working Momence recipe already existed for a *different*
  studio; platform-level sharing fixes this by construction. A zero-result
  replay is never auto-trusted on its first occurrence (ambiguous: "studio
  legitimately has no classes" vs "recipe silently broke"), so it always
  falls back to the agent once to confirm. In the process of building this,
  found and fixed a real D1 bug (`LIKE or GLOB pattern too complex`) that was
  silently zeroing out entire harvests for any class with no `externalId`.
- **PR #41/#42**: audited production data and found "Mindbody" spelled 7
  different ways across 8 studios, and one studio genuinely running
  Wix + Punchpass + Momence + Wix Bookings simultaneously. Built a normalizer
  validated against **27 real production strings**, not invented test cases.
- **PR #43** (`html_widget` recipe, Mindbody Healcode): also **explicitly
  rejected** automating "Schedules V2" widgets — used a real CDP browser
  session with monkey-patched `fetch`/`XMLHttpRequest` to confirm the data
  loads via an opaque Next.js Server Action tied to Mindbody's current
  frontend build, with no stable public interface. Deliberately left on the
  full LLM+browser path because no recipe could replay it reliably. A case of
  *not* forcing a deterministic recipe where the underlying interface wasn't
  stable enough to trust.
- **PR #44/#47** (`static_page` recipe kind): required genuinely new
  date-projection code, because static pages describe a **recurring weekly
  schedule** ("Monday 7:30–10am"), not literal per-instance timestamps like
  the other two recipe kinds. PR #47 explicitly tested and **disproved**
  generalization — checked whether static-page candidate studios share a
  WordPress theme; they don't, so this recipe kind has to be hand-authored per
  site and never scales the way the platform-level recipes do. Real bugs
  caught via real fixtures: Healcode's double-HTML-entity-encoding quirk (PR
  #43), an en dash vs. ASCII hyphen in real scraped time-range text silently
  producing a *wrong* parse instead of a caught error (PR #47). Every fixture
  in these PRs is stated explicitly to be real captured HTML, not invented.
- **PR #46**: a recipe replay was silently overwriting a studio's good
  human-readable platform description with an internal recipe-id label —
  caught live in production, fixed, single affected row hand-corrected.
- **PR #50/#51**: Mariana Tek and CorePower Yoga `http_json` recipes added.

Test count through this arc, cited in nearly every PR's "Validation" section:
**47 → 59 → 80 → 89 → 117 → 153 → 159 → 179 → 185 → 187 → 191 → 199 → 207**
(current). Continuous TDD discipline, quantified, one PR at a time.

---

## Phase 8 — Production hardens under real concurrent load (PRs #45/#48/#49)

- **Issue #45 → PR #48**: discovered that a queue message handler that
  *hangs* (never resolves or rejects) is indistinguishable from a fast-failing
  one from the outside, and blocks an entire batch. Fixed with per-message-type
  timeouts (5 min for harvest, 60s for studio-seed), with an explicitly
  documented, accepted limitation: `Promise.race` can't actually cancel the
  underlying hung operation, only stop waiting for it.
- **PR #49**: found via real `harvest_run_events` SQL
  (`GROUP BY harvest_run_id HAVING COUNT(*) > 1`) that Cloudflare Queues'
  at-least-once redelivery guarantee was causing the *same* harvest to run
  2–3 times concurrently on a slow (1–4 minute) handler, each one
  non-deterministically overwriting the last and burning a full LLM+browser
  run's cost for nothing. Fixed with `max_batch_size: 1` for the harvest
  queue plus an idempotency check that skips reprocessing an already-completed
  run. **The case study below is a live capture of this exact bug**, from a
  run that started 10 minutes before this PR merged.

---

## Phase 9 — API/product maturity in parallel (PRs #28–34, #53–54)

Dedupe hardening against mutable harvest fields (#28), upcoming-only
filtering (#29), bbox/radius geo search on studios and classes (#31/#32),
`include=studio` sideloading + batch studio lookup (#33), custom domain
`api.nearby.yoga` (#34), shared-secret auth on mutating endpoints (#53), and a
real production data-integrity bug (issue #52 → PR #54): `GET /classes`
returned `startTime` in inconsistent formats, some missing a timezone offset
entirely, because the harvest pipeline upserted classes in-process without
going through the same validation `POST /classes` used. Fixed by always
*deriving* the studio-local string from the already-reliable UTC value +
timezone, one change point covering every ingestion path. Backfilled
**3,183 of 4,293** production rows, verified via a zero-diff re-export
afterward.

---

## Where it stands today — live numbers (pulled 2026-07-10)

```
$ node .agents/skills/harvest-stats/scripts/report.mjs

Studios: 379 total, 319 never harvested at all
Recipe coverage: 17 / 379 studios (4.5%) served by a recipe

Harvest run costs (last 7 days):
  agent    runs=30   total_cost=$15.70     classes=421    cost/class=$0.04
  recipe   runs=18   total_cost=$0.000388  classes=2959   cost/class=$0.000000

Most expensive agent runs (last 7 days):
  $1.95   11 classes   Hot Spot Yoga Oakland
  $1.37    0 classes   Athletic Playground
  $1.08    0 classes   RIDE Oakland
  $1.00   25 classes   Yoga Kula
```

$0.04/class on the agent path vs. effectively $0.00/class on the recipe path
is the headline cost-collapse number. 95.5% of studios still uncovered by a
recipe is the honest "this is an ongoing arc, not a solved story" ending —
and **issue #55** (open, unimplemented as of this writing) is literally about
scheduling routine re-harvests without accidentally re-incurring full agent
costs. That's the next chapter.

---

## Case study 1: Adeline Yoga — the same studio, before and after recipes existed

Three real `harvest_runs` rows, same studio, queried directly from production D1:

| Date | Mode | Duration | Classes found | What happened |
|---|---|---|---|---|
| 2026-07-02 | agent (discovery) | ~3 min | 20 | Full CDP exploration. Found `<script host_id="19812">` embedded in the page, had to override the browser's timezone via CDP `Emulation.setTimezoneOverride` to get Momence's widget to render in Pacific time, discovered the real `readonly-api.momence.com` endpoints by watching network traffic. |
| 2026-07-07 | agent (re-discovery) | ~2 min | 20 | **Rediscovered the exact same thing from scratch.** Same host_id, same endpoints, same timezone dance, five days later. Nothing from the first run carried over. |
| 2026-07-08 | `recipe:momence` replay | 47 sec | **184** | "Replayed cached 'momence' recipe (no LLM or browser session used); 3 page(s) fetched." |

The middle row is the smoking gun behind issue #39's whole argument: the same
discovery, paid for twice, because nothing before the recipe system persisted
anything *reusable* across studios on the same platform. The recipe replay
afterward found *more* classes (184 vs. 20) than either agent run, because
it isn't bounded by an agent's habit of stopping after the first page.

---

## Case study 2: a live production bug, captured by the observability system itself

Pulled the actual `harvest_run_events` trail for a real run —
**CorePower Yoga – Emeryville**, `harvest_e8c246d0-4649-4b9a-8960-e0825289b3ea`,
created `2026-07-08T21:56:42Z`. This is a live, captured instance of the exact
duplicate-processing bug that **PR #49 fixed ten minutes later**
(merged `2026-07-08T22:06:59Z`).

The event trail interleaves **three separate `agent_started` events** for the
same `harvest_run_id`, with overlapping/resetting step-sequence numbers —
three concurrent agent invocations racing on one Cloudflare Queues message
(the at-least-once redelivery bug):

- **Invocation A**: every browser tool (`browser_markdown`, `browser_content`,
  `browser_links`, `browser_extract`) returned HTTP 422 timeouts against
  `corepoweryoga.com`. Tried raw CDP `Target.createTarget` for finer control,
  got a hard `410 Gone`. Sanity-checked its own tooling against
  `https://example.com` (worked fine), confirming the failure was specific to
  the target site. Gave up, called `save_harvest_result` with zero classes
  and a wrong theory ("likely heavy client-side JS, bot detection, or slow
  server response").
- **Invocation B** (the one whose result stuck): fought through the slow
  Next.js page with raw CDP `Page.navigate` + `Runtime.evaluate`, found
  `__NEXT_DATA__.studioDetails[0].closed = true` embedded in the page plus a
  visible banner ("Thank you for being a part of our community... we hope to
  see you at our Berkeley West studio, or live"), and correctly concluded the
  studio has no classes because **it has permanently closed** — not a
  scraping failure at all. Left a genuinely useful note for future runs: just
  re-check the `closed` flag before doing any deep exploration.
- A third invocation also started and ran to completion.

Also visible in the raw tool-call payloads: actual Code Mode introspection
calls mid-run — `codemode.search("navigate page and get html cdp")` and
`codemode.describe("cdp.attachToTarget")` — the agent discovering its own
available tools at runtime.

Total cost for the triple-run: **$0.276** (161,990 input / 4,617 output
tokens, 272 seconds of Browser Run time) for a correct answer of "zero
classes, studio is closed" that one clean run should have produced for a
fraction of that. Concrete illustration of why the expensive path needs
guardrails the cheap path never needed.

---

## Case study 3: a clean, well-behaved reuse (Funky Door Yoga, Mindbody Healcode)

For contrast — a $0.25, 31-class agent run (`harvest_bddd2b5d`) that opens with:

> "Reused the known strategy exactly and it worked without modification."

It reused a remembered DOM path
(`#bw-widget__schedules-205976 .bw-session`) from a prior run instead of
rediscovering it from scratch, read visible "PDT" text labels to confirm
timezone, preserved real substitute-teacher text verbatim, and flagged one
legitimately-null `room` field with an explicit confidence note rather than
guessing. This is the pre-recipe "learning loop" (PR #20) working exactly as
designed — one tier better than blind rediscovery, but still paying for a
full LLM + browser session on every single run.

---

## Timeline reference (PR numbers, for citation)

```
#2   2026-05-29  feat: add classes ingestion api
#6   2026-05-31  feat: add PR preview deployments
#8   2026-06-01  feat: add on-demand Think harvests            (abandoned draft)
#10  2026-06-30  fix(preview): migrations target, stale-run guard...
#14  2026-06-30  feat: add Flue harvest workflow scaffold
#17  2026-06-30  feat: run harvests with browser agent          (Flue -> Browser Run pivot)
#20  2026-07-01  feat: learn harvest profiles
#21  2026-07-01  chore: remove obsolete Flue harvest scaffold
#36  2026-07-07  Store harvest agent event history
#37  2026-07-08  Support alternate harvest models and fix gpt-5.5 cost estimate
#38  2026-07-08  Enable Anthropic prompt caching, add step-budget nudges
#40  2026-07-08  Add Phase 1 harvest recipes (http_json, Momence)
#42  2026-07-08  Normalize studio_harvest_profiles.platform into a known slug set
#43  2026-07-08  Add html_widget recipe kind; reject Schedules V2
#44  2026-07-08  Add static_page recipe kind
#47  2026-07-08  Second static_page recipe; disproves theme-sharing; en-dash bug
#48  2026-07-08  Guard processQueueBatch against a hanging handler
#49  2026-07-08  Fix duplicate harvest processing from Queues redelivery
#53  2026-07-09  Require shared-secret auth on mutating endpoints
#54  2026-07-09  Normalize class startTime/endTime with explicit offset

Issues:
#3   2026-05-30  feat: schedule harvesting from studio websites   (mission statement)
#4   2026-05-30  Explore Flue as a harvest agent harness
#5   2026-05-31  feat: self-healing code-based harvest procedures (closed, too early)
#7   2026-06-01  feat: on-demand schedule harvesting with Think Workspaces
#9   2026-06-30  feat: incremental studio schedule harvesting with Flue
#18  2026-06-30  research: use Browser Run sessions to learn harvesting tactics
#25  2026-07-02  Store harvest agent event history
#39  2026-07-08  Distill successful harvests into replayable recipes  (the pivot)
#55  2026-07-09  set up a smart schedule to re-harvest class data     (open, next)
```
