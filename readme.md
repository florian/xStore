# lostorage.js–client-side storage the way it should be

lostorage.js uses the HTML5 `localStorage` and `sessionStorage` APIs to provide a persistant client-side storage, 
it has a [cookie.js](https://github.com/js-coder/cookie.js) like interface. Some facts:

- The minified version is 1.5 KiB large, just 0.8 KiB if minified and gzipped.
- lostorage.js is released under the [MIT/X11](https://github.com/js-coder/lostorage.js/blob/master/license) license.
- It has no dependencies.
- You can store any kind of data with lostorage.js: Booleans, numbers, strings, arrays and plain objects. With the
usual `localStorage` you can just read strings.
- lostorage.js supports chaining.

## WTF? Another micro library for client-side storage?

Yep, there are already some similar libraries out there, but I decided to write my own one because none didn't
really fit my needs. lostorage.js only supports browers that are somewhat modern. Furthermore it has an interface
that makes working with client-side storage a breeze.

## Browser support

lostorage.js works in every browser that supports [web storage](http://caniuse.com/namevalue-storage) 
and [parsing JSON and serializing to JSON](http://caniuse.com/json). That's pretty much every browser you might
want to support except IE6 and 7:

- Internet Explorer 8+
- Mozilla Firefox 3.5+
- Google Chrome 4+
- Safari 4+
- Opera 10.5+

That's a browser share of ~85%. If you need IE6/7 support, you should use an other library.

---

# Documentation

## Usage

Download [lostorage.min.js](https://raw.github.com/js-coder/lostorage.js/master/lostorage.min.js) and include it in your HTML document:

```html
<script src="cookie.min.js"></script>
```

lostorage.js will add two objects to your global scope: `storage` and `session`.

*Note: AMD support is coming soon.*

## Persistent and session storage

The `storage` and `session` objects both have the same methods, the only difference is that things you save with
`session` will be deleted after the browser is closed. Stuff you save with `storage` doesn't have an expiry date.
The following example code will always use `storage` for convenience. Just keep in mind that it will all work with
`session` as well.

## storage.set / session.set

Everything saved in lostorage.js needs a key as an identifier and a value:
```javascript
storage.set('key', 'value');
```

You can also set several data at once:

```javascript
storage.set({
  key1: 'value1',
  key2: 'value2'
});
```

You can save any kind of data with lostorage.js as you will see later.

## storage.get / session.get

Use the `get` method, or its shortcut: `storage()` / `session()`, to retrieve values.

```javascript
storage.get('key'); // Or: session.get('key')
// Are the same as
storage('key'); // Or: session('key')
```

You can also add an fallback if the key doesn't exist or the value is `undefined`:

```javascript
storage.get('unknown-key', 'fallback'); // Returns 'fallback if 'unknown-key' wasn't found.
```

To get several keys, simply pass an array of those keys: (This also works with a fallback.)

```javascript
storage.get(['key1', 'key2']);
// This will return an object, for example like this:
{
  key1: 'value1',
  key2: 'value2'
}
```

The real strength of lostorage.js is the storing and retrieving of other data types, like arrays or objects. Notice
how the following example uses [chaining](https://github.com/js-coder/lostorage.js#chaining).

```javascript
storage.set('boolean', true).get('boolean'); // true
storage.set('number', 42).get('number'); // 42
storage.set('array', [1, 2 ,3]).get('array'); // [1, 2, 3]
storage.set('object', { a: 1, b: 2 }).get('object'); // {a: 1, b: 2}
```

## storage.all / session.all

Call `storage.all` to get all data saved with the `storage` object:
```javascript
var storageData = storage.all();
```

## storage.remove / session.remove

To remove data, simply call `storage.remove` with an array or keys or with each key as one argument:

```javascript
storage.remove('key');
storage.remove('key1', 'key2');
storage.remove(['key1', 'key2']);
```

## storage.empty / session.empty

This will remove all of the data that was saved with `storage`:

```javascript
storage.empty();
```
