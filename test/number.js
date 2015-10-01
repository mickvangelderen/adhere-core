module.exports = function number(value) {
	if (typeof value === 'number') return value
	throw new Error('Expected ' + JSON.stringify(value) + ' to be a number')
}
