var is = require('./is');

var expect = module.exports = { create: {} };

expect.array = function(value) {
	if (is.array(value)) return value;
	throw new Error('Expected value to be an Array');
}

expect.bool = function(value) {
	if (is.bool(value)) return value;
	throw new Error('Expected value to be a Bool');
}

expect.fn = function(value) {
	if (is.fn(value)) return value;
	throw new Error('Expected value to be a Function');
}

expect.date = function(value) {
	if (is.date(value)) return value;
	throw new Error('Expected value to be a Date');
}

expect.defined = function(value) {
	if (is.defined(value)) return value;
	throw new Error('Expected value to be defined');
}

expect.error = function(value) {
	if (is.error(value)) return value;
	throw new Error('Expected value to be an Error');
}

expect.nan = function(value) {
	if (is.nan(value)) return value;
	throw new Error('Expected value to be NaN');
}

expect.nul = function(value) {
	if (is.nul(value)) return value;
	throw new Error('Expected value to be null');
}

expect.number = function(value) {
	if (is.number(value)) return value;
	throw new Error('Expected value to be a Number');
}

expect.object = function(value) {
	if (is.object(value)) return value;
	throw new Error('Expected value to be an Object');
}

expect.regex = function(value) {
	if (is.regex(value)) return value;
	throw new Error('Expected value to be a RegExp');
}

expect.string = function(value) {
	if (is.string(value)) return value;
	throw new Error('Expected value to be a String');
}

expect.symbol = function(value) {
	if (is.symbol(value)) return value;
	throw new Error('Expected value to be a Symbol');
}
