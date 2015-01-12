process.env.NODE_ENV = 'test';

var expect = require('chai').expect;

var compose = require('../lib/compose');

describe('lib/compose.js', function() {

	describe('pipe(transforms)', function() {

		function fa(value, key, container) {
			expect(value).to.equal('');
			expect(key).to.equal('text');
			expect(container).to.deep.equal({ text: '' });
			return value + 'a';
		}

		function fb(value, key, container) {
			expect(value).to.equal('a');
			expect(key).to.equal('text');
			expect(container).to.deep.equal({ text: '' });
			return value + 'b';
		}

		function fc(value, key, container) {
			expect(value).to.equal('ab');
			expect(key).to.equal('text');
			expect(container).to.deep.equal({ text: '' });
			return value + 'c';
		}

		it('should return the only transform if the transform array is of length 1', function() {
			var f = compose.pipe([fa]);
			expect(f).to.equal(fa);
		});

		it('should combine two transforms', function() {
			var f = compose.pipe([fa, fb]);
			expect(f('', 'text', { text: '' })).to.equal('ab');
		});

		it('should combine more than two transforms', function() {
			var f = compose.pipe([fa, fb, fc]);
			expect(f('', 'text', { text: '' })).to.equal('abc');
		});

	});

	describe('each(transform)', function() {
		var fshift = function(value, key, container) {
			return container[(key + 1) % container.length];
		};

		it('should pass key and container', function() {
			var f = compose.each(fshift);
			expect(f([1, 2, 3])).to.deep.equal([2, 3, 1]);
		});

		it('should accept an array of transforms', function() {
			var f = compose.pipe([compose.each(fshift), compose.each(fshift)]);
			expect(f([1, 2, 3])).to.deep.equal([3, 1, 2]);
		});
	});

});

