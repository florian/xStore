# xStore [![Build Status](https://travis-ci.org/florian/xStore.png?branch=master)](https://travis-ci.org/florian/xStore)
xStore wraps the HTML5 `localStorage` and `sessionStorage` APIs to provide client-side storage, mainly
targeted at web apps. It allows you to create different data stores that serialize data for you.

In a nutshell:

- It's small: 0.8 KB if minified+gzipped and it doesn't have dependencies
- xStore serializes Booleans, numbers, strings, arrays and plain objects for you
- Chaining support
- It has a [cookie.js](https://github.com/florian/cookie.js) like interface.
- You can choose if your storage should be persistent (`localStorage`) or just for a session (`sessionStorage`)

## Some example code

```javascript
var store = new xStore("prefix", localStorage);
store.set({
  list: [1, 2],
  counter: 1
});

// Later

store.push('list', 3, 4).increase('counter'); // Chaining is awesome

// And read the values:

store.get('list'); // [1, 2, 3, 4]
store.get('counter'); 2
```

## Another micro library for client-side storage?

Yep, there are already some similar libraries out there, but I decided to write my own one because none didn't
really fit my needs. xStore only supports browers that are [somewhat modern](https://github.com/florian/xStore/blob/master/docs/browser-support.md).
Furthermore it has an interface that makes working with client-side storage a breeze.

## Getting started

Read these wiki entries:

- [Getting started](https://github.com/florian/xStore/blob/master/docs/getting-started.md)
- [Documentation](https://github.com/florian/xStore/blob/master/docs/api-documentation.md)
