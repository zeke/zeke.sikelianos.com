
<!--
title: The Sweet Sensation of Automation
description: A guide to automated npm publishing and GitHub pushing using Heroku
thumbnail_credit: https://www.flickr.com/photos/32281279@N04/5232348119
-->

Last year I created a little npm module called
[all-the-package-names](http://npm.im/all-the-package-names). It's a simple
array of all the existing package names in the npm
registry. It can be used to find if a package name is
[available](https://www.npmjs.com/package/available), or to find all packages
with names [matching a given pattern](https://github.com/zeke/all-the-package-names/blob/2c1964f038c70f08b04482eb68ce3387e257844f/example.js#L12).

Here's a one-liner to try it out:

```sh
npm i -g trymodule && trymodule all-the-package-names
```

This module was easy to create, but it is by nature impossible to keep up to
date, as hundreds of new packages are added to the npm registry every day.

I wanted to remove myself from the publishing equation, so I set up a scheduled
task on Heroku that runs every hour, fetches new names from the registry, commits
changes to git, and publishes to npm. To enable this, I had to figure out how to
securely perform all these operations within the confines of a Heroku dyno:

- Clone a repository from GitHub
- Run a build task using npm scripts
- Commit changes to the git repository
- Publish new package versions to npm
- Push changes to GitHub
- Keep credentials safe and outside the codebase

This post covers the steps required in setting up such an automation scheme.
It is assumed that you have basic working knowledge of Heroku, npm,
and GitHub.

## The Heroku App

```sh
heroku create my-npm-bot
```

Unlike a typical Heroku app, this app doesn't have a `web` process. It doesn't
have a web address and it cant be viewed in a web browser. It's just an app on
a faceless computer in the cloud that will wake up on occasion to do your bidding.

## Heroku Buildpacks

Heroku has these awesome [open source](https://devcenter.heroku.com/articles/buildpacks)
things called buildpacks that give you complete control of your app's build process.
A buildpack
is a script that is executed on your app's code to prepare it to run on
the Heroku platform. When you deploy a Node.js app, for example, Heroku's
[Node buildpack](https://github.com/heroku/heroku-buildpack-nodejs) is used
to download `node` and `npm`, run `npm install`, etc.

In most cases, Heroku users don't need to know about buildpacks at all. Heroku
detects the language or framework of your web app and automatically
chooses the right buildpack for you. But sometimes you need to exercise control
over the app's build process, and that's when buildpacks come in handy.

For the purposes of this app, three buildpacks are required:

- **[zeke/github-buildpack](https://github.com/zeke/github-buildpack)** sets up
a `.netrc` file to store GitHub credentials.
- **[zeke/npm-buildpack](https://github.com/zeke/npm-buildpack)** sets up a
`.npmrc` file to store npm credentials.
- **[heroku/nodejs](https://github.com/heroku/heroku-buildpack-nodejs)** installs
node and npm, which we'll use in our release script.

To add these three buildpacks to your app, run the following commands:

```sh
heroku buildpacks:add -i 1 https://github.com/zeke/github-buildpack
heroku buildpacks:add -i 2 https://github.com/zeke/npm-buildpack
heroku buildpacks:add -i 3 heroku/nodejs
```

The `i` stands for `index`, allowing you to specify the order in which the
buildpacks are executed. In many cases this order is important, but for our
purposes the order probably doesn't matter, as none of these buildpacks are
relying on functionality or build artifacts from another.

## GitHub Authentication

GitHub provides a [simple web interface](https://github.com/settings/tokens/new)
for creating auth tokens.
[Create a token](https://github.com/settings/tokens/new) with `repo` access,
then add it to your Heroku app's config:  

```sh
heroku config:set GITHUB_AUTH_TOKEN=YOUR_TOKEN
```

The next time you push your app to Heroku, the [GitHub buildpack](https://github.com/zeke/github-buildpack)
you just added will
detect the presence of `GITHUB_AUTH_TOKEN` in your app's environment, and use
it to create a `.netrc` file.

## The .netrc File

`~/.netrc` is a plaintext file used to store credentials for accessing
remote machines. It's an [old school unix thing](https://www.gnu.org/software/inetutils/manual/html_node/The-_002enetrc-file.html),
so it's widely supported by tools like `curl`, `git`, and the [heroku toolbelt](https://devcenter.heroku.com/articles/heroku-command#logging-in),

Here's what an entry for GitHub looks like:

```
machine github.com login YOUR_TOKEN password x-oauth-basic
```

If you pass the `--netrc` flag to `curl` (or `-n` for short), it will automatically read credentials
from your `~/.netrc` file, allowing you to easily make authenticated requests:

```sh
curl -n https://api.heroku.com/apps
curl -n https://api.github.com/users/zeke/repos
```

Now that the GitHub credentials are securely stored, `git` commands like
`git push` will be automatically authenticated.

## npm Authentication

npm doesn't have a fancy web interface for creating tokens, nor does it support
the `.netrc` format. It is possible, however, to find your personal token by
looking in the `.npmrc` file in your home directory.

Here's a one-liner for reading that token:

```sh
cat ~/.npmrc | head -1 | sed 's/.*=//g'
```

Add the token to your Heroku app's config:

```sh
heroku config:set NPM_AUTH_TOKEN=YOUR_TOKEN
```

Like the GitHub buildpack, the [npm buildpack](https://github.com/zeke/npm-buildpack)
will detect the `NPM_AUTH_TOKEN` environment variable and use it to write a
`.npmrc` file into the app directory. Any `npm` commands that require authentication
(like `publish` and `whoami`) will now be authenticated automatically when they
are run within the app directory.

## Testing in a Remote Bash Shell

To figure out if everything's working, deploy your app:

```sh
git commit --allow-empty "testing npm and github auth"
git push heroku master
```

Then open up a remote bash shell containing your app's code and environment:

```sh
heroku run bash
cat ./npmrc
cat ./netrc
```

If everything is configured properly, you'll see your credentials in the
`.netrc` and `.npmrc` files, and you should be able to run authenticated
commands like `npm whoami` and `git push`.

Tip: If you try to `git push` your app to Heroku and get an "Everything up to date"
message from git, it's because nothing in your source code has changed. To
force-push the repo to Heroku, create an empty commit:

```sh
git commit --allow-empty -m "empty commit"
git push heroku master
```

## The Release Script

Once the authentication is set up, the next step is to write a release
script to be executed periodically on Heroku.

```sh
mkdir -p scripts
touch scripts/release
chmod +x scripts/release
```

Next, add the release script to `package.json`, so it can be executed as an
npm script:

```json
{
  "name": "all-the-package-names",
  "scripts": {
    "release": "scripts/release"
  }
}
```

Here's a simplified version of the release script used by
`all-the-package-names`. For the full script, check out [scripts/release on the GitHub repo](https://github.com/zeke/all-the-package-names/blob/master/scripts/release).

```
#!/usr/bin/env bash

set -x            # print each command before execution
set -o errexit    # always exit on error
set -o pipefail   # don't ignore exit codes when piping output
set -o nounset    # fail on unset variables

# set up the repo
git clone https://github.com/zeke/all-the-package-names
cd all-the-package-names
npm run build
npm test

# bail if no changes are present
[[ `git status --porcelain` ]] || exit

count=$(cat names.json | wc -l)
git add names.json
git config user.email "zeke@sikelianos.com"
git config user.name "Zeke Sikelianos"
git commit -m "$count package names"
npm version minor -m "bump minor to %s"
npm publish
git push origin master --follow-tags

# clean up
cd ..
rm -rf all-the-package-names
```

Tip: Heroku's node buildpack will install `dependencies` from package.json
by default. If your build script requires `devDependencies` to be installed too,
set the following in your app environment:

```sh
heroku config:set NPM_CONFIG_PRODUCTION=false
```

There are a few ways to manually test a script on Heroku.
You can run it remotely:

```sh
heroku run npm run release
```

or you can shell into your app and run one-off commands inside the shell:


```sh
heroku run bash
npm run release
```

## Scheduling Automatic Releases

Once you've got a working release script, it's time to automate!

Heroku has a very useful (and free) add-on called [Scheduler](https://scheduler.heroku.com/)
that allows you to configure one-off tasks to run against your app. There's a
web-based GUI for scheduling tasks, and they can be run every ten minutes, every
hour, or once a day. It's like [cron](https://en.wikipedia.org/wiki/Cron), but
much easier to use.

To install and open Scheduler:

```sh
heroku addons:create scheduler
heroku addons:open scheduler
```

The scheduler interface is pretty simple. You specify a command to run
and the frequency at which to run it.

<figure>
  <a href="https://devcenter.heroku.com/articles/scheduler">
    <img src="/npm-and-github-automation-with-heroku/scheduler.png" alt="Heroku Scheduler UI" />
  </a>
</figure>

## It's Free!

From the Heroku docs on [Dyno Sleeping](https://devcenter.heroku.com/articles/dyno-sleeping):

> Free dynos will sleep when a web dyno receives no web traffic for a period of time. In addition, if a free dyno exceeds a quota of 18 hours of activity during a 24 hour window, it will be forced to recharge.

This means you get 18 hours of compute time per day **for free**! And because
this app doesn't have a `web` process, it only needs to be "awake" for a few
minutes a day for the short amount of time required to run the release task
every hour.

Even for apps with long-running tasks at shorter intervals,
the free dyno would still probably be adequate. A task that runs every 10 minutes
and takes 5 minutes to complete only amounts to 12 hours of compute time per day,
which is still under the 18 hour limit.

If your build process takes a long time or needs to run more frequently,
a [hobby dyno](https://www.heroku.com/pricing) is adequate for most tasks
and will only set you back $7 a month.

## Sit Back and Watch

Once your automated publishing workflow is finished, you can kick back and let
the machines do the work, then watch your contribution graph turn a very dark
shade of green...

<figure>
  <a href="https://github.com/search?utf8=%E2%9C%93&q=%40zeke">
    <img src="/npm-and-github-automation-with-heroku/contributions.png" alt="GitHub Contributions" />
  </a>
</figure>
