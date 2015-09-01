var clone = require('./clone')
var expect = require('chai').expect
var types = require('../test/types')

describe('lib/clone.js', function() {
	describe('clone(value)', function() {
		types.filter(function(type) {
				return !(type.isObject || type.isArray || type.isDate || type.isRegex)
		}).forEach(function(type) {
			it('should clone ' + type.name + ' directly', function() {
				expect(clone(type.value)).to.deep.equal(type.value)
			})
		})

		it('should clone shallow objects', function() {
			var o = { a: 1, b: new Date() }
			var c = clone(o)
			expect(c).to.deep.equal(o)
			expect(c).to.not.equal(o)
		})

		it('should clone shallow arrays', function() {
			var o = [ 1, new Date() ]
			var c = clone(o)
			expect(c).to.deep.equal(o)
			expect(c).to.not.equal(o)
		})

		it('should clone dates', function() {
			var o = new Date()
			var c = clone(o)
			expect(+c).to.equal(+o)
			expect(c).to.not.equal(o)
		})

		it('should clone regular expressions', function() {
			var o = /a/g
			var c = clone(o)
			expect(c.source).to.equal(o.source)
			expect(c.global).to.equal(o.global)
			expect(c.ignoreCase).to.equal(o.ignoreCase)
			expect(c.multiline).to.equal(o.multiline)
			expect(c.sticky).to.equal(o.sticky)
			expect(c.unicode).to.equal(o.unicode)
			expect(c).to.not.equal(o)
		})

		it('should clone deep objects', function() {
			var o = {
				a: {
					b: [ new Date() ]
				}
			}
			var c = clone(o)
			expect(c).to.deep.equal(o)
			expect(c).to.not.equal(o)
			expect(c.a).to.not.equal(o.a)
			expect(c.a.b).to.not.equal(o.a.b)
		})

		it('should clone deep arrays', function() {
			var o = [{
				b: [ new Date() ]
			}]
			var c = clone(o)
			expect(c).to.deep.equal(o)
			expect(c).to.not.equal(o)
			expect(c[0]).to.not.equal(o[0])
			expect(c[0].b).to.not.equal(o[0].b)
		})

		it('should clone deep circular objects', function() {
			var o = {
				a: {},
				b: {}
			}
			o.a.b = o.b
			o.b.a = o.a
			var c = clone(o)
			expect(c).to.deep.equal(o)
			expect(c.a.b).to.equal(c.b)
			expect(c.b.a).to.equal(c.a)
			expect(c.a.b.a).to.equal(c.b.a.b.a)
			expect(o.a.b).to.equal(o.b)
			expect(o.b.a).to.equal(o.a)
			expect(o.a.b.a).to.equal(o.b.a.b.a)
			expect(c).to.not.equal(o)
			expect(c.a).to.not.equal(o.a)
			expect(c.b).to.not.equal(o.b)
			expect(c.a.b).to.not.equal(o.a.b)
			expect(c.b.a).to.not.equal(o.b.a)
		})

		it('should clone object instances', function() {
			function Level(level) { this.level = level }
			Level.prototype.get = function() { return this.level }

			var o = new Level(42)
			var c = clone(o)

			expect(c).to.deep.equal(o)
			expect(c.get()).to.equal(o.get())
			expect(c).to.be.an.instanceOf(Level)
			expect(o).to.be.an.instanceOf(Level)
			expect(c).to.not.equal(o)
		})

		it('should clone object prototypes', function() {
			function Level(level) { this.level = level }
			Level.prototype.get = function() { return this.level }

			var o = new Level(42)
			var c = clone(o)

			expect(c).to.deep.equal(o)
			expect(Object.getPrototypeOf(c)).to.equal(Level.prototype)
		})

		it('should only copy owned properties', function() {
			function Level(level) { this.level = level }
			Level.prototype.get = function() { return this.level }

			var o = new Level(42)
			var c = clone(o)

			expect(c).to.have.property('get').that.is.a('function')
			expect(c).to.not.have.ownProperty('get')
		})
	})
})