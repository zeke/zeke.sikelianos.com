<!--
title: OpenCode School
description: A free, self-paced course for learning OpenCode, the open-source AI coding agent.
publish_date: 2026-04-14
kind: project
-->

[OpenCode School](https://opencode.school) is a free, self-paced course for learning [OpenCode](https://opencode.ai), the open-source AI coding agent. No account required, no personal data collected.

## Why I built it

OpenCode is a powerful tool, but it has a learning curve. There are models, permissions, MCP servers, skills, custom commands, workspaces, and a dozen other concepts to wrap your head around. The official docs are good, but they're reference material, not a guided path.

I wanted something more like [nodeschool.io](https://nodeschool.io/), the community-driven workshop series that helped a generation of developers learn Node.js. A course that meets you where you are, walks you through things step by step, and lets you learn by doing.

## How it works

The first lesson, Installation, happens in the browser. It runs a system check and walks you through installing [OpenCode Desktop](https://opencode.ai/docs/desktop/). After that, the rest of the course happens *inside OpenCode itself*.

Each lesson page has a prompt you copy and paste into OpenCode. The agent reads the lesson content, works through the material with you interactively, quizzes you, and marks the lesson complete via an API call that syncs back to the website in real time. You see your progress update on the site without refreshing.

This means the course is self-reinforcing: you're learning OpenCode by using OpenCode.

## Lessons

The course has 14 lessons that build on each other:

1. Installation
2. Interview (OpenCode tailors the course to you)
3. Configuration
4. Permissions
5. Instructions (AGENTS.md)
6. Models
7. Commands
8. Skills
9. Tools (MCP servers)
10. Plugins
11. Agents (Plan vs Build)
12. Sessions
13. Images
14. Workspaces

## Exercises

After the lessons, there are 7 hands-on exercises where you build real things:

1. Build a website (Hono + Cloudflare Workers)
2. Run AI models (Replicate)
3. Edit videos (ffmpeg + yt-dlp)
4. Transcribe speech (Whisper)
5. Drive a browser (Chrome DevTools MCP)
6. Post to social media (Typefully)
7. Use Git and GitHub

## Stack

The site is built with [Astro](https://astro.build/) and hosted on [Cloudflare Workers](https://workers.cloudflare.com/). Lesson content is authored in MDX. The progress tracking API is a simple Cloudflare Worker that stores completion state in KV.

The whole thing is open source: [github.com/opencodeschool/opencode.school](https://github.com/opencodeschool/opencode.school)

## Try it

Head to [opencode.school](https://opencode.school) and enroll. It takes about an hour to get through the lessons, longer if you dig into the exercises. It's free, and it'll stay free.
