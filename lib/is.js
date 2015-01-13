var nativeToString = Object.prototype.toString;

var is = module.exports = { create: {} };

is.array = Array.isArray ? Array.isArray : function(value) { return nativeToString.call(value) === '[object Array]'; };

is.fn = function(value) { return nativeToString.call(value) === '[object Function]'; };

is.object = function(value) { return nativeToString.call(value) === '[object Object]'; };