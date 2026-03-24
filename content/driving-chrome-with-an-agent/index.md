<!--
title: Driving Chrome with an Agent
description: Your real, logged-in browser can now be natively driven by coding agents like OpenCode.
publish_date: 2026-03-24
kind: project
-->

Chrome just became a lot more useful for automation. As of Chrome 144, your real browser — the one you use every day, with all your tabs open and all your accounts logged in — can be natively driven by coding agents like [OpenCode](https://opencode.ai) or Claude Code. No extensions. No headless browser. No screenshots. No separate logins.

[Addy Osmani put it well](https://x.com/addyosmani/status/2032875051830358197): "Your real, signed-in browser can now be natively accessible to any coding agent. Just one toggle to enable it."

Copy this and paste it into your agent:

```
Set up Chrome DevTools MCP for me:

https://zeke.sikelianos.com/driving-chrome-with-an-agent
```

## How it works

Chrome has long had a remote debugging protocol used by DevTools itself. What's new is that you can now grant an agent access to that protocol with a single permission dialog. When the Chrome DevTools MCP server is configured with `--autoConnect`, it requests a debugging session from your running Chrome instance. Chrome pops up a dialog asking if you want to allow it. You click Allow, and your agent is in.

While a session is active, Chrome shows a "Chrome is being controlled by automated test software" banner so you always know what's happening. The permission prompt appears every time — there's no way to silently hijack your browser.

## Step 1: Enable remote debugging in Chrome

Navigate to <a href="chrome://inspect/#remote-debugging">chrome://inspect/#remote-debugging</a> in Chrome and enable remote debugging. This is a one-time setup — you only need to do it once.

## Step 2: Configure OpenCode

Edit your OpenCode config at `~/.config/opencode/opencode.json` and add the `chrome-devtools` MCP server with the `--autoConnect` flag:

```json
{
  "mcp": {
    "chrome-devtools": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "chrome-devtools-mcp@latest",
        "--autoConnect"
      ]
    }
  }
}
```

If you're using Claude Code instead, the equivalent config in `~/.claude.json` looks like this:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--autoConnect"
      ]
    }
  }
}
```

## Step 3: Ask your agent to do something

Open OpenCode, and ask it to do something in your browser. The agent will request a debugging session, Chrome will prompt you to allow it, and then it gets to work.

Some good first things to try:

> Take a screenshot of my current tab

> Run a Lighthouse performance audit on the page I have open

> I have a failing network request selected in the DevTools Network panel — investigate it

## The killer feature: your existing session

Most browser automation tools — Playwright, Puppeteer, headless Chrome — require you to log in programmatically. That means handling 2FA, managing cookies, dealing with CAPTCHAs, and often building an entire auth flow just to get to the thing you actually want to automate.

With `--autoConnect`, your agent inherits your existing Chrome session. You're already logged in everywhere. That opens up a whole category of sites that were never designed to be automated — sites with no API, no CLI, no MCP server, and a complex authenticated UI:

> I'm on my health insurance portal — what's my deductible status and what claims are pending?

> I'm on my bank's website — categorize my last 30 transactions and flag anything unusual

> I'm logged into Workday — what's my remaining PTO balance and when does it expire?

> I'm on my kid's school portal — what assignments are due this week?

> I'm on a paywalled article I subscribe to — summarize it for me

> I'm on a government site filing something — walk me through this form and tell me if I'm filling it out correctly

The common thread: these are all authenticated, proprietary UIs that were never meant to be automated. Your agent doesn't need an API key — it just needs you to already be logged in.

## Further reading

- [Chrome DevTools MCP server on GitHub](https://github.com/chrome-devtools/devtools-mcp)
- [Chrome blog post: Let your Coding Agent debug your browser session](https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session)
