<!--
title: Token Privilege
description: TODO
publish_date: 2026-06-30
tags: ai, opencode, models, cloudflare
-->

💸 In an effort to check my Token Privilege, I've been experimenting with using smaller and cheaper models in my daily agent usage.

I use [OpenCode](https://opencode.ai/) with Cloudflare's AI Gateway, which lets me switch to any model from any provider on the fly: small open-source Workers AI models, big Anthropic/OpenAI models, and everything in between.

I take it for granted, but it's wild that you can switch to a different model in the middle of an OpenCode session and it will just keep working. All the context of the session comes with you.

This comes in handy when you're using a smaller model and it starts flailing mid-session: switch to Opus or GPT, bail out the session, get it back on track, then maybe switch back down.
