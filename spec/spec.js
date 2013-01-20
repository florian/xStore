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
});

describe('session', function () {
	it('should be in the global scope', function () {
		expect(session).toBeDefined();
	});
});