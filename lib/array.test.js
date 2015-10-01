var array = require('./array')
var expect = require('chai').expect
var number = require('../test/number')
var rotate = require('../test/circular-shift')

describe('lib/array.js', function() {
	describe('array(transform)', function() {
		it('should accept a function', function() {
			var t = array(rotate)
			expect(t([1, 2, 3, 4, 5])).to.deep.equal([2, 3, 4, 5, 1])
		})

		it('should accept an array of transforms', function() {
			var t = array([rotate, rotate])
			expect(t([1, 2, 3, 4, 5])).to.deep.equal([3, 4, 5, 1, 2])
		})

		it('should accept an object', function() {
			var t = array({
				number: number
			})
			var v = [1, 2, 3].map(function(n) { return { number: n }; })
			expect(t(v)).to.deep.equal(v)
		})
	})
})