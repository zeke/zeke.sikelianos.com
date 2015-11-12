<!--
title: Twenty Years with JavaScript
description: npm is amazing; I want my mom to understand why.
published_at: 2014-08-18
-->

![](/assets/images/js-logo.svg)

## Twenty Years with JavaScript

I was thirteen when JavaScript was born.

My mom maintained the computer network at an engineering firm where she had access to all the old computers that were being replaced by newer, faster ones. I inherited a number of hand-me-down computers from my mom, but the first one of any real signifance to me was my 486. It came with Windows 3.1, the first operating system I'd used that had a [graphical user interface](http://goo.gl/IBLkWy). It had a 50mHz processor, 32 MB RAM, a 500 MB hard drive, and a 9600-baud modem. This was to be the first machine I used to connect to the Internet, which in those days was not necessarily [capitalized](http://en.wikipedia.org/wiki/Capitalization_of_%22Internet%22).

As every American over thirty surely remembers, America Online used to send out 3.5-inch floppy disks (and later CDs) to [every address in the country](http://techcrunch.com/2010/12/28/aol-floppy-disk/), each offering a free first taste of the Internet. Anyone with a land line and a computer with a modem could install this software and access the Internet for free.

At this time there were only a handful of [web browsers in existence](http://upload.wikimedia.org/wikipedia/commons/7/74/Timeline_of_web_browsers.svg). Tim Berners-Lee created WorldWideWeb, the first web browser ever, in 1990. A few years later Mosaic was released, becoming the first browser to mingle text and images together on a single page. But it was [Netscape](http://en.wikipedia.org/wiki/JavaScript#Birth_at_Netscape) that became the dominant browser of the early nineties, its success fueled largely by AOL's relentless distribution of the software.

In 1995, the JavaScript programming language was created by the Netscape corporation. The purpose of the new language was to make web sites more dynamic, giving content creators control over the behavior and appearance of their sites. This was also the beginning of a shift of responsibility (and capability) from servers to clients.

Netscape enjoyed near-total domination of the browser space for a time, but Microsoft was fast on their heels. In 1996, Microsoft released Internet Explorer 3 with support for JavasScript and the market's first CSS implementation. (CSS, which stands for Cascading Style Sheets, is a story for another blog post, but in essence it's a design language for describing the visual appearance of content in the browser. Before CSS, web design basically sucked.) The release of this new version of IE marked the beginning of the so-called [Browser Wars](http://en.wikipedia.org/wiki/Browser_wars#The_first_browser_war), and a dark time in the history of web development. As these two companies battled for dominance of a growing market, they made technology choices that diverged from [World Wide Web Consortium](http://en.wikipedia.org/wiki/World_Wide_Web_Consortium) standards, effectively forcing web designers to optimize for one of the two browsers.

It was around this time that I created [my first website](http://www.geocities.ws/chinageek/) using the popular (and free) [Geocities](http://en.wikipedia.org/wiki/GeoCities#History) hosting service. My best friend Tyler and I would spend hours surfing the web learning how to build our website, then adding every silly JavaScript feature we could think of: a What is your name? prompt, a (weakly) password-protected page full of illegal softwar downloads, and a Your computer will blow up when you leave this site alert that appeared when the mouse hovere over a certain part of the page. Useless, but fun.

As the browser vendors went to war, folks at a company called Macromedia were hard at work building some revolutionary new tools for the web. Macromedia created a number of applications for web designers like Dreamweaver and Fireworks, but Flash was their most remarkable creation. Flash was a tool that enabled designers and web programmers to create websites with sound, animation, and video -- bells and whistles previously unavailable in web browsers. At the heart of Flash was a programming language called [Actionscript, a sister of JavaScript](http://en.wikipedia.org/wiki/ActionScript).

Flash attained widespread adoption, and by the latter half of the 2000s, the Flash plugin was installed on over 99% of desktop web browsers. Flash's success was due in part to the poor performance of JavaScript engines built into the web browsers of the day. In the late nineties and even into the 2000s, a procedure as simple as rendering 50 markers on a map could bring a browser's JavaScript interpreter to its knees. Flash on the other hand made such rendering feats possible, and filled the gap until browser performance could catch up.

When the Mozilla Firefox web browser arrived on the scene in 2004, web enthusiasts rejoiced. Internet Explorer had ruled the browser landscape for nearly a decade, and Firefox promised an end to the tyranny. Firefox was the firsts popular open-source browser, setting an important precedent for the browser landscape of today.

In 2008 Google released Chrome, a fast and lightweight new browser based on the open-source WebKit engine used in Apple's Safari browser. Chrome's initial competitive advantage over Firefox and others was speed: It started up in less time, and loaded web pages faster than other browsers. Since its release, Chrome adoption has steadily increased, and today it's the [most widely used web browser in the world](http://en.wikipedia.org/wiki/Usage_share_of_web_browsers).

Chrome set a new standard for JavaScript performance in the browser, leaving other browser vendors with no choice but to improve their performance too. Chrome got its speed in part from [V8, a JavaScript engine](https://developers.google.com/v8/) that uses nontraditional (and fast) techniques for processing the JavaScript language. With these new gains in performance, web designers and developers are finally able to accomplish the creative things they used to have to do with Flash, but without using proprietary technologies. Now [everthing can be written in JavaScript](http://blog.codinghorror.com/the-principle-of-least-power/).

Shortly after Chrome's release, [someone](http://www.quora.com/Who-is-Ryan-Dahl) had the brilliant idea of putting the V8 engine to broader use. In 2009 Ryan Dahl created Node.js, a tool which enabled JavaScript code to be used in contexts other than the browser, such as web servers, [robots](http://nodebots.io/), and [helicopters](http://nodecopter.com/).

Node.js broadened JavaScript's horizons immensely. Prior to Node's existence, JavaScript was an underdog among programming languages. Most JavaScript code was traditionally written in a house-of-cards style, precariously stacked and hard to maintain. But because Node made it possible to execute JavaScript code outside the browser, people started to create new tools that made it much easier to write, maintain, and share JavaScript code.

When writing new computer programs, programmers rarely start from scratch. A program is typically pieced together using a number of existing code packages, often written by other programmers. Early on in the development of Node, the npm package manager was created by [Isaac Schlueter](http://izs.me/), and quickly became the de facto package manager for Node. npm is a free and open source tool for creating, managing, and publishing JavaScript packages. npm is also a registry of those packages, all freely available for use by anyone hoping to make something cool with JavaScript. As of this writing, the npm registry contains nearly 100,000 packages and the number is growing daily.

Earlier this year, npm raised some capital and [became a private company](http://www.npmjs.com/policies/trademark/) based in Oakland, California. The company will continue to develop and maintain the open-source npm tool and the public registry in perpetuity, but will soon be releasing a commercial version of the registry for individuals and companies wishing to maintain private source code.

What all this means is that after years as an underpowered and [often misunderstood](http://javascript.crockford.com/javascript.html) language, JavaScript's day is finally here. JavaScript developers today have access to powerful tools, a bountiful registry of packages, and a growing worldwide community. The future looks bright.

As for me, I've just joined the team at npm. Today is my first day. I wrote this blog post to help my friends and family better understand what I do for a living. I hope it worked.

:)
