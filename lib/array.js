module.exports = array

var is = require('./is')
var object = require('./object')
var pipe = require('./pipe')

function array(transform) {
	if (is.array(transform)) return pipe(transform.map(array))
	var _transform
	if (is.function(transform)) _transform = transform
	else if (is.object(transform)) _transform = object(transform)
	else throw new Error('Expected array to be called with a function, an object or an array of functions and objects.')
	return function (value) {
		if (!is.array(value)) throw new Error('Expected value to be an array.')
		return value.map(_transform)
	}
}