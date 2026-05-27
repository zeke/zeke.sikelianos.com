<!--
title: Browsers in the Cloud
description: Let your AI agents drive real web browsers locally and in the cloud.
publish_date: 2026-05-27
kind: project
-->

I recently wrote about [how to drive your local Chrome browser with an AI agent](/driving-chrome-with-an-agent). In this post, I want to show you how to do the same thing with browsers running in the cloud, using Cloudflare's [Browser Run](https://developers.cloudflare.com/browser-run/) service.

<p style="margin-bottom: 0.25rem; opacity: 0.75; font-size: 0.9rem">Copy this and paste it into your agent:</p>

```plaintext
Set up local and cloud Chrome DevTools MCP for me:

https://zeke.sikelianos.com/browsers-in-the-cloud
```

To make this setup useful, you need four things:

1. A local Chrome MCP server, for driving the Chrome browser on your machine.
2. A cloud Chrome MCP server, for disposable browser sessions running on Cloudflare.
3. A browser-driving skill, so your agent uses these tools safely and efficiently.
4. Global agent instructions, so your agent knows when to use local browsers, cloud browsers, APIs, and CLIs.

## 1. Local Chrome MCP

The local MCP server lets your agent drive the real Chrome browser on your machine, including any tabs you already have open and any sites you're already logged into. This is the same setup from [Driving Chrome with an Agent](/driving-chrome-with-an-agent). If you haven't done that walkthrough yet, the short version is:

1. In Chrome, navigate to `chrome://inspect/#remote-debugging` and turn on remote debugging. This lets an MCP server attach to your running Chrome instance over the Chrome DevTools Protocol, the same protocol DevTools itself uses. Chrome still prompts you to allow each connection, and displays a "Chrome is being controlled" banner the whole time the agent is attached. This option became generally available in Chrome 144, which shipped to the stable channel in January 2026.
2. Add the `chrome-devtools-local-browser` MCP server to your agent config (see below).

## 2. Cloud Chrome MCP

The cloud MCP server gives your agent a clean, disposable browser session running on [Browser Run](https://developers.cloudflare.com/browser-run/). It's the same `chrome-devtools-mcp` package, but pointed at a remote WebSocket endpoint instead of your local Chrome.

This is useful when:

- The agent should not touch your real, logged-in sessions.
- You want a reproducible browser environment.
- You want the agent to keep working when your laptop is closed.
- You're running an agent in CI or on a server that doesn't have Chrome at all.

You'll need two environment variables: your Cloudflare account ID and an API token with `Browser Rendering - Edit` permission.

The easiest way to grab your account ID is with [Wrangler](https://developers.cloudflare.com/workers/wrangler/), Cloudflare's CLI:

```sh
npx wrangler whoami
```

That prints your account ID along with any other accounts you belong to. For the API token, the dashboard is currently the fastest path. Open the [API tokens page](https://dash.cloudflare.com/profile/api-tokens), create a custom token with `Browser Rendering - Edit` permission, and copy the value.

I keep both values in my shell rc file (e.g. `~/.zshrc`):

```sh
export CLOUDFLARE_ACCOUNT_ID=your-account-id
export CLOUDFLARE_API_TOKEN=your-api-token
```

That way every agent session you start picks them up automatically.

Then add both MCP servers to your agent config. For OpenCode, edit `~/.config/opencode/opencode.json`:

```json
{
  "mcp": {
    "chrome-devtools-local-browser": {
      "type": "local",
      "command": [
        "npx",
        "chrome-devtools-mcp@1.1.1",
        "--autoConnect"
      ]
    },
    "chrome-devtools-remote-cloudflare-browser": {
      "type": "local",
      "command": [
        "npx",
        "chrome-devtools-mcp@1.1.1",
        "--wsEndpoint=wss://api.cloudflare.com/client/v4/accounts/{env:CLOUDFLARE_ACCOUNT_ID}/browser-rendering/devtools/browser?keep_alive=600000",
        "--wsHeaders={\"Authorization\":\"Bearer {env:CLOUDFLARE_API_TOKEN}\"}"
      ],
      "enabled": true
    }
  }
}
```

Notice that both servers pin `chrome-devtools-mcp` to a specific version (`1.1.1`) instead of using `@latest`. That's intentional. Agent configs tend to live for a long time, and `@latest` means every new session can silently execute whatever version npm serves that day. Pinning doesn't eliminate supply-chain risk, but it reduces your exposure to newly compromised package releases. npm supply-chain attacks are a real and recurring thing, and worth avoiding where you can.

## 3. Browser-driving skill

The MCP servers give your agents browser tools, but they don't teach them how to use the tools effectively, so they tend to take pretty slow and clumsy paths toward a solution at first. They need guidance. Luckily there's a skill for that:

```sh
npx skills@1.5.7 add zeke/faster-chrome-devtools-skill
```

Source: [github.com/zeke/faster-chrome-devtools-skill](https://github.com/zeke/faster-chrome-devtools-skill)

The skill nudges the agent toward the fast, safe paths:

- Prefer accessibility snapshots over screenshots when possible.
- Keep screenshots bounded so they don't blow up the session.
- Check for an existing tab on the relevant page before opening a new one.
- Handle navigation timeouts carefully.
- Treat the remote Cloudflare browser differently from your real local Chrome.

Without this kind of guidance, agents tend to use browser tools naively: full-page screenshots of huge pages, redundant navigations, churning through tabs. The skill is a small file with big payoff.

## 4. Global agent instructions

Tools and skills aren't enough. You also want a couple of rules in your global `AGENTS.md` or `CLAUDE.md` so the agent knows when these browsers should be used at all.

Add this:

```md
- Never use a Chrome DevTools MCP browser unless explicitly asked to do so. When asked, default to the local browser (`chrome-devtools-local-browser`). Only use the remote Cloudflare browser (`chrome-devtools-remote-cloudflare-browser`) when explicitly named or when no local Chrome is available.
- When using a Chrome DevTools MCP browser, check for an existing tab already on the relevant page before opening a new one. If no such tab exists, open a new tab. Don't navigate away from or overtake unrelated existing tabs.
```

The first rule keeps the agent from grabbing the browser for tasks that should really be done with an API or CLI. The second rule keeps it from hijacking the tab you're actually working in.

## Try it

Once everything is set up, try a few prompts:

> Use the cloud browser to do a check on zeke.sikelianos.com and see how we can improve performance and accessibility

> Open my local Chrome and summarize the page I have in the active tab

> Use the cloud browser to take a screenshot of https://news.ycombinator.com at mobile and desktop sizes

> I'm logged into my bank in Chrome. Use my local browser to categorize the last 30 transactions on this page.

## A word of caution

Browser tools expose page contents, screenshots, forms, console messages, and network data to the agent. The local browser can expose your real logged-in sessions. The cloud browser is cleaner, but still receives whatever URLs and credentials you hand it.

Start in [Plan Mode](https://opencode.ai/docs/modes/) when you're doing something new, and make sure your agent instructions reflect how much autonomy you actually want it to have.
