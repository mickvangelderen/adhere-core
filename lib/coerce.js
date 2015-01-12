var is = require('./is');

var nop = function() {};

var coerce = module.exports = {};

coerce.create.otherwise = function(otherwise) {
	return function(value) {
		return is.defined(value) ? value : otherwise;
	}
}

coerce.create.min = function(min) {
	return function(value) {
		value = coerce.number(value);
		return value > min ? value : min;
	}
}

coerce.create.max = function(max) {
	return function(value) {
		value = coerce.number(value);
		return value < max ? value : max;
	}
}

coerce.create.clamp = function(min, max) {
	return function(value) {
		value = coerce.number(value);
		return value > min ? (value < max ? value : max) : min;
	}
}

coerce.array = function(value) {
	return is.array(value) ? value : [ value ];
}

coerce.bool = function(value) {
	return !!value;
}

coerce.fn = function(value) {
	return is.fn(value) ? value : function() { return value; }
}

coerce.nop = function(value) {
	return is.fn(value) ? value : nop;
}

coerce.date = function(value) {
	if (is.date(value)) return value;
	return new Date(value);
}

coerce.dateFromSeconds = function(value) {
	if (is.date(value)) return value;
	if (is.number(value)) return new Date(value * 1000);
	return new Date(value);
}

coerce.seconds = function(value) {
	if (is.date(value)) return Math.round(value / 1000);
	return coerce.number(value);
}

coerce.miliseconds = function(value) {
	if (is.date(value)) return +value;
	return coerce.number(value);
}

coerce.number = function(value) {
	value = +value;
	if (is.nan(value)) throw new Error('Expected value to be a number');
	return value;
}

coerce.error = function(value) {
	return is.error(value) ? value : new Error(value);
}

coerce.string = function(value) {
	if (is.number(value)) return '' + value;
	return value ? '' + value : '';
}