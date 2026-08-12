Zeke: Hey party people, let's make a phone call and talk to some GitHub repos, shall we?

Voice Agent: Hi. Tell me the name of any public GitHub repo.

Zeke: Can you tell me about the new `cloudflare/computer` project and just kind of explain it briefly, high level?

Voice Agent: Let me pull that up. It's called Cloudflare Computer, give your agent a computer. It's a virtual filesystem inside a Durable Object, backed by SQLite, that lets agents or code read, write, and execute in a real workspace. Three backends today: a full Linux container with FUSE, a lightweight shell in a Worker, and a JavaScript runtime with `fs` and git access. It's a preview for experiments, not production yet.

Zeke: Okay, that's awesome. So, do you also have a repository on GitHub?

Voice Agent: Let me pull that up. Yep, I'm `zeke/dial-a-repo`. I fetch real repo data with tools and talk you through it over the phone.

Zeke: That's amazing. So, could your GitHub repo be used as the basis for people to build their own voice agents?

Voice Agent: Yes, it's explicitly adapted as a reference for voice agents on Cloudflare.

Zeke: Okay, very cool. That's awesome. ¿Puedes hablar en español también?

Voice Agent: Sí, puedo hablar en español. ¿Qué repo te gustaría que te cuente?

Zeke: Okay, perfecto. Eh, est-ce que vous parlez français aussi?

Voice Agent: Oui, je peux parler français aussi. De quel dépôt veux-tu que je te parle?

Zeke: En fait, uh, j'ai fini, uh, c'est tout, hein. Merci pour, pour, uh, votre attention et au revoir.

Zeke: Okay, so freaking works, you guys! Okay, here's what this is. So, here's a public repo on GitHub. That is the source code for the agent that we just had a phone call with. So, I won't get into too much about the details of how this thing works, but basically it uses xAI's Grok model and their voice API service, plus Cloudflare Workers for some of the dynamic stuff.

I used SignalWire to register the phone number. SignalWire was the only service that I could find that didn't require me to, I don't know, talk to a representative or go through some sort of long, bizarre process, but SignalWire just worked out of the box. I was actually able to point my DevTools MCP at it and have it go through the process for me automatically.

The thing I think is really interesting about this project is it demonstrates the capabilities of Cloudflare Computer. So, when we just had that phone call, it was actually using the GitHub API to find repositories and then literally `git clone` those repos in an ephemeral filesystem in a V8 isolate. So, similar to Cloudflare Workers, it's a very fast environment and it has Git capabilities built into it. So, instead of spinning up an entire Linux container, it's actually just this lightning-fast virtual filesystem that can clone stuff in Git.

So, of course, this demo is more of a proof of concept than something actually useful, but it kind of gives you an idea of the fact that you can build a voice agent that has an LLM behind it with access to tools, and in this case, it's just a handful of Git tools.

So, what I want you to do is reflect on what you saw here and think about how you could build even more powerful or interesting voice agents based on this idea. And I want to point out a few interesting things you can add that I've actually tried these and I see that they work, which is just bonkers.

One of them is cross-call memory. So, you can imagine saving a transcript of every call from a phone number, and then you can load those previous transcripts into memory, or summaries of those transcripts, into the agent memory on a new call so that it basically has historical reference for the entire conversation that has proceeded in other phone calls. You can also change the behavior of the agent based on the individual caller.

You can also do outbound calling. So, if you imagine you're running a long task and you know the agent's going to take a long time, you can say, "Hey, just call me back on this number when you're done." I didn't think that was going to work, but it actually works! It's pretty amazing.

And then, of course, just giving new tools to your agent. So, in this example, I've tested out doing a web search, I gave it access to a few Git tools, but you could imagine plugging in all kinds of MCPs and more interesting tools here to do really powerful stuff over the phone.

So, clone this repo, throw the URL at your agent, and see what you can build with it. Have fun! Bye!