var is = require('./is')

function cloneRegExp(pattern) {
	return new RegExp(pattern.source,
		(pattern.global     ? 'g' : '') +
		(pattern.ignoreCase ? 'i' : '') +
		(pattern.multiline  ? 'm' : '') +
		(pattern.sticky     ? 'y' : '') +
		(pattern.unicode    ? 'u' : ''))
}

function createObjectWithPrototype(value) {
	try {
		return Object.create(Object.getPrototypeOf(value))
	} catch(error) {
		return {}
	}
}

function _clone(value, originals, copies) {
	function copy(copy) {
		for (var i = 0, l = originals.length; i < l; i++) {
			if (value === originals[i]) return copies[i]
		}
		originals.push(value)
		copies.push(copy)
		var proto = Object.getPrototypeOf(copy)
		for (var key in value) {
			// Skip properties not owned by value.
			if (!value.hasOwnProperty(key)) continue

			// Do not set setters.
			var attr = Object.getOwnPropertyDescriptor(proto)
			if (attr && attr.set) continue

			// Copy property.
			copy[key] = _clone(value[key], originals, copies)
		}
		return copy
	}
	if (is.object(value)) return copy(Object.create(Object.getPrototypeOf(value)))
	if (is.array(value)) return copy([])
	if (is.date(value)) return new Date(value)
	if (is.regexp(value)) return cloneRegExp(value)
	return value
}

module.exports = function clone(value) {
	return value && is.function(value.clone) ? value.clone() : _clone(value, [], [])
}
