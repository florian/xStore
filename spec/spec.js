var parse = JSON.parse;

describe('storage', function () {
	beforeEach(function () {
		storage.empty();

		this.addMatchers({
			toHaveLocalValue: function (expected) {
				var actual = this.actual;
				var notText = this.isNot ? ' not' : '';
				this.message = function () {
					return 'Expected ' + expected + notText + ' to be value of ' + actual;
				}
				return jasmine.getEnv().equals_(expected, parse(localStorage.getItem(actual)));
			}
		});
	});

	it('should be in the global scope', function () {
		expect(storage).toBeDefined();
	});

	describe('set', function () {
		it('should be able to set a single value', function () {
			storage.set('a', 'b');
			expect('a').toHaveLocalValue('b')
		});

		it('should be able to set multiple values', function () {
			storage.set({
				a: 'a',
				b: 'b'
			});

			expect('a').toHaveLocalValue('a');
			expect('b').toHaveLocalValue('b');
		});

		it('should be able to set booleans', function () {
			storage.set({
				a: true,
				b: false
			});

			expect('a').toHaveLocalValue(true)
			expect('b').toHaveLocalValue(false);
		});

		it('should be able to set numbers', function () {
			storage.set({
				int: 42,
				negative: -42,
				float: 1.5
			});

			expect('int').toHaveLocalValue(42);
			expect('negative').toHaveLocalValue(-42);
			expect('float').toHaveLocalValue(1.5);
		});

		it('should be able to set arrays', function () {
			storage.set('array', [1, 2, 3]);
			expect('array').toHaveLocalValue([1, 2, 3]);
		});

		it('should be able to set plain objects', function () {
			storage.set('obj', {a: 1, b: 2});
			expect('obj').toHaveLocalValue({a: 1, b: 2});
		});

		it('should return the storage object', function () {
			expect(storage.set('a', 'b')).toBe(storage);
		});
	});

	describe('get', function () {
		it('should return stored value', function () {
			storage.set('a', 'b');
			expect(storage.get('a')).toEqual('b');
		});

		it('should return the fallback for undefined keys', function () {
			expect(storage.get('x', 'fallback')).toEqual('fallback');
		});

		it('should return an object with the correct values when passing in an array', function () {
			storage.set('a', 1).set('b', 2);
			expect(storage.get(['a', 'b'])).toEqual({a: 1, b: 2});
		});

		it('should accept fallbacks when passing in an array', function () {
			storage.set('a', 1);
			expect(storage.get(['a', 'b'], 42)).toEqual({a: 1, b: 42});
		});
	});

	describe('all', function () {
		it('should return all available values as an object', function () {
			storage.set('a', 1).set('b', 2);
			expect(storage.all()).toEqual({a: 1, b: 2});
		});
	});

	describe('remove', function () {
		it('should be able to remove a single key', function () {
			storage.set('a', 1).remove('a');
			expect('a' in localStorage).toBe(false);
		});

		it('should be able to remove several keys', function () {
			storage.set('a', 1).set('b', 2).remove('a', 'b');
			expect('a' in localStorage).toBe(false);
			expect('b' in localStorage).toBe(false);
		});

		it('should be able to remove several keys in an array', function () {
			storage.set('a', 1).set('b', 2).remove(['a', 'b']);
			expect('a' in localStorage).toBe(false);
			expect('b' in localStorage).toBe(false);
		});
	});

	describe('empty', function () {
		it('should remove all values', function () {
			storage.set('a', 1).set('b', 2).empty();
			expect(localStorage.length).toBe(0);
		});

		it('should return the parent object', function () {
			expect(storage.empty()).toBe(storage);
		});
	});

	describe('invert', function () {
		it('should invert the value', function () {
			storage.set('bool', true).invert('bool');
			expect('bool').toHaveLocalValue(false);
		});

		it('should return the parent object', function () {
			expect(storage.invert('key')).toBe(storage);
		});
	});

	describe('add', function () {
		it('should add to the value', function () {
			storage.set('n', 40).add('n', 2);
			expect('n').toHaveLocalValue(42);
		});

		it('should return the parent object', function () {
			expect(storage.add('key', 5)).toBe(storage);
		});
	});

	describe('increase', function () {
		it('should increase the value by 1', function () {
			storage.set('n', 40).increase('n');
			expect('n').toHaveLocalValue(41);
		});

		it('should accept a value to increase by', function () {
			storage.set('n', 40).increase('n', 2);
			expect('n').toHaveLocalValue(42);
		});

		it('should return the parent object', function () {
			expect(storage.increase('key', 5)).toBe(storage);
		});
	});

	describe('decrease', function () {
		it('should decrease the value by 1', function () {
			storage.set('n', 40).decrease('n');
			expect('n').toHaveLocalValue(39);
		});

		it('should accept a value to decrease by', function () {
			storage.set('n', 40).decrease('n', 2);
			expect('n').toHaveLocalValue(38);
		});

		it('should return the parent object', function () {
			expect(storage.decrease('key', 5)).toBe(storage);
		});
	});

	describe('concat', function () {
		it('should concat the value', function () {
			storage.set('str', 'Hello').concat('str', ' World');
			expect('str').toHaveLocalValue('Hello World');
		});

		it('should return the parent object', function () {
			expect(storage.concat('key', 'str')).toBe(storage);
		});
	});

	describe('push', function () {
		it('should push the value', function () {
			storage.set('arr', [1, 2]).push('arr', 3, 4);
			expect('arr').toHaveLocalValue([1, 2, 3, 4]);
		});

		it("should create the array and push if it doesn't exist", function () {
			storage.push('list', 1, 2);
			expect('list').toHaveLocalValue([1, 2]);
		});

		it('should return the parent object', function () {
			expect(storage.push('key', 1)).toBe(storage);
		});
	});

	describe('extend', function () {
		it('should extend the object with the key and value', function () {
			storage.set('obj', {a: 1}).extend('obj', 'b', 2);
			expect('obj').toHaveLocalValue({a: 1, b: 2});
		});

		it('should be able to extend with an object', function () {
			storage.set('obj', {a: 1}).extend('obj', {b: 2});
			expect('obj').toHaveLocalValue({a: 1, b: 2});
		});

		it("should create the object if it doesn't exist yet", function () {
			storage.extend('obj', {a: 1});
			expect('obj').toHaveLocalValue({a: 1});
		});

		it('should return the parent object', function () {
			expect(storage.extend('key', 'a', 1)).toBe(storage);
		});
	});
});

describe('session', function () {
	it('should be in the global scope', function () {
		expect(session).toBeDefined();
	});

	it('should be operating with sessionStorage', function () {
		session.set('a', 'b');
		expect(parse(sessionStorage.getItem('a'))).toBe('b');
	});
});