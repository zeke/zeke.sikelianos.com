<!--
title: Ten things I love about Replicate
description: ...and ten things I don't.
publish_date: 2026-02-11
-->

<video class="breakout" controls poster="/ten-things-i-love-about-replicate/thumbnail.jpg" style="width: 100%; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 3rem;">
  <source src="https://assets.zeke.sikelianos.com/ten-things-i-love-about-replicate/ten-things-i-love-about-replicate.mp4" type="video/mp4">
</video>

Replicate was [acquired by Cloudflare](https://replicate.com/blog/replicate-cloudflare) in December 2025. We're teaming up to make the best platform for building AI-powered software on the internet. This feels like an opportune time to talk about the things that make Replicate special, and the things we now have a chance to improve.

## What's to love?

### 1. [Collections](https://replicate.com/collections)

When you go to the collections page on Replicate, you can quickly get a sense of all the different things these models can do. There are collections for [text-to-image](https://replicate.com/collections/text-to-image), [text-to-video](https://replicate.com/collections/text-to-video), [text-to-speech](https://replicate.com/collections/text-to-speech), [music generation](https://replicate.com/collections/ai-music-generation), and more. It's a curated page where humans have added models to collections knowing they're good at specific tasks. If you're new to Replicate or just exploring what's possible, this is a great place to start.

### 2. [Playground](https://replicate.com/playground)

The playground is a page on Replicate where you can run a bunch of models all at once and compare their outputs. Type in something like "dragon fruit", hit enter a few times, and you'll get results fast. You can switch between models while keeping the same prompt, which makes it easy to compare output quality and generation speed side by side. If you see something you like, you can download it or grab the code to reproduce it with the API using the same inputs. This is my favorite place to start before writing any code against a new model.

### 3. [Official models](https://replicate.com/docs/topics/models/official-models/)

Official models are maintained by Replicate staff. They're guaranteed to be stable, always on, and fast. When you're choosing a model on Replicate, you generally want to look for the "Official" designation. [Nano Banana Pro](https://replicate.com/google/nano-banana-pro), for example, has that marker in the top left. If you want a model that's well-supported, won't break on you suddenly, and responds instantly to your requests, look for the official badge.

### 4. [HTTP API](https://replicate.com/api)

The website is great for discovering and running models, but eventually you want to write code. Replicate's API is actually pretty small. Unlike services with hundreds of endpoints, we've got about 35, covering the basics: creating predictions (the noun we use for the result of running a model), listing them, searching for models, browsing collections.

The API is documented with an [OpenAPI schema](https://api.replicate.com/openapi.json). It's not a huge file, but if you're using a language model you can throw this schema URL at your agent and it can understand everything it needs to know about interacting with the Replicate API: searching models, comparing them, inspecting their inputs and outputs, running them. There are also official client libraries for [Python](https://github.com/replicate/replicate-python) and [JavaScript](https://github.com/replicate/replicate-javascript).

### 5. [One token](https://replicate.com/account/api-tokens), [many providers](https://replicate.com/google)

Creating an API token on Replicate is easy. Go to your account settings, create a token, copy it, and you're off. But what's really nice is that Replicate hosts models from many providers. If you've ever tried to get a Google API key for running models through their API, you know how painful it is: bouncing between AI Studio and another site, creating a key, attaching billing. Same story with [Anthropic](https://replicate.com/anthropic), where there's the Cloud Console and the Anthropic Console and it's never clear which is which.

With Replicate, one API key gets you access to models from Google, Anthropic, [OpenAI](https://replicate.com/openai), [ElevenLabs](https://replicate.com/elevenlabs), and more.

### 6. [Model schemas](https://replicate.com/kwaivgi/kling-v2.6-motion-control/api/schema)

Every model on Replicate is built using [Cog](https://github.com/replicate/cog), an open source tool that lets you wrap a machine learning model in a bit of Python code to standardize its input and output schemas. The result is that every single model on Replicate has a schema defining all of its inputs and outputs: types, default values, whether they're required. It's a design that's friendly to both programmers and automated tools.

### 7. [Sharing](https://replicate.com/docs/topics/predictions/share-a-prediction)

Sharing predictions is like GitHub Gists for AI output. Whenever you run a model on the website, you can hit the share button to make your prediction publicly viewable. You get a URL you can pass around, and anyone who opens it can see all the inputs and outputs that led to that result.

This gets back to the origin of the name "Replicate": the goal was to make machine learning reproducible, so people could share and replicate each other's results instead of digging through PDFs from academic archives. It's a small feature, but it's genuinely useful.

### 8. [Userland](https://github.com/replicate/all-the-public-replicate-models)

Userland is a term from the Linux world where the core of the system is small and simple, and the majority of innovation happens outside in user space. Replicate works the same way. An example is [all-the-replicate-models](https://github.com/replicate/all-the-public-replicate-models), an npm package that stuffs the entire public model catalog into a single JSON file. Anyone can write code that interacts with Replicate's API to get metadata about every model on the platform.

If Replicate doesn't yet have a specific feature you want, it's not available on the website or via the API, you can take matters into your own hands and build it yourself with the model metadata.

### 9. [MCP](https://replicate.com/docs/reference/mcp)

MCP servers are the way language models use tools to talk to APIs. Replicate has an MCP server that you can install locally or access at [mcp.replicate.com](https://mcp.replicate.com). It lets you plug Replicate's capabilities into your agent environment without knowing much about how Replicate works. There's also a [blog post](https://replicate.com/blog/remote-mcp-server) about the remote MCP server.

This is a huge unlock. You can throw commands at it like "search Replicate for the best image models, compare them by price and speed, run them all, and save the outputs to my computer." The language model inspects the API's capabilities and dynamically figures out what to do. Instead of poking around on the website trying to figure everything out, you throw some context at your language model and let it sort things out. It's quickly becoming the default way people explore Replicate.

### 10. [Generic models](https://replicate.com/zeke/change-video-speed)

You probably think of Replicate as a place to run sophisticated ML models that require GPUs. But you can also run generic models that are just a bit of Python code. One of my favorite things is wrapping [ffmpeg](https://ffmpeg.org/) capabilities into a model. ffmpeg is a powerful command-line tool for manipulating video, but it has an arcane syntax that used to send you to Stack Overflow.

Now AI can write those ffmpeg commands. I packaged up a [change-video-speed](https://replicate.com/zeke/change-video-speed) model where you throw a video at it and change the playback speed. No GPU, just a CPU. Cheap and fast. You can use it through the API or drag and drop a file in the browser. It's a reminder that Replicate isn't only about AI models.


---

## 💔 Ten things I don't love

And now for the juicy bits. You don't normally hear people at companies talking about the parts of their product they don't like. But we've just been acquired by Cloudflare, and a lot is going to change for the better: more people, more resources, and a chance to rethink how we do things. This feels to me like the right time to reflect on some of the things that make Replicate difficult for our users, with an eye toward improving them now that we have the resources at Cloudflare to pull it off.

### 1. [Cold boots](https://replicate.com/docs/reference/how-does-replicate-work#cold-boots)

If you've poked around and found a community model on Replicate, you may have noticed it can take a very long time to start up. Sometimes several minutes before you get a response. That's okay for exploring, but it makes the model unusable for production applications.

The workaround today is [deployments](https://replicate.com/docs/topics/deployments): take a model off the shelf, [create a customized endpoint](https://replicate.com/docs/topics/deployments/create-a-deployment) for it, and set the minimum instances to one so it's always on. Of course, that means you're footing the bill for the idle GPU time.

Cloudflare is pretty good at making things fast. I'm optimistic that techniques like GPU snapshotting will let us dramatically improve cold boot times, even for giant Docker containers with 10 gigs of model weights.

### 2. [Output files expire](https://replicate.com/docs/topics/predictions/data-retention/)

When you run a model via the API, you get an HTTPS URL for your [output file](https://replicate.com/docs/topics/predictions/output-files). Your instinct is to treat it as a permanent asset. The problem is that API-generated output files expire after one hour. Files created through the website last indefinitely, and sharing a prediction also makes its outputs permanent. But if you're building with the API, that file is going to disappear.

There are workarounds. I wrote a [guide](https://replicate.com/docs/guides/extend/cloudflare-image-cache) showing how to set up a Cloudflare Worker that receives a [webhook](https://replicate.com/docs/topics/webhooks) when a prediction completes and stores the output in R2 or Cloudflare Images. It's not super hard, but it should be easier.

### 3. [No OpenAI format](https://replicate.com/p/159vx1wzzxrma0crgrc9jj4xjc)

When you run a language model on Replicate, the output you get back is an array of text fragments rather than the format that's become the de facto standard from OpenAI. This matters because many people build applications using OpenAI's SDK and then swap the base URL to point at other providers. Since Replicate's response structure doesn't match, you can't just pivot to another model.

I think this will get better as we integrate with Cloudflare's [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Standardized response structures for language models feel inevitable.

### 4. [`replicate.run()`](https://replicate.com/home)

Our client libraries have a convenience method called `replicate.run()`. It's right there on the homepage. You specify a model and some input, and it returns the output. Dead simple.

The problem is that once you get beyond a toy demo, you usually want more: the [prediction](https://replicate.com/docs/topics/predictions) status, how long it took, the prediction ID so you can look it up later. `replicate.run()` hides all of that. When you're building a real application, you end up rewriting your code to use polling or [webhooks](https://replicate.com/docs/topics/webhooks). The initial experience is easy, but the transition to production requires starting over.

### 5. [Too many models](https://replicate.com/explore)

There are something like 70,000 models on Replicate. Even with curated collections, you can still feel like you're missing the latest state-of-the-art model buried somewhere in the sea. I still have this feeling, and I work here.

MCP helps with this. Open a session in Claude Code or similar, plug in the [Replicate MCP server](https://mcp.replicate.com), and ask things like "show me the last 10 models published with more than 100 runs." If you have model FOMO, MCP is a good antidote.

### 6. [Outdated curation](https://replicate.com/collections)

The collections page is helpful, but it's maintained by humans. That's part of its charm, but also the problem. There's no guarantee that the collections show you the best model for a given use case. Something might exist that nobody thought to add yet.

If you have doubts about whether the collections are showing you everything, pull out your agent, plug in Replicate MCP, give it your specific requirements, and let it search through the full model catalog.

### 7. [No pricing API](https://replicate.com/google/nano-banana-pro#pricing)

Pricing is visible on the website. Different models are priced differently, and official models often have pricing that varies by multiple properties like resolution. It's transparent and easy enough to understand on the web.

But if you want to programmatically compare model prices, there's no API for that. People end up manually visiting web pages or scraping them to get pricing data. This will improve.

### 8. [Redundant APIs](https://replicate.com/docs/reference/http#models.predictions.create)

This is one I hold myself personally accountable for. There are two different ways to run a model via the API. The original [`predictions.create`](https://replicate.com/docs/reference/http#predictions.create) endpoint takes a model version in the request body and works for everything: community models and official models. Then there's [`models.predictions.create`](https://replicate.com/docs/reference/http#models.predictions.create), which has a slightly different structure and only works for official models.

This causes confusion for both users and agents, who find one endpoint and assume it's the only one, then hit errors depending on the model they're trying to run. In the new world, we'll make sure there's one consistent API for running models.

### 9. MCP context bloat

Early MCP servers, including Replicate's, define one tool for every API operation. That means a ton of JSON gets stuffed into the language model's context window. At one point, Replicate's MCP server was eating up something like half the context window in Claude Code. Not great. It makes people not want to use it, and it makes everything slow.

The fix is [Code Mode](https://replicate.com/docs/reference/mcp#code-mode). Instead of exposing one tool per operation, it exposes just two tools: one for searching the API docs and one for writing code. When you ask it to find the fastest video models, instead of a slow back-and-forth series of individual API calls, it evaluates your goal upfront, writes a custom TypeScript snippet that makes multiple API calls simultaneously, and returns the result. Way faster, no context bloat.

---

All of these things I don't love are solvable problems, and I'm confident we'll solve them now that we're part of Cloudflare.

🖤 🤝 🧡
