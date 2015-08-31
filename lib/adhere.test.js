var adhere = require('./adhere');
var expect = require('chai').expect;

function defined(value) {
	if (value === undefined) throw new Error('Expected value to be defined');
	return value;
}

function otherwiseCopy(copyKey) {
	return function(value, key, container) {
		return value === undefined ? container[copyKey] : value;
	}
}

function slug(value) {
	value = value.replace(/\s/g, '-').toLowerCase();
	if (!/^[\w\d\-]+$/.test(value)) throw new Error('Expected "' + value + '" to consist of letters numbers and dashes')
	return value;
}

describe('lib/adhere.js', function() {

	var post = {
		id: 'aer1kd258ad2b',
		slug: 'my-summer-adventures',
		title: 'My Summer Adventures',
		date: Math.round(new Date()/1000),
		tags: [ 'summer', 'warm', 'luxury' ]
	};

	var january2010 = Math.round(new Date('2010-01-01')/1000);

	it('should return an empty object for an empty protocol', function() {
		expect(adhere({})(post)).to.deep.equal({});
	});

	it('should throw an error when the protocol is not an object', function() {
		expect(function() {
			adhere(null)(post);
		}).to.throw('Expected protocol to be an object');
	});

	it('should throw an error when a protocol element is not an array of functions or a function', function() {
		expect(function() {
			adhere({ id: 1 })(post);
		}).to.throw('Expected protocol to contain transforms');

		expect(function() {
			adhere({ id: [ function() {}, 1 ] })(post);
		}).to.throw('Expected transforms to be an array of functions');
	});

	it('should leave out properties that are not in the protocol', function() {
		var validator = adhere({
			slug: [ defined, slug ],
			title: defined,
			date: defined
		});

		expect(validator(post)).to.deep.equal({
			slug: post.slug,
			title: post.title,
			date: post.date
		});
	});

	it('should pass key and container to transforms', function() {
		var validator = adhere({
			slug: [ otherwiseCopy('title'), slug ]
		});

		var originalSlug = post.slug;
		post.slug = undefined;

		expect(validator(post)).to.deep.equal({
			slug: originalSlug,
		});
	});

});