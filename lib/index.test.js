var adhere = require('./')
var expect = require('chai').expect

describe('lib/index.js', function() {

	it('should expose array', function() {
		expect(adhere).to.have.ownProperty('array')
		expect(adhere.array).to.be.a('function')
	})

	it('should expose is', function() {
		expect(adhere).to.have.ownProperty('is')
		expect(adhere.is).to.be.an('object')
	})

	it('should expose object', function() {
		expect(adhere).to.have.ownProperty('object')
		expect(adhere.object).to.be.a('function')
	})

	it('should expose pipe', function() {
		expect(adhere).to.have.ownProperty('pipe')
		expect(adhere.pipe).to.be.a('function')
	})

})
