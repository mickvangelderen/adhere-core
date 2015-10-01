module.exports = pipe

var is = require('./is')
var object = require('./object')

function pipe(transforms) {
	if (is.function(transforms)) return transforms
	if (is.object(transforms)) return object(transforms)
	if (!is.array(transforms)) throw new Error('Expected pipe to be called with a function, an object or an array of functions and objects.')
	
	var _transforms = transforms.map(function(transform) {
		if (is.function(transform)) return transform
		if (is.object(transform)) return object(transform)
		throw new Error('Expected pipe to be called with a function, an object or an array of functions and objects.')
	})
	
	if (_transforms.length === 1) return transforms[0]

	return function(value, key, container) {
		return _transforms.reduce(function(value, transform) {
			return transform(value, key, container)
		}, value)
	}
}
