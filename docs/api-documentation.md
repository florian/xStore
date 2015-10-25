# Documentation

## Persistent and session storage

loStorage.js adds the two objects `storage` and `session` to your global scope, both have the same methods, the only difference is that things you save with `session` will be deleted after the browser is closed. Stuff you save with `storage` doesn't have an expiry date.
The following example code will always use `storage` for convenience. Just keep in mind that it will all work with
`session` as well.

## Chaining

Every method, except `get` and `all`, return their parent object and therefore allow chaining.

```javascript
storage.set('key', 'value'); // Returns storage
session.empty(); // Returns session

// Therefore you can use chaining:

storage.empty().set('key', 'value').get('key');
```

## storage.set / session.set

Everything saved in loStorage.js needs a key as an identifier and a value:
```javascript
storage.set('key', 'value');
```

The value doesn't have to be a string, as you will see later.

You can also set several data at once:

```javascript
storage.set({
  key1: 'value1',
  key2: 'value2'
});
```

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

The real strength of loStorage.js is the storing and retrieving of other data types, like arrays or objects. Notice
how [chaining](https://github.com/js-coder/loStorage.js/wiki/documentation#chaining) is used in the following example.

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

---

The following methods are just variations of `storage.set` / `session.set`.

---

## storage.invert / session.invert

If you save a boolean with loStorage.js, you can invert it with this method: If the value is `true` it will be changed to `false` and if it was `false` it will be changed to `true`.

```javascript
storage.set('isActive', false);
storage.get('isActive'); // false

// Later

storage.invert('isActive').get('isActive'); // true
// This is just a short way of writing this:
storage.set('isActive', !(storage.get('isActive')));

```

## storage.add / session.add

This will add a number to the saved value:

```javascript
storage.set('counter', 2);

// Later

storage.add('counter', 5).get('counter'); // 7
```

## storage.increase / session.increase

This method works just like `add` but has a default value of 1.

```javascript
storage.set('counter', 0);
storage.increase('counter').get('counter'); // 1
storage.increase('counter', 2).get('counter'); // 3
```

## storage.decrease / session.decrease

The `decrease` method does the opposite of `increase`:

```javascript
storage.set('counter', 10);
storage.decrease('counter').get('counter'); // 9
```

## storage.concat / session.concat

This appends a string to a `storage` / `session` value:

```javascript
storage.set('text', 'Hello');
storage.concat('text', ' world').get('text'); // 'Hello world'
```

## storage.push / session.push

In my opinion this is one of the most useful methods of loStorage.js, it will append as many values as you want to a saved array, just like the `Array.prototype.push` method:

```javascript
storage.set('list', [1, 2, 3]);
storage.push('list', 4).get('list'); // [1, 2, 3, 4]
storage.push('list', 5, 6).get('list'); [1, 2, 3, 4, 5, 6]
```

As you can see you can append as many values as you like.

## storage.extend / session.extend

This method is similiar to the `push` method, but for objects:

```javascript
storage.set('object', { a: 1 });
storage.extend('object', 'b', 2).get('object'); // { a: 1, b: 2 }
```

If you want to add several new fields, you can add an object as the second parameter:

```javascript
storage.set('object', { a: 1 });
storage.extend('object', { b: 2, c: 3 }).get('object'); // { a: 1, b: 2, c: 3 }
```
