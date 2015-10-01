module.exports = function(value, key, object) {
	return object[(key + 1) % object.length]
}