<!--
title: Building on Cloudflare
description: OpenCode turns Cloudflare into a candy store for developers.
keywords: []
publish_date: 2026-01-26
kind: project
-->


In this guide, I'll show you how to use the [OpenCode](https://opencode.ai/) AI Agent along with Cloudflare's Docs MCP server to quickly brainstorm and build apps on Cloudflare.

## So many products! 😱

Cloudflare's developer platform has everything you need to build amazing web apps: [Workers](https://developers.cloudflare.com/workers/) for serverless deployment, [R2](https://developers.cloudflare.com/r2/) for object storage, and [D1](https://developers.cloudflare.com/d1/) for serverless databases. But there are [over 100 other products](https://developers.cloudflare.com/directory/) on the developer platform. What do all those products do?

Understanding all of Cloudflare's product offerings used to be a daunting task, but now we have AI agents to help us research, explore, plan, and build new things. What was once an overwhelming sea of options now feels like a candy store of possibilities.

## 1: Sign in to Cloudflare

Sign into the Cloudflare dashboard at [dash.cloudflare.com](https://dash.cloudflare.com/). If you don't already have an account, you can easily create one using your Google, Apple, or GitHub account.

Cloudflare is free to start, with very generous limits before you have to start paying for anything.

## 2: Authenticate

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is Cloudflare's command-line interface. You can run it with npx, which is included with Node.js. (Install Node.js with `brew install node` if don't already have it installed.)

Run this command to authenticate your Cloudflare account:

```bash
npx -y wrangler login
```

This will open a browser window prompting you to authorize Wrangler to access your Cloudflare account.

## 3: Install OpenCode

There are [several ways to install OpenCode](https://opencode.ai/docs/#install), but here we'll use Homebrew:

```bash
brew install anomalyco/tap/opencode
```

## 4: Add Cloudflare's docs server

Cloudflare has [a handful of official MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/) that expose various tools to your OpenCode agent. The one we're interested in is the [Cloudflare Documentation MCP server](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/docs-vectorize), which exposes a tool for searching Cloudflare's documentation from OpenCode.

There are a couple ways to install MCP servers in OpenCode. Here we'll manually edit your OpenCode configuration file (usually located at `~/.config/opencode/opencode.json`) to add the Cloudflare Docs MCP server:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "cloudflare-docs": {
      "type": "remote",
      "url": "https://docs.mcp.cloudflare.com/sse",
      "enabled": true
    }
  }
}
```

## 5: Start building!

Now you've got everything set up. It's time to fire up an OpenCode session and start building on Cloudflare!