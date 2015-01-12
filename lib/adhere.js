var is = require('./is');

module.exports = adhere;

function adhere(protocol) {
	if (!is.obj(protocol)) throw new Error('Expected protocol to be an object');
	return function(value) {
		if (!is.obj(value)) throw new Error('Expected value to be an object');
		var result = Object.create(null);
		for (var key in protocol) {
			if (!protocol.hasOwnProperty(key)) continue;
			var validator = protocol[key];
			result[key] = validator(value[key]);
		}
		return result;
	}
}
