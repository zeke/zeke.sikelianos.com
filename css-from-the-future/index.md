<!--
title: CSS from the Future
description: When will vanilla CSS be good enough to replace Sass, Less, Stylus, and the rest?
-->

One of the hardest things about being a web developer is accepting the fact that many of the people visiting your site are using old and underpowered web browsers. New features are added to web browsers all the time, but you generally can't use those features, unless you're willing to exclude lots of users who just aren't up to date.

When developing apps with [Electron]([Electron](http://electron.atom.io)), this problem doesn't exist. The code you write in your Electron app executes on a single browser, [Chromium](https://www.chromium.org/Home). Chromium is the core of the Google Chrome web browser, so it's actively maintained by Google. It's also open source, which means that a huge community of developers are improving it daily.

## CSS Custom Properties

Last week, a [new version of Electron was released](http://blog.atom.io/2016/03/25/electron-37.html) with support for CSS Custom Properties. If you’ve used preprocessed languages like Sass and Less, you’re probably familiar with *variables*, which allow you to define reusable values for things like color schemes and layouts. Variables help keep your stylesheets DRY and more maintainable.

Because CSS custom properties are just regular properties of CSS, [they can be manipulated with JavaScript](http://codepen.io/wesbos/pen/adQjoY). This subtle but powerful feature allows for dynamic changes to visual interfaces while still benefitting from CSS’s hardware acceleration, and reduced code duplication between your frontend code and stylesheets.

Here's an example of custom properties in use:

```css
:root {
  --primary-color: papayawhip;
  --base-line-height: 1.4;
}

.thing {
  color: var(--primary-color);
  margin: 0 0 calc(var(--base-line-height) * 1rem);
}
```

Check out the [Google Demo](https://googlechrome.github.io/samples/css-custom-properties/) (requires Chrome 49+)

## CSS Mixins and Extending

So. We have variables in CSS now. That's pretty neat, but it doesn't get us all the way to CSS heaven. What we really need is a way to write little bits of reusable CSS. These features have long existed in [Sass](http://sass-lang.com/guide#topic-6), [Less](http://lesscss.org/features/#extend-feature), and [Stylus](http://stylus-lang.com/docs/extend.html), but there's no way to do it in regular CSS.

## Enter the @apply Rule

[Someone at Google](http://www.xanthir.com/contact/) is working on a new [spec](https://tabatkins.github.io/specs/css-apply-rule/):

> This specification defines the @apply rule, which allows an author to store a set of properties in a named variable, then reference them in other style rules.

Here's an example of how to use the `@apply` rule:

```css
body {
  --alert: {
    color: white;
    padding: 15px;
    margin: 1rem 0;
    border-radius: 6px;
  }
}

.alert-success {
  @apply --alert;
  background-color: olivedrab;
}

.alert-warning {
  @apply --alert;
  background-color: firebrick;
}
```

As of this writing (April 8, 2016), the feature is very new and has not yet landed in Google Chrome or even [Chrome Canary](https://www.google.com/chrome/browser/canary.html), but it is available behind a flag in the latest Chromium nightly.

To try out `@apply` for yourself, [download the latest Chromium](https://download-chromium.appspot.com) and start it [with a flag](https://www.chromium.org/developers/how-tos/run-chromium-with-flags). Here's how you do that on OS X:

```sh
/Applications/Chromium.app/Contents/MacOS/Chromium \
  --enable-blink-features=CSSApplyAtRules
```

To see the composable styles in all their glory, head on over to [my codepen demo](http://codepen.io/zeke/pen/XdVopX):

<figure>
  <a href="http://codepen.io/zeke/pen/XdVopX">
    <img src="/css-from-the-future/codepen.png" />
  </a>
  <figcaption><a href="http://codepen.io/zeke/pen/XdVopX">Codepen demo</a> of @apply in Chromium browser</figcaption>
</figure>

## Writing futuristic CSS today

Once this `@apply` implementation lands in Chromium and Electron, we'll be able to write clean, maintainable styles using vanilla CSS. But until that day comes, we'll have to continue leaning on preprocessors to fill the void.

There are at least two projects that allow you to write futuristic CSS: [Myth](http://www.myth.io/) and [cssnext](http://cssnext.io/features/). Of those two projects, `cssnext` is more actively maintained, and even has an [open issue](https://github.com/MoOx/postcss-cssnext/issues/203) for implementing `@apply` support.

Here's to the future of CSS! :beers:

## Further Reading

- [Basic implementation of @apply at Chromium.org](https://codereview.chromium.org/1645433002)
- [CSS Custom properties in-depth](https://blog.gospodarets.com/css_properties_in_depth)
- [Custom CSS mixins with Polymer](https://www.polymer-project.org/1.0/docs/devguide/styling.html#custom-css-mixins)
- [Electron 37 blog post](http://blog.atom.io/2016/03/25/electron-37.html)

<figure>
  <img src="/css-from-the-future/observatory.svg" />
</figure>
