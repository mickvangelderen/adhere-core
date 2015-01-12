var is = require('./is');

var compose = module.exports = Object.create(null);

compose.pipe = function(transforms) {
	if (!is.array(transforms)) throw new Error('Expected an array');
	var l = transforms.length;
	for (var i = 0; i < l; i++) {
		if (!is.fn(transforms[i])) throw new Error('Expected transforms to be an array of functions');
	}
	return l === 1 ? transforms[0] : function(value, key, container) {
		for (var i = 0; i < l; i++) value = transforms[i](value, key, container);
		return value;
	}
}

compose.each = function(transform) {
	if (!is.fn(transform)) throw new Error('Expected transform to be a function');
	return function(value) {
		if (!is.array(value)) throw new Error('Expected value to be an array');
		return value.map(transform);
	}
}

compose.filter = function(transform) {
	if (!is.fn(transform)) throw new Error('Expected transform to be a function');
	return function(value) {
		if (!is.array(value)) throw new Error('Expected value to be an array');
		return value.filter(transform);
	}
}