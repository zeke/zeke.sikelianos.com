<!--
title: Dial-a-Repo
description: Pick up your phone and talk to any public GitHub repository.
publish_date: 2026-08-11
kind: project
-->

<video controls poster="/dial-a-repo/thumbnail.jpg">
  <source src="https://assets.zeke.sikelianos.com/dial-a-repo/demo-with-captions.mp4" type="video/mp4">
</video>

I've been playing around building my own voice agents: AI-powered systems that you can interact with conversationally. It's pretty easy to build them these days if you know the right incantations to whisper into your "agent harness". Voice agents can be deployed web services that you hook into with an actual phone call, or they can be web apps that use your microphone, or they can be mobile apps or desktop apps. But under the hood, they're all using the same technology: a cloud-hosted language model that can change text into speech and speech into text, and that has "tools", which are functions that give it the capability to do things other than "make stuff up", which is what language models do on their own. **Tools** give language models the capability to do research, fetch realtime data, write and execute code, and perform other actions.

The first proper phone-powered voice agent I made is called **Fake Dad**. It's a phone number that my kids can call to get answers to questions their real dad can't answer very well. It has a web search tool, and it responds with a cloned version of my real voice. It's a novelty. It's not perfect. But it's way better than Siri or "Hey Google". And they can call it from our landline. Which means they can get access to **grounded research without using a screened device** like a smartphone, or a tablet, or a computer. They just pick up the heavy old rotary phone in their bedroom, call their fake dad, ask detailed questions about history, science, math, culture, whatever, and get answers grounded in actual web research rather than LLM hallucinations or just "I don't know because I'm Siri and I'm very bad at stuff. Sorry."

My most recent voice agent experiment is called **[Dial-a-Repo](https://github.com/zeke/dial-a-repo)**. It's a U.S. phone number you can call (**607-365-4321**) to dig into the nitty-gritty details of the source code of any public GitHub repository. This is not a particularly useful project, but it illustrates some of the principles around building voice agents with access to tools, and it serves as a foundational reference implementation for people who want to explore building their own voice-powered creations.

The thing that excites me most about Dial-a-Repo is its use of [cloudflare/computer](https://github.com/cloudflare/computer), a new npm package that can dynamically spin up ephemeral computers to do real work, execute real code, and then vaporize in an instant. Cloudflare Computer is especially cool because it can use V8 isolates for many common programming tasks (think [code mode](https://blog.cloudflare.com/code-mode/)), instead of beefy/slow/expensive Linux containers. Isolates are like tiny virtual computers that can spin up nearly instantly, execute work, and then disappear. Isolates are very fast and they're very cheap. This means giving a voice agent a very fast ephemeral computer is actually feasible now. That's kind of a new thing that we couldn't do before.

Where am I going with this? I'm not exactly sure. The point is: it's easier than ever to build voice-powered interfaces. If that interests you, you should play around with this repository and see what you can build with it.

<p style="margin-bottom: 0.25rem; opacity: 0.75; font-size: 0.9rem">Copy this and paste it into your agent:</p>

```plaintext
Let's build a custom voice agent!

Use this repo for reference: https://github.com/zeke/dial-a-repo
```