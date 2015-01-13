var is = require('./is');

var compose = module.exports = {};

compose.pipe = function(transforms) {
	if (!is.array(transforms)) throw new Error('Expected an array');
	var l = transforms.length;
	var transforms = transforms.map(function(transform) {
		if (!is.fn(transform)) throw new Error('Expected transforms to be an array of functions');
		return transform;
	});
	return l === 1 ? transforms[0] : function(value, key, container) {
		for (var i = 0; i < l; i++) value = transforms[i](value, key, container);
		return value;
	}
}

compose.each = function(transform) {
	if (is.array(transform)) return compose.pipe(transform.map(compose._each));
	return compose._each(transform);
}

compose._each = function(transform) {
	if (!is.fn(transform)) throw new Error('Expected transform to be a function');
	return function(value) {
		if (!is.array(value)) throw new Error('Expected value to be an array');
		return value.map(transform);
	}
}

compose.safe = function(transform) {
	if (is.array(transform)) transform = compose.pipe(transform);
	return function(value, key, container) {
		try { value = transform(value, key, container); }
		catch (error) { return undefined; }
	}
}