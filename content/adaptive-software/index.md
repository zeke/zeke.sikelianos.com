<!--
title: 
description: 
publish_date: 2026-05-28
kind: project
-->

I started practicing yoga in 2007, nearly twenty years ago. Unlike those enlightened people who have managed to cultivate their own personal practices at home, I still practice mostly at yoga studios, where I can enjoy a variety of teaching styles and practice in community with other yogis.

I love trying out new yoga studios whenever I can. Every studio is different, as is every teacher. You can learn something new from everyone. I know many people enjoy finding their favorite studios and settling in with their favorite teachers, but I prefer the spontaneity and the variety of trying new things.

But one thing I don't love is the process of finding studios and browsing their schedules to choose classes that spark my interest and fit my schedule. For years (almost decades now), I've wanted to build a yoga schedule aggregation tool. I've imagined a simple website or mobile app that detects your location and shows you a list of all upcoming classes in your area. 

I've made a few attempts over the years at building a website or an app to solve this problem, but it's always been too hard to pull off. Every studio website has their own booking system, their own finicky embedded schedule, their own bot detection mechanisms. And usually the schedules are displayed in some kind of dynamic frame through a third party service like MindBody, Momence, Punchpass, and others.

I've never managed to successfully build this kind of thing before because there are too many variables between studios and services, and too many technical hurdles to reliably collect studio schedule information in a structured way.

## Concrete Programming

For most of my life, building software has meant writing code. Code that performs a specific task with a well-defined set of expectations. If those expectations aren't met, the code doesn't work. Let's call this concrete programming. You write code in a language like JavaScript or TypeScript or Python or any other programming language. It can contain conditional logic to match certain patterns and adapt to certain predictable outcomes. But it is inherently inflexible. If your code encounters a condition or a situation that is unfamiliar, it fails. It gives up.

This concrete programming paradigm is what's kept me from realizing my vision for a yoga studio schedule aggregation tool. It would have been way too much work. I would have had to write custom code for each of the dozens of third-party booking systems, all of which are continuously evolving.

## AI-assisted Programming

It's now 2026 and the software development landscape has changed dramatically in the last year or two. Humans no longer write code. Humans give instructions in natural languages like English or Portuguese or Japanese and let AI large language models (LLMs) write the code for us.

Let's call this AI-assisted coding. This is a huge leap forward, as LLMs are capable of writing better code than most humans.

So we're moving faster now, but **we're still doing concrete programming**: write source code, package it, release it as software. It's still code with a set of procedural instructions and specific expectations. It's still brittle. It doesn't adapt!

## Adaptive Programming

Now for the fun part.

For illustrative purposes, let's imagine you have a team of 40 humans working together to help you find a yoga class. Each human has a web browser. When they arrive at a website they've never seen before, they can find the schedule. Embedded in an iframe? No problem... just wait a bit for the page to load. Schedule is in a PDF? That's silly, but fine. Humans can download PDFs and read those, too.

Unlike concrete software, humans can apapt to their environment. Humans know how to search, click, scroll, and type. Humans can read text and interpret images. Humans can continuously absorb new information and make informed decisions based on their context.

If you had this human team, you'd find your best yoga class in no time!

You don't have this human team, but you do have access to AI agents that can also do all of these things:

- Agents can browse the web.
- Agents can search.
- Agents can click.
- Agents can read text.
- Agents can interpret images.
- **Agents can adapt.**

We're all used to seeing this kind of adaptiveness in the context of a single chat session in a tools like ChatGPT, or a single programming session in a tool like Claude Code, Gemini, or OpenAI codex. We have gotten used to this in a one-off context where we're having a back-and-forth conversation with an AI model. You say something, the model responds. You correct it, the AI adapts.

The thing that's new here is that we can employ these same adaptiveness to deployed software like mobile apps and websites.

## Applying the idea

Let's examine the yoga studio project through the lense of adaptive programming.



- Workers
- AI Gateway gives us the option of running any model (Anthropic, OpenAI, Gemini, open-source models) with unified billing and observability.
- Agents
- Browser Run

> A web app where a user enters a location (geolocated or typed placename) and a date range, and gets a chronological list of nearby yoga classes. When the database doesn't yet know about that location or time window, a prompt-driven agent runs in the background to discover studios and scrape their schedules. Results stream into the page live or, optionally, notify the user when ready.