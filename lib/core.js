var is = require('./is');
var compose = require('./compose');

module.exports = adhere;

function adhere(protocol) {
	if (!is.obj(protocol)) throw new Error('Expected protocol to be an object');
	var _protocol = Object.create(null);
	for (var key in protocol) {
		if (!protocol.hasOwnProperty(key)) continue;
		var transform = protocol[key];
		if (is.array(transform))
			_protocol[key] = compose.pipe(transform);
		else if (is.fn(transform))
			_protocol[key] = transform;
		else
			throw new Error('Expected protocol to contain transforms');
	}
	return function(value) {
		if (!is.obj(value)) throw new Error('Expected value to be an object');
		var result = {};
		for (var key in _protocol) {
			var transform = _protocol[key];
			result[key] = transform(value[key], key, value);
		}
		return result;
	}
}
