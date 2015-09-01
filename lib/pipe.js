var is = require('./is')

module.exports = function pipe(transforms) {
	if (is.function(transforms)) {
		return transforms
	} else if (is.array(transforms)) {
		transforms = transforms.filter(is.function)
		if (transforms.length === 0) throw new Error('Expected transform array to contain at least 1 function')
		if (transforms.length === 1) return transforms[0]
	} else {
		throw new Error('Expected a function or an array of functions')
	}

	return function(value, key, container) {
		return transforms.reduce(function(value, transform) {
			return transform(value, key, container)
		}, value)
	}
}