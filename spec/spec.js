var parse = JSON.parse;

var store = new xStore('', localStorage);
var session = new xStore('', sessionStorage);

describe('xStore localStorage', function () {
	beforeEach(function () {
		store.empty();

		jasmine.addMatchers({
			toHaveLocalValue: function (utils, customEqualityTesters) {
				return {
					compare: function (actual, expected) {
						var notText = this.isNot ? ' not' : '';
						var passed = utils.equals(expected, parse(localStorage.getItem(actual)));
						return {
							pass: passed,
							message: 'Expected ' + expected + notText + ' to be value of ' + actual
						};
					}
				};
			}
		});
	});

	it('should be in the global scope', function () {
		expect(xStore).toBeDefined();
	});

	describe('set', function () {
		it('should be able to set a single value', function () {
			store.set('a', 'b');
			expect('a').toHaveLocalValue('b');
		});

		it('should be able to set multiple values', function () {
			store.set({
				a: 'a',
				b: 'b'
			});

			expect('a').toHaveLocalValue('a');
			expect('b').toHaveLocalValue('b');
		});

		it('should be able to set booleans', function () {
			store.set({
				a: true,
				b: false
			});

			expect('a').toHaveLocalValue(true);
			expect('b').toHaveLocalValue(false);
		});

		it('should be able to set numbers', function () {
			store.set({
				int: 42,
				negative: -42,
				float: 1.5
			});

			expect('int').toHaveLocalValue(42);
			expect('negative').toHaveLocalValue(-42);
			expect('float').toHaveLocalValue(1.5);
		});

		it('should be able to set arrays', function () {
			store.set('array', [1, 2, 3]);
			expect('array').toHaveLocalValue([1, 2, 3]);
		});

		it('should be able to set plain objects', function () {
			store.set('obj', {a: 1, b: 2});
			expect('obj').toHaveLocalValue({a: 1, b: 2});
		});

		it('should return the store object', function () {
			expect(store.set('a', 'b')).toBe(store);
		});

		it('should have the correct prefix', function () {
		  var prefixStore = new xStore('prefix:', localStorage);
		  prefixStore.set('a', 'b');
		  expect(store.get('prefix:a')).toBe('b');
		});
	});

	describe('get', function () {
		it('should return stored value', function () {
			store.set('a', 'b');
			expect(store.get('a')).toEqual('b');
		});

		it('should return the fallback for undefined keys', function () {
			expect(store.get('x', 'fallback')).toEqual('fallback');
		});

		it('should return an object with the correct values when passing in an array', function () {
			store.set('a', 1).set('b', 2);
			expect(store.get(['a', 'b'])).toEqual({a: 1, b: 2});
		});

		it('should accept fallbacks when passing in an array', function () {
			store.set('a', 1);
			expect(store.get(['a', 'b'], 42)).toEqual({a: 1, b: 42});
		});
	});

	describe('all', function () {
		it('should return all available values as an object', function () {
			store.set('a', 1).set('b', 2);
			expect(store.all()).toEqual({a: 1, b: 2});
		});
	});

	describe('remove', function () {
		it('should be able to remove a single key', function () {
			store.set('a', 1).remove('a');
			expect('a' in localStorage).toBe(false);
		});

		it('should be able to remove several keys', function () {
			store.set('a', 1).set('b', 2).remove('a', 'b');
			expect('a' in localStorage).toBe(false);
			expect('b' in localStorage).toBe(false);
		});

		it('should be able to remove several keys in an array', function () {
			store.set('a', 1).set('b', 2).remove(['a', 'b']);
			expect('a' in localStorage).toBe(false);
			expect('b' in localStorage).toBe(false);
		});

		it('should be able to deal with prefixes', function () {
		  var prefixStore = new xStore('prefix:', localStorage);
		  prefixStore.set('a', 'b').remove('a');
		  expect('prefix:a' in localStorage).toBe(false);
		});
	});

	describe('empty', function () {
		it('should remove all values', function () {
			store.set('a', 1).set('b', 2).empty();
			expect(localStorage.length).toBe(0);
		});

		it('should return the parent object', function () {
			expect(store.empty()).toBe(store);
		});
	});

	describe('invert', function () {
		it('should invert the value', function () {
			store.set('bool', true).invert('bool');
			expect('bool').toHaveLocalValue(false);
		});

		it('should return the parent object', function () {
			expect(store.invert('key')).toBe(store);
		});
	});

	describe('add', function () {
		it('should add to the value', function () {
			store.set('n', 40).add('n', 2);
			expect('n').toHaveLocalValue(42);
		});

		it('should return the parent object', function () {
			expect(store.add('key', 5)).toBe(store);
		});
	});

	describe('increase', function () {
		it('should increase the value by 1', function () {
			store.set('n', 40).increase('n');
			expect('n').toHaveLocalValue(41);
		});

		it('should accept a value to increase by', function () {
			store.set('n', 40).increase('n', 2);
			expect('n').toHaveLocalValue(42);
		});

		it('should return the parent object', function () {
			expect(store.increase('key', 5)).toBe(store);
		});
	});

	describe('decrease', function () {
		it('should decrease the value by 1', function () {
			store.set('n', 40).decrease('n');
			expect('n').toHaveLocalValue(39);
		});

		it('should accept a value to decrease by', function () {
			store.set('n', 40).decrease('n', 2);
			expect('n').toHaveLocalValue(38);
		});

		it('should return the parent object', function () {
			expect(store.decrease('key', 5)).toBe(store);
		});
	});

	describe('concat', function () {
		it('should concat the value', function () {
			store.set('str', 'Hello').concat('str', ' World');
			expect('str').toHaveLocalValue('Hello World');
		});

		it('should return the parent object', function () {
			expect(store.concat('key', 'str')).toBe(store);
		});
	});

	describe('push', function () {
		it('should push the value', function () {
			store.set('arr', [1, 2]).push('arr', 3, 4);
			expect('arr').toHaveLocalValue([1, 2, 3, 4]);
		});

		it("should create the array and push if it doesn't exist", function () {
			store.push('list', 1, 2);
			expect('list').toHaveLocalValue([1, 2]);
		});

		it('should return the parent object', function () {
			expect(store.push('key', 1)).toBe(store);
		});
	});

	describe('extend', function () {
		it('should extend the object with the key and value', function () {
			store.set('obj', {a: 1}).extend('obj', 'b', 2);
			expect('obj').toHaveLocalValue({a: 1, b: 2});
		});

		it('should be able to extend with an object', function () {
			store.set('obj', {a: 1}).extend('obj', {b: 2});
			expect('obj').toHaveLocalValue({a: 1, b: 2});
		});

		it("should create the object if it doesn't exist yet", function () {
			store.extend('obj', {a: 1});
			expect('obj').toHaveLocalValue({a: 1});
		});

		it('should return the parent object', function () {
			expect(store.extend('key', 'a', 1)).toBe(store);
		});
	});
});

describe('xStore sessionStorage', function () {
	it('should be operating with sessionstore', function () {
		session.set('a', 'b');
		expect(parse(sessionStorage.getItem('a'))).toBe('b');
	});
});
