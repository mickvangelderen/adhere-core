var expect = require('chai').expect
var is = require('./is')
var types = require('../test/types')

describe('lib/is.js', function() {
	describe('is.array(value)', function() {
		types.forEach(function(type) {
			it('should' + (type.isArray ? '' : ' not') + ' see ' + type.name + ' as an array', function() {
				expect(is.array(type.value)).to.equal(type.isArray || false)
			})
		})
	})

	describe('is.function(value)', function() {
		types.forEach(function(type) {
			it('should' + (type.isFunction ? '' : ' not') + ' see ' + type.name + ' as a function', function() {
				expect(is.function(type.value)).to.equal(type.isFunction || false)
			})
		})
	})

	describe('is.object(value)', function() {
		types.forEach(function(type) {
			it('should' + (type.isObject ? '' : ' not') + ' see ' + type.name + ' as an object', function() {
				expect(is.object(type.value)).to.equal(type.isObject || false)
			})
		})
	})
})
