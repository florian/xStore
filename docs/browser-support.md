# Browser support

xStore works in every browser that supports [web storage](http://caniuse.com/namevalue-storage)
and [parsing JSON / serializing to JSON](http://caniuse.com/json). That's pretty much every browser you might want to support except IE6 and 7:

- Internet Explorer 8+
- Mozilla Firefox 3.5+
- Google Chrome 4+
- Safari 4+
- Opera 10.5+

That's a browser share of ~85%. Since xStore targets web apps, that usually don't have to work on 6 years old browsers, I've decided to keep the library small and not to support IE6/7 by default.

---

**You can include these two polyfills to add IE6/7 support:**

- [json2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)
- [(local|session)Storage polyfill](https://gist.github.com/350433)

Be aware that the second polyfill uses cookies as a fallback, that means that you will only be able to store 20 values with a maximum size of 4 KB in IE6/7. You can store data of a size between 5 and 10 MB in the other browsers.
