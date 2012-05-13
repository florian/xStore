# lostorage.js–client-side storage the way it should be

lostorage.js uses the HTML5 `localStorage` and `sessionStorage` APIs to provide a persistant client-side storage, 
it has a [cookie.js](https://github.com/js-coder/cookie.js) like interface. Some facts:

- The minified version is 1.5 KiB large, just 0.8 KiB if minified and gzipped.
- lostorage.js is released under the [MIT/X11](https://github.com/js-coder/lostorage.js/blob/master/license) license.
- It has no dependencies.

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