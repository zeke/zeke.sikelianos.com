<!--
title: Smokestack
description: A delightfully minimalist tool for piping code into a browser
-->

This post is about [smokestack](),

## Small, Sharp Tools

From [The Art of Unix](http://www.catb.org/esr/writings/taoup/html/ch01s06.html#id2877684):

> Unix tradition strongly encourages writing programs that read and write simple, textual, stream-oriented, device-independent formats. Under classic Unix, as many programs as possible are written as simple filters, which take a simple text stream on input and process it into another simple text stream on output.


https://gist.github.com/adamwiggins/5687294


https://brandur.org/small-sharp-tools
> Create a single, general-purpose tool which is simple to understand but can be applied to many problems. It's like the product version of occam's razor.

The npm community has embraced this

Once you jump on the small module bandwagon, it can get kind of addictive.
It's fun to identity niche programming needs and create small
and solve it with a shareable reusable piece of code.

If the module is destined to be run in a node environment such as a server or
a command-line tool, then writing tests is pretty easy. You use the framework

```sh
echo "console.log('beep boop')" | smokestack
```

```
browserify test.js | smokestack | tap-spec
```

> Simple tools which do one thing well and can be composed with other tools to create a nearly infinite number of results. For example, the unix methodology (stdin/stdout and pipes), see The Art of Unix Programming.

> Don't just claim your js supports "all browsers", prove it with tests!


https://gist.github.com/adamwiggins/5687294#small-sharp-tools

smokestack is exactly that. It does one thing, and does it well.

## Related Tools

- [smokestack-watch](https://github.com/joeybaker/smokestack-watch) uses
watchify to run tape tests with smokestack
- [Zuul](https://github.com/defunctzombie/zuul), an easy way to test your
javascript in browsers.
- [devtool](https://github.com/Jam3/devtool) runs Node.js programs through
Chromium DevTools.
