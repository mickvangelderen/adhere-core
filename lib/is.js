var nativeToString = Object.prototype.toString;

var is = module.exports = Object.create(null);

is.array = Array.isArray ? Array.isArray : function(value) { return nativeToString.call(value) === '[object Array]'; };
is.fn = function(value) { return nativeToString.call(value) === '[object Function]'; };
is.obj = function(value) { return nativeToString.call(value) === '[object Object]'; };