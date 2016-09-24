# xStore–client-side storage the way it should be [![Build Status](https://travis-ci.org/florian/xStore.png?branch=master)](https://travis-ci.org/florian/xStore)
xStore uses the HTML5 `localStorage` and `sessionStorage` APIs to provide a persistant client-side storage, mainly
targeted at web apps.
It has a [cookie.js](https://github.com/florian/cookie.js) like interface. Some facts:

- The minified version is 2.0 KiB large, 0.8 KB if minified and gzipped.
- It has no dependencies.
- You can store any kind of data with xStore: Booleans, numbers, strings, arrays and plain objects. With the
usual `localStorage` you can just read strings.
- xStore supports chaining.

## Some example code

```javascript
var store = new xStore("prefix", localStorage);
store.set({
  list: [1, 2],
  counter: 1
});

// Later

store.push('list', 3, 4).increase(counter); // Chaining is awesome

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
