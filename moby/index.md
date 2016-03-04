<!--
title: Moby Thesaurus
description: The world's largest English thesaurus
website: http://moby-thesaurus.org/
repository: https://github.com/zeke/moby
keywords: [language, English, thesaurus, Node.js, reference]
start: 2014-04-26
end: 2014-04-28
-->

[Moby Thesaurus](http://moby-thesaurus.org) is a free and open-source website for searching the [largest thesaurus in the English language](https://en.wikipedia.org/wiki/Moby_Project). The thesaurus itself has been around since the early 1990s, but until recently its content was only available on [clickbaity](https://en.wikipedia.org/wiki/Clickbait) websites with terrible interfaces and lots of banner ads. In 2014, I set out to change that by creating  [moby-thesaurus.org](http://moby-thesaurus.org). The site is fast, contains no ads, works well on mobile, and is [open-sourced on GithHub](https://github.com/zeke/moby).

<figure>
  <a href="http://moby-thesaurus.org"><img src="/moby/screenshot.png"></a>
</figure>


## Mobile Friendly

Moby works on mobile devices, too. Add it to your home screen for quick access.

<figure>
  <a href="http://moby-thesaurus.org"><img src="/moby/moby-on-mobile.png"></a>
  <figcaption>Moby on Mobile</figcaption>
</figure>

## Javascript API and CLI

Moby is also available as a Node.js package on at [npm.im/moby](https://www.npmjs.com/package/moby). It includes a programmatic JavaScript API as well as a command-line interface (CLI):

```sh
npm install moby --global
moby simple
```
