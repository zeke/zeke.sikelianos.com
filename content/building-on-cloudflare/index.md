<!--
title: Building on Cloudflare
description: OpenCode turns Cloudflare's Developer Platform into a candy store for software developers.
keywords: []
publish_date: 2026-01-26
kind: project
-->

Cloudflare's developer platform has everything you need to build amazing web apps: [Workers](https://developers.cloudflare.com/workers/) for serverless deployment, [R2](https://developers.cloudflare) for file storage, and [D1](https://developers.cloudflare.com/d1/) for serverless databases. But there are [over other 100 products](https://developers.cloudflare.com/directory/) on the developer platform. What do all those products do?

Understanding all of Cloudflare's product offerings used to be a daunting task, but now we have AI agents to help us research, explore, plan, and build new things. What was once an overwhelming sea of options now feels like a candy store of possibilities.

## What we'll cover

In this guide, I'll show you how to use the [OpenCode](https://opencode.ai/) AI Agent along with Cloudflare's Docs MCP server to quickly brainstorm and build apps on Cloudflare.

## Step 1: Sign in to Cloudflare

Sign into the Cloudflare dashboard at [dash.cloudflare.com](https://dash.cloudflare.com/) - 
if you don't already have an account, you can easily create one using your Google, Apple, or 
GitHub account.

Cloudflare is free to start with, and you can build and deploy Workers, Pages, and other services without setting up billing.

## Step 2: Authenticate with Wrangler

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is Cloudflare's command-line tool for building and managing Cloudflare Workers and other Cloudflare services.

You can run Wrangler without even installing it locally by using `npx`. (You'll need Node.js installed to do this)

To authenticate Wrangler with your Cloudflare account, run the following command:

```bash
npx -y wrangler login
```

This will open a browser window prompting you to authorize Wrangler to access your Cloudflare account. Once authorized, you can start using Wrangler to manage your Cloudflare projects.

## Step 3: Install OpenCode



There are [several ways to install OpenCode](https://opencode.ai/docs/#install), but here we'll use Homebrew:

```bash
brew install anomalyco/tap/opencode
```

## Step 4: Add Cloudflare Docs MCP to OpenCode



Cloudflare has a handul of MCP servers that expose various tools to your OpenCode agent.

The one we're interested in is the "Cloudflare Docs" MCP, which exposes a tool for searching Cloudflare's documentation from OpenCode.

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
```

## Step 5: Start building!

Now you've got everything set up. It's time to fire up an OpenCode session and start building on Cloudflare!