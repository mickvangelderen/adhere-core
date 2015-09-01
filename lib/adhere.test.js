var adhere = require('./adhere')
var expect = require('chai').expect

describe('lib/adhere.js', function() {
	describe('adhere(protocol)', function() {
		function defined(value) {
			if (value === undefined) throw new Error('Expected value to be defined')
			return value
		}

		function otherwiseCopy(copyKey) {
			return function(value, key, container) {
				return value === undefined ? container[copyKey] : value
			}
		}

		function slug(value) {
			value = value.replace(/\s/g, '-').toLowerCase()
			if (!/^[\w\d\-]+$/.test(value)) throw new Error('Expected "' + value + '" to consist of letters numbers and dashes')
			return value
		}

		var post, january2010

		beforeEach(function() {
			post = {
				id: 'aer1kd258ad2b',
				slug: 'my-summer-adventures',
				title: 'My Summer Adventures',
				date: Math.round(new Date()/1000),
				tags: [ 'summer', 'warm', 'luxury' ]
			}

			january2010 = Math.round(new Date('2010-01-01')/1000)

		})

		it('should return the same object for an empty protocol', function() {
			expect(adhere({})(post)).to.deep.equal(post)
		})

		it('should throw an error when the protocol is not an object', function() {
			expect(function() {
				adhere(null)(post)
			}).to.throw('Expected protocol to be an object')
		})

		it('should throw an error when a protocol element is not a function', function() {
			expect(function() {
				adhere({
					id: 1
				})
			}).to.throw('Expected protocol to contain transforms')
		})

		it('should throw an error when a protocol element is not an array of functions', function() {
			expect(function() {
				adhere({
					id: [ 1 ]
				})
			}).to.throw('Expected transform array to contain at least 1 function')
		})

		it('should pass key and container to transforms', function() {
			var validator = adhere({
				slug: [ otherwiseCopy('title'), slug ]
			})

			var originalSlug = post.slug
			post.slug = undefined

			expect(validator(post)).to.have.property('slug').that.equals(originalSlug)
		})
	})
})