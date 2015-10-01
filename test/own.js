module.exports = function own(value, key, object) {
	if (object.hasOwnProperty(key)) return value
	throw new Error('Expected ' + JSON.stringify(object) + ' to have own property ' + key + '.')
}
