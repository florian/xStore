# Changelog

## 1.1.0 / 2013-01-20

This is a maintenance release, with a completely `1.0.x` compatible API. This is meant to be a stable base for later versions.

- loStorage.js is now very well unit tested.
- `storage.increase` / `session.increase` now works like `.add` with a default value of 1. `storage.add` will be removed in `1.2.0`.
- `storage.push` creates an array and pushes if it doesn't exist yet.

## 1.0.3 / 2013-01-20

`storage.all` / `session.all` now unserializes all values, like it says in the documentation.

## 1.0.2 / 2013-01-20

Fix `storage.get` / `session.get` bug. Fallbacks now work correctly.

## 1.0.1 / 2013-01-19

Fix `storage.set` / `session.set` bug when passing in an object.

## 1.0.0 / 2012-05-13

Initial loStorage.js release.