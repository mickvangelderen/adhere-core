module.exports = function string(value) {
	if (typeof value === 'string') return value
	throw new Error('Expected ' + JSON.stringify(value) + ' to be a string')
}
