var is = require('./is');

var compose = module.exports = Object.create(null);

compose.pipe = function(callbacks) {
	if (!is.array(callbacks)) throw new Error('Expected an array');
	return function(value, index, container) {
		for (var i = 0, l = callbacks.length; i < l; i++) {
			value = callbacks[i](value, index, container);
		}
		return value;
	}
}

compose.map = function(callback) {
	if (!is.callable(callback)) throw new error('Expected callback to be callable');
	return function(value) {
		if (!is.array(value)) throw new Error('Expected an array');
		return value.map(callback);
	}
}

compose.filter = function(callback) {
	if (!is.callable(callback)) throw new error('Expected callback to be callable');
	return function(value) {
		if (!is.array(value)) throw new Error('Expected an array');
		return value.filter(callback);
	}
}