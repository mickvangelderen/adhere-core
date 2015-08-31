var compose = require('./compose')
var is = require('./is')

module.exports = adhere

function adhere(protocol) {
	if (!is.object(protocol)) throw new Error('Expected protocol to be an object')
	var _protocol = Object.create(null)
	for (var key in protocol) {
		if (!protocol.hasOwnProperty(key)) continue
		var transform = protocol[key]
		if (is.array(transform))
			_protocol[key] = compose.pipe(transform)
		else if (is.fn(transform))
			_protocol[key] = transform
		else
			throw new Error('Expected protocol to contain transforms')
	}
	return function(value) {
		if (!is.object(value)) throw new Error('Expected value to be an object')
		var results = Object.create(null)
		// Copy transformed data into results first.
		for (var key in _protocol) {
			var transform = _protocol[key]
			results[key] = transform(value[key], key, value)
		}
		// Copy it back into the value.
		for (var key in results) {
			value[key] = results[key]
		}
		return results
	}
}
