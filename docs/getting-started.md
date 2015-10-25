# Getting started

Download [lostorage.min.js](https://raw.github.com/florian/loStorage.js/blob/master/src/loStorage.min.js) and include it in your HTML document:

```html
<script src="loStorage.min.js"></script>
```
After you included the file you can call all of the methods that are described in the [documentation](https://github.com/florian/lostorage.js/wiki/documentation). loStorage.js will add two objects to your global scope: `storage` and `session`.

- - -

AMD and CommonJS are supported! You'll need to define `storage` and `session` yourself though.

## CommonJS

```js
var loStorage = require('loStorage.js');
var storage = loStorage.storage;
var session = loStorage.session;
```

Using [Component](https://github.com/component/component):

```sh
$ component install florian/loStorage.js
```

Using CoffeeScript:

```coffee
{storage, session} = require('loStorage.js');
```

## AMD

```js
require('loStorage.js', function (loStorage) {
	var storage = loStorage.storage;
	var session = loStorage.session;
});
```
