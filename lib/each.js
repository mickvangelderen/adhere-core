var is = require('./is')
var pipe = require('./pipe')

module.exports = function each(transform) {
	if (is.array(transform)) return pipe(transform.map(_each))
	return _each(transform)
}

function _each(transform) {
	if (!is.function(transform)) throw new Error('Expected transform to be a function')
	return function(value) {
		if (!is.array(value)) throw new Error('Expected value to be an array')
		return value.map(transform)
	}
}
