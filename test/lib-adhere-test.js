process.env.NODE_ENV = 'test';

var expect = require('chai').expect;

var adhere = require('../lib/core');

function defined(value, key, object) {
	if (value === undefined) throw Error('Expected value to be defined');
	return value;
}

function checkPassword(value, index, container) {
	if (value !== container['password']) throw new Error('Expected same passwords');
	return value;
}

function slug(value) {
	value = value.replace(' ', '-').toLowerCase();
	if (!/^[\w\d\-]+$/.test(value)) throw new Error('Expected slug to consist of letters numbers and dashes')
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

});