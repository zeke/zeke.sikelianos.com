<!--
title: Building on Cloudflare
description: OpenCode turns Cloudflare into a candy store for developers.
keywords: []
publish_date: 2026-01-26
kind: project
-->


[OpenCode](https://opencode.ai/) is a new open-source AI agent that has quickly become my favorite tool for hacking.

In this post I'll show you how to set it up with Cloudflare's Docs MCP server to quickly design and build apps on Cloudflare.

## So many products! 😱

Cloudflare's developer platform has everything you need to build web apps: [Workers](https://developers.cloudflare.com/workers/) for serverless deployment, [R2](https://developers.cloudflare.com/r2/) for object storage, and [D1](https://developers.cloudflare.com/d1/) for serverless databases. But there are [over 100 other products](https://developers.cloudflare.com/directory/) on the developer platform. What do all those products do?

Understanding all of Cloudflare's product offerings used to be a daunting task, but now we have AI agents to help us research, plan, and build. What was once an overwhelming array of options now feels like a candy store of possibilities.

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

## 5: Start OpenCode

Now you've got everything set up. It's time to fire up an OpenCode session.

Open your terminal, then navigate to an existing project or create a new directory:

```sh
mkdir my-new-app && cd my-new-app
```

Then start opencode:

```sh
opencode
```

Now hit to `Tab` on your keyboard to switch to **Plan** mode. This will let you collaborate with the agent on a plan before actually creating or editing any files.

Then type a query and to get the conversation going. Here are some examples:

> How do Cloudflare agents and sandboxes work together?

> Can I use Cloudlare to process emails?

> Do Cloudflare Workers costs depend on response sizes? I want to serve some images (map tiles) from an R2 bucket and I'm concerned about costs.

> How many indexes are supported in Workers Analytics Engine? Give an example using the Workers binding API.