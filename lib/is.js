function generateNativeStringEquals(string) {
	var nativeToString = Object.prototype.toString
	return function(value) {
		return nativeToString.call(value) === string
	}
}

module.exports = {
	array: Array.isArray ? Array.isArray : generateNativeStringEquals('[object Array]'),
	fn: generateNativeStringEquals('[object Function]'),
	object: generateNativeStringEquals('[object Object]')
}