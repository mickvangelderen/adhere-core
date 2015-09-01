var each = require('./each')
var expect = require('chai').expect

describe('lib/each.js', function() {
	describe('each(transform)', function() {
		var fshift = function(value, key, container) {
			return container[(key + 1) % container.length]
		}

		it('should pass key and container', function() {
			var f = each(fshift)
			expect(f([1, 2, 3])).to.deep.equal([2, 3, 1])
		})

		it('should accept an array of transforms', function() {
			var f = each([fshift, fshift])
			expect(f([1, 2, 3])).to.deep.equal([3, 1, 2])
		})
	})
})