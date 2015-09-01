var expect = require('chai').expect
var pipe = require('./pipe')

describe('lib/pipe.js', function() {
	describe('pipe(transforms)', function() {
		function fa(value, key, container) {
			expect(value).to.equal('')
			expect(key).to.equal('text')
			expect(container).to.deep.equal({ text: '' })
			return value + 'a'
		}

		function fb(value, key, container) {
			expect(value).to.equal('a')
			expect(key).to.equal('text')
			expect(container).to.deep.equal({ text: '' })
			return value + 'b'
		}

		function fc(value, key, container) {
			expect(value).to.equal('ab')
			expect(key).to.equal('text')
			expect(container).to.deep.equal({ text: '' })
			return value + 'c'
		}

		it('should return the passed function when passing a single function', function() {
			expect(pipe(fa)).to.equal(fa)
		})

		it('should return the only transform if the transform array is of length 1', function() {
			expect(pipe([fa])).to.equal(fa)
		})

		it('should ignore non functions', function() {
			expect(pipe([1, fa])).to.equal(fa)
			expect(pipe([fa, null])).to.equal(fa)
		})

		it('should throw an error when passing something other than a function or an array containing at least 1 function', function() {
			expect(function() {
				pipe(1)
			}).to.throw('Expected a function or an array of functions')

			expect(function() {
				pipe([1])
			}).to.throw('Expected transform array to contain at least 1 function')
		})

		it('should combine two transforms', function() {
			var f = pipe([fa, fb])
			expect(f('', 'text', { text: '' })).to.equal('ab')
		})

		it('should combine more than two transforms', function() {
			var f = pipe([fa, fb, fc])
			expect(f('', 'text', { text: '' })).to.equal('abc')
		})
	})
})