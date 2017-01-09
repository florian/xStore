# Documentation

## Creating a new data store

When creating a new data store you need to choose two settings:

### Persistent vs session storage

You can choose between persistent (`localStorage`) and session (`sessionStorage`) stores.

```js
var store = new xStore("prefix:", localStorage);
var session = new xStore("user:", sessionStorage);
```

### Prefix

The prefix is used when saving keys. This allows separate stores with different prefixes to save values under the same key.

```js
var user = new xStore("user:", localStorage);
var settings = new xStore("settings:", localStorage);

user.set("a", 1);
settings.set("a", 2);

// Both were saved using localStorage but there's no conflict because of
different prefixes
```

## Chaining

Every method, except `get` and `all`, return their parent object and therefore allow chaining.

```javascript
store.set('key', 'value'); // Returns storage
session.empty(); // Returns session

// Therefore you can use chaining:

store.empty().set('key', 'value').get('key');
```

## store.set / session.set

Everything saved in lostore.js needs a key as an identifier and a value:
```javascript
store.set('key', 'value');
```

The value doesn't have to be a string, as you will see later.

You can also set several data at once:

```javascript
store.set({
  key1: 'value1',
  key2: 'value2'
});
```

## store.get / session.get

Use the `get` method, or its shortcut: `store()` / `session()`, to retrieve values.

```javascript
store.get('key'); // Or: session.get('key')
// Are the same as
store(key'); // Or: session('key')
```

You can also add an fallback if the key doesn't exist or the value is `undefined`:

```javascript
store.get('unknown-key', 'fallback'); // Returns 'fallback if 'unknown-key' wasn't found.
```

To get several keys, simply pass an array of those keys: (This also works with a fallback.)

```javascript
store.get(['key1', 'key2']);
// This will return an object, for example like this:
{
  key1: 'value1',
  key2: 'value2'
}
```

The real strength of lostore.js is the storing and retrieving of other data types, like arrays or objects. Notice
how [chaining](https://github.com/js-coder/lostore.js/wiki/documentation#chaining) is used in the following example.

```javascript
store.set('boolean', true).get('boolean'); // true
store.set('number', 42).get('number'); // 42
store.set('array', [1, 2 ,3]).get('array'); // [1, 2, 3]
store.set('object', { a: 1, b: 2 }).get('object'); // {a: 1, b: 2}
```

## store.all / session.all

Call `store.all` to get all data saved with the `store` object:
```javascript
var store.ata = store.all();
```

## store.remove / session.remove

To remove data, simply call `store.remove` with an array or keys or with each key as one argument:

```javascript
store.remove('key');
store.remove('key1', 'key2');
store.remove(['key1', 'key2']);
```

## store.empty / session.empty

This will remove all of the data that was saved with `store`:

```javascript
store.empty();
```

---

The following methods are just variations of `store.set` / `session.set`.

---

## store.invert / session.invert

If you save a boolean with lostore.js, you can invert it with this method: If the value is `true` it will be changed to `false` and if it was `false` it will be changed to `true`.

```javascript
store.set('isActive', false);
store.get('isActive'); // false

// Later

store.invert('isActive').get('isActive'); // true
// This is just a short way of writing this:
store.set('isActive', !(store.get('isActive')));

```

## store.add / session.add

This will add a number to the saved value:

```javascript
store.set('counter', 2);

// Later

store.add('counter', 5).get('counter'); // 7
```

## store.increase / session.increase

This method works just like `add` but has a default value of 1.

```javascript
store.set('counter', 0);
store.increase('counter').get('counter'); // 1
store.increase('counter', 2).get('counter'); // 3
```

## store.decrease / session.decrease

The `decrease` method does the opposite of `increase`:

```javascript
store.set('counter', 10);
store.decrease('counter').get('counter'); // 9
```

## store.concat / session.concat

This appends a string to a `store` / `session` value:

```javascript
store.set('text', 'Hello');
store.concat('text', ' world').get('text'); // 'Hello world'
```

## store.push / session.push

In my opinion this is one of the most useful methods of lostore.js, it will append as many values as you want to a saved array, just like the `Array.prototype.push` method:

```javascript
store.set('list', [1, 2, 3]);
store.push('list', 4).get('list'); // [1, 2, 3, 4]
store.push('list', 5, 6).get('list'); [1, 2, 3, 4, 5, 6]
```

As you can see you can append as many values as you like.

## store.extend / session.extend

This method is similiar to the `push` method, but for objects:

```javascript
store.set('object', { a: 1 });
store.extend('object', 'b', 2).get('object'); // { a: 1, b: 2 }
```

If you want to add several new fields, you can add an object as the second parameter:

```javascript
store.set('object', { a: 1 });
store.extend('object', { b: 2, c: 3 }).get('object'); // { a: 1, b: 2, c: 3 }
```
