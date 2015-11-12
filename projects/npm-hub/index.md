<!--
title: npm-hub
description: A browser extension for serendipitous module discovery
website: http://npmhub.org
keywords: [Node.js, npm, browser extension]
start: 2013-06-20
end: 2013-07-01
-->

npm-hub is a browser extension for Chrome, Safari, and Firefox that helps you discover new np modules while browsing github.com. It notices when you're browsing a repo with a package.json in it. If there are any dependencies or devDependencies listed therein, npm-hub fetches each module's metadata from a CORS-friendly proxy of npmjs.org and displays its right on the github page, just below the README.
