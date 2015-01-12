var nativeToString = Object.prototype.toString;

var is = module.exports = Object.create(null);

is.array = Array.isArray ? Array.isArray : function(value) { return nativeToString.call(value) === '[object Array]'; };
is.bool = function(value) { return nativeToString.call(value) === '[object Boolean]'; };
is.callable = function(value) { return nativeToString.call(value) === '[object Function]'; };
is.date = function(value) { return nativeToString.call(value) === '[object Date]'; };
is.defined = function(value) { var u; return value === u; };
is.err = function(value) { return nativeToString.call(value) === '[object Error]'; };
is.instance = function(value, constructor) { return value instanceof constructor; };
is.number = function(value) { return nativeToString.call(value) === '[object Number]' && value === value; };
is.obj = function(value) { return nativeToString.call(value) === '[object Object]'; };
is.regex = function(value) { return nativeToString.call(value) === '[object RegExp]'; };
is.string = function(value) { return nativeToString.call(value) === '[object String]'; };
is.symbol = function(value) { return nativeToString.call(value) === '[object Symbol]'; };
