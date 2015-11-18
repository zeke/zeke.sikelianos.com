<!--
title: Moby Thesaurus
description: The world's largest English thesaurus
website: http://moby-thesaurus.org/
keywords: [language, English, thesaurus, Node.js, reference]
start: 2014-04-26
end: 2014-04-28
-->

[moby-thesaurus.org](http://moby-thesaurus.org) is a free and open-source website for searching the [largest thesaurus in the English language](https://en.wikipedia.org/wiki/Moby_Project). Moby is a weird and wonderful reference full of unusual and illuminating word relationships. The thesaurus itself has been around since the early 1990s, but no one bothered to build a nice website for searching and displaying its content, so I took it upon myself to fix that.

<figure>
  <a href="http://moby-thesaurus.org"><img src="screenshot.png"></a>
</figure>

It works on mobile devices, too. Add it to your home screen for quick access.

<figure>
  <a href="http://moby-thesaurus.org"><img src="mobile2.png"></a>
</figure>

Moby is freely available on npm at [npm.im/moby](https://www.npmjs.com/package/moby). It include a programmatic JavaScript API as well as a command-line interface (CLI):

```sh
npm install moby --global
moby simple
```
