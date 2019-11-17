<!--
title: lodash.chain
description: A thing that makes JavaScript feel more like Ruby, in a good way.
website: https://lodash.com/docs/4.17.4#chain
publish_date: 2017-08-14
-->

If you're a JavaScript developer in 2017, you've probably already heard of 
[lodash](https://lodash.com). If not though, it's a collection of 
300-ish utility functions that exist to
fill gaps in JavaScript's relatively small [standard library](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
lodash is one of the most popular packages in the npm registry, and is depended 
on by over [25,000 other modules](ghub.io/dependent-packages) in the registry.

JavaScript's 
[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) 
object has some really useful methods for working with 
collections of data, like `forEach`, `map`, `reduce`, `every`, and `filter`.
These methods are often good enough, but `chain`
can make working with collections even sweeter.

Let's take a contrived example. Say you have an array of user objects, and 
you want to get the email addresses of all active users, sorted by the date 
they signed up. Let's also say that some users don't have email addresses,
so you want to filter those out.

Using vanilla JavaScript:

```js
users
  .filter(user => user.active === true)
  .sort((a, b) => a.signupDate.localeCompare(b.signupDate))
  .map(user => user.email)
  .filter(names => name && name.length)
```

Using `chain`:

```js
const {chain} = require('lodash')

chain(users)
  .filter('active')
  .orderBy('signupDate')
  .map('email')
  .compact()
  .value()
```

I find that second version is easier to write, and easier to read. 

Note the `value()` call at the end. Remember to always call that last.

A `chain` object works just like a JavaScript array, but with all of
lodash's convenience methods attached to its prototype. A few of my favorites:

- `first` returns the first element in the collection
- `last` returns the last
- `flatten` turns arrays of arrays into one flat array
- `compact` removes falsy values
- `pick` lets you specify which properties you want from each object
- `omit` lets you specify which properties you _don't_ want from each object
- `orderBy` sorts by a property name and optional direction `asc` or `desc`
- `sample` returns a random element
- `shuffle` randomly arranges the values

There are lots of them. See [lodash.com/docs](https://lodash.com/docs).



## Life after Ruby

For many years I was a rubyist. That is, a reader and writer of the Ruby programming
language. I loved the expressiveness and flexibility of  Ruby, and in particular 
I loved its [Enumerable](https://ruby-doc.org/core-2.4.1/Enumerable.html)
module which, like `chain`, provides a bunch of really useful methods for 
working with collections.

When Node.js came along I could tell it was going to be a big deal, but I 
loved Ruby's syntax and really didn't want to let it go. I would have preferred 
to continue writing in Ruby forever, but I couldn't ignore the significance of 
Node.js and the huge effect it was having on JavaScript's growth beyond the 
browser and into new environments like servers and terminals and IOT devices 
and robots.

lodash's `chain` method makes me miss Ruby just a little less. Combined
with JavaScript's newish arrow function syntax, I feel like the language
is really starting to grow up.

## Nota Bene

_Nota Bene_ means "observe carefully" or "take note". I 
[just learned that](https://github.com/electron/electron/pull/10191#issue-247858038).

If you're writing code targeting *browsers* (as opposed to Node) you might want to 
think twice about using `chain`, because it will make your bundle bigger.
lodash publishes standalone packages to npm like `lodash.pick` and 
`lodash.uniq`, but not `chain` because it requires all of lodash.

There are a number of ways to roll your own lodash build, though. See the
[lodash functional programming guide](https://github.com/lodash/lodash/wiki/FP-Guide)
for details.