<!--
title: Websites as Apps
description: Turn websites into customized desktop apps with Electron
-->

<figure>
  <img src="/electron-nativefier/github-gmail.png">
</figure>


[Electron](http://electron.atom.io/) is a tool for building cross-platform desktop apps with open web technologies like HTML, CSS, Javascript, and Node.js. [Nativefier](https://github.com/jiahaog/nativefier) is a command-line node module built on Electron that "wraps any web page natively without even thinking, across Windows, OSX and Linux".

This post will walk you through the process of creating an app with Nativefier. Some of the content here is specific to Mac OS X, but it is possible to do all of this on Windows and Linux, too.

## Why?

I used to leave Gmail open in a browser tab all day. For a while I would [pin the tab](https://www.chromium.org/chromium-os/user-experience/tab-ui), but pinning tabs seems symptomatic of a website's need to break out of the browser and have of a life of its own.

## Creating the Dock Icon

OS X uses a [special file format](https://en.wikipedia.org/wiki/Apple_Icon_Image_format) for icons called `icns`. It's a bit cumbersome to convert images to this format, but luckily a kind soul went to the trouble of abstracting away that work in a convenient little node module called [node-icns](http://npm.im/node-icns).

We'll use `curl` to download an application icon from the [GitHub Octodex](https://octodex.github.com/), then convert it from `PNG` to `ICNS`:

The first thing to do is install Node.js. If you don't already have it set up, it's pretty easy. Just download it at [nodejs.org](https://nodejs.org).

```sh
npm install -g node-icns
curl -o cat.png https://octodex.github.com/images/adventure-cat.png
nicns --in cat.png --out cat.icns
```

## Injecting Custom Scripts and Styles

Nativefier allows you to [inject javascript or css files](https://github.com/jiahaog/nativefier/blob/development/docs/api.md#inject) into the packaged web page. This opens up a lot of possibilities, allowing you to customize any aspect of the appearance and behavior of your app.

```sh
echo "console.log('whoa script injection')" > custom.js
echo "body { background: papayawhip; }" > custom.css
```

## Packaging the App

The final step is to install Nativefier, package the website into an app, and move it into the Applications directory:

```sh
nativefier \
  --name "GitHub Gmail" \
  --icon cat.icns \
  --inject custom.js \
  --inject custom.css \
  https://inbox.google.com
rm -rf /Applications/GitHub\ Gmail.app
mv GitHub\ Gmail-darwin-x64/GitHub\ Gmail.app /Applications/
open /Applications/GitHub\ Gmail.app
```

That's all there is to it! To see what other interesting things you can do, check out the [Nativefier API documentation](https://github.com/jiahaog/nativefier/blob/development/docs/api.md).

## Bonus Round: Jake!

It was awesome to have [Finn the Human](https://en.wikipedia.org/wiki/Finn_the_Human) in my dock, but it felt weird without [Jake the Dog](https://en.wikipedia.org/wiki/Jake_the_Dog). Fortunately I also have a personal Gmail account, so there's a spot for Jake:

```sh
curl -o jake.png https://cldup.com/o50ct5wvlJ.png
nicns --in jake.png --out jake.icns
nativefier \
  --name "Inbox" \
  --icon jake.icns \
  https://inbox.google.com
rm -rf /Applications/Inbox.app
mv Inbox-darwin-x64/Inbox.app /Applications/
open /Applications/Inbox.app
```


<figure>
  <img src="/electron-nativefier/finn-and-jake.png" style="max-width:50%;margin:60px;">
</figure>
