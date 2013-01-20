# loStorage.js–client-side storage the way it should be [![Build Status](https://travis-ci.org/js-coder/loStorage.js.png?branch=master)](https://travis-ci.org/js-coder/loStorage.js)
loStorage.js uses the HTML5 `localStorage` and `sessionStorage` APIs to provide a persistant client-side storage, mainly
targeted at web apps.
It has a [cookie.js](https://github.com/js-coder/cookie.js) like interface. Some facts:

- The minified version is 2.0 KiB large, 0.8 KB if minified and gzipped.
- It has no dependencies.
- You can store any kind of data with loStorage.js: Booleans, numbers, strings, arrays and plain objects. With the
usual `localStorage` you can just read strings.
- loStorage.js supports chaining.

## Some example code

```javascript
storage.empty().set({ // Chaining is awesome
  list: [1, 2],
  counter: 1
});

// Later

storage.push('list', 3, 4);
storage.increase('counter');

// And read the values:

storage.get('list'); // [1, 2, 3, 4]
storage.get('counter'); 2

```

## WTF? Another micro library for client-side storage?

Yep, there are already some similar libraries out there, but I decided to write my own one because none didn't
really fit my needs. loStorage.js only supports browers that are [somewhat modern](https://github.com/js-coder/loStorage.js/wiki/Browser-support).
Furthermore it has an interface that makes working with client-side storage a breeze.

## Getting started

Read these wiki entries:

- [Getting started](https://github.com/js-coder/loStorage.js/wiki/Getting-started)
- [Documentation](https://github.com/js-coder/loStorage.js/wiki/Documentation)
