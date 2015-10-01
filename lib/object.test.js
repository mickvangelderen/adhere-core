var expect = require('chai').expect
var number = require('../test/number')
var object = require('./object')
var array = require('./array')
var own = require('../test/own')
var personGenerator = require('../test/person-generator')
var string = require('../test/string')

describe('lib/object.js', function() {
	describe('object(protocol)', function() {

		var person

		beforeEach(function() {
			person = personGenerator()
		})

		it('should return the same object for an empty protocol', function() {
			expect(object({})(person)).to.deep.equal(personGenerator())
		})

		it('should apply a transform', function() {
			var copy = personGenerator()
			copy.name = copy.name.toUpperCase()
			expect(object({
				name: function(value) { return value.toUpperCase() }
			})(person)).to.deep.equal(copy)
		})

		it('should apply multiple properties', function() {
			var t = object({
				name: string,
				tags: array(string),
				address: object({
					street: string,
					number: number
				})
			})
			expect(t(person)).to.deep.equal(personGenerator())
		})

		it('should utilize pipe on arrays', function() {
			var t = object({
				name: [ own, string ],
				tags: [ own, array(string)],
				address: [ own, object({
					street: [ own, string ],
					number: [ own, number ]
				})]
			})
			expect(t(person)).to.deep.equal(personGenerator())
		})

		it('should utilize object on objects', function() {
			var t = object({
				name: [ own, string ],
				tags: [ own, array(string)],
				address: [ own, {
					street: [ own, string ],
					number: [ own, number ]
				}]
			})
			expect(t(person)).to.deep.equal(personGenerator())
		})

		it('should throw an error when the protocol is not an object', function() {
			expect(function() {
				object(null)
			}).to.throw('Expected protocol to be an object.')
		})

		it('should throw an error when a protocol element is not a function', function() {
			expect(function() {
				object({
					id: 1
				})
			}).to.throw('Expected protocol to contain values that are a function, an object or an array of functions and objects.')
		})

		it('should throw an error when a protocol element is not an array of functions', function() {
			expect(function() {
				object({
					id: [ 1 ]
				})
			}).to.throw('Expected pipe to be called with a function, an object or an array of functions and objects.')
		})

		it('should pass key and container to transforms', function() {
			var v, k, o

			object({
				name: function(value, key, object) {
					v = value
					k = key
					o = object
					return value
				}
			})(person)

			var personCopy = personGenerator()

			expect(v).to.equal(personCopy.name)
			expect(k).to.equal('name')
			expect(o).to.deep.equal(personCopy)
		})

	})
})