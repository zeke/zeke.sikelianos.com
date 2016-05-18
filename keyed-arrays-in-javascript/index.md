<!--
title: Objecty Arrays in JavaScript
description: Can we have our cake and eat it too?
keywords: [javascript]
-->

<figure>
  <img src="/keyed-arrays-in-javascript/arrays-vs-objects.svg">
</figure>

A question often comes up for me when I'm designing a JavaScript or JSON data structure: "Should I use an Array or an Object for this?" Sometimes the answer is obvious. Sometimes it's hard to know which is better.

This short post proposes One Weird Trick™ for adding a bit of sugar to Arrays, using plain old JavaScript.

## The Data

Imagine you're building a JSON webservice that will return a collection of people. Each person is an object:

```js
{
  id: 'bob',
  name: 'Bob',
  isCool: false
}
```

## Approach #1: 'Array' Style

You could structure the JSON response as an array:

```js
people = [
  {id: 'bob', name: 'Bob', isCool: false},
  {id: 'sue', name: 'Sue', isCool: false},
  {id: 'hal', name: 'Hal', isCool: true},
  {id: 'ann', name: 'Ann', isCool: true}
]
```

This is nice because [Arrays have lots of   methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) for dealing with collections, like `forEach`, `map`, and `sort`. Gathering up the names of all the cool people is pretty easy:

```js
people
  .filter(person => person.isCool)
  .map(person => person.name)
```

But when you want a person with a specific id, you have to do something like this:

```js
people.find(person => person.id === 'bob')
```

Kind of cumbersome. A simple `people.bob` would be more convenient.

## Approach 2: 'Object' Style

Instead of storing the id in the object, use it as a key:

```js
people = {
  bob: {name: 'Bob', isCool: false},
  sue: {name: 'Sue', isCool: false},
  hal: {name: 'Hal', isCool: true},
  ann: {name: 'Ann', isCool: true}
}
```

The nice thing about this structure is that you can easily access a person if you know their id:

```js
people.bob
```

The drawback of this structure is that it's more cumbersome to iterate over an Object than an Array. The code for fetching the names of cool people now looks like this:

```js
Object.keys(people)
  .filter(id => people[id].isCool)
  .map(id => people[id].name)
```

Not so great.

## Approach 3: The Experimental Hybrid Array

Here's the crazy idea: Use an Array of person objects,
but iterate over it once at load time, assigning a key
for each person's id:

```js
people.forEach(person => people[person.id] = person)
```

This way it's still an array:

```js
Array.isArray(people) // => true
people[0].name        // => Bob
people.length         // => 4
```

But there's now a named key for each person, so content is now addressable by id:

```js
people.bob.isCool     // => true
('sue' in people)     // => true
```

This is kind of the best of both worlds, but there are a few drawbacks. `Object.keys(people).length` is no longer reliable, as it returns both the numeric keys of the array and the named keys we assigned:

```js
Object.keys(people)
// => ['0', '1', '2', '3', 'bob', 'sue', 'hal', 'ann']
```

Also `JSON.stringify` will produce undesirable results. But if those two drawbacks are not important for your use case, this little technique could fit your needs.

If you found this useful, [let me know](mailto:zeke@sikelianos.com). If you think it's a bad idea, [tell me why]((mailto:zeke@sikelianos.com)).
