var nativeToString = Object.prototype.toString;

var is = module.exports = { create: {} };

is.array = Array.isArray ? Array.isArray : function(value) { return nativeToString.call(value) === '[object Array]'; };

is.bool = function(value) { return nativeToString.call(value) === '[object Bool]'; };

is.fn = function(value) { return nativeToString.call(value) === '[object Function]'; };

is.date = function(value) { return nativeToString.call(value) === '[object Date]'; };

is.defined = function(value) { var u; return value !== u; };

is.error = function(value) { return nativeToString.call(value) === '[object Error]'; };

is.nan = function(value) { return value !== value; };

is.nul = function(value) { return value === null; };

is.number = function(value) { return nativeToString.call(value) === '[object Number]' && !is.nan(value); };

is.object = function(value) { return nativeToString.call(value) === '[object Object]'; };

is.regex = function(value) { return nativeToString.call(value) === '[object RegExp]'; };

is.string = function(value) { return nativeToString.call(value) === '[object String]'; };

is.symbol = function(value) { return nativeToString.call(value) === '[object Symbol]'; };
