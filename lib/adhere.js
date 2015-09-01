var is = require('./is')
var pipe = require('./pipe')

module.exports = adhere

function adhere(protocol) {
	if (!is.object(protocol)) throw new Error('Expected protocol to be an object')

	// Check the properties of the protocol.
	var _protocol = Object.create(null)
	for (var key in protocol) {
		if (!protocol.hasOwnProperty(key)) continue
		var transform = protocol[key]
		if (is.function(transform))
			_protocol[key] = transform
		else if (is.array(transform))
			_protocol[key] = pipe(transform)
		else
			throw new Error('Expected protocol to contain transforms')
	}

	return function(value) {
		if (!is.object(value)) throw new Error('Expected value to be an object')

		// Create an object to store transform results temporarily.
		var results = Object.create(null)

		// Copy transformed data into results first.
		for (var key in _protocol) {
			var transform = _protocol[key]
			results[key] = transform(value[key], key, value)
		}

		// Apply all transforms "at the same time".
		for (var key in results) value[key] = results[key]

		return value
	}
}
