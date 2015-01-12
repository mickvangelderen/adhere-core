var is = require('./is');

var validate = module.exports = Object.create(null);

validate.array = function(value) { if (!is.array) throw new Error('Expected value to be an array'); return value; }
validate.bool = function(value) { if (!is.bool) throw new Error('Expected value to be a boolean'); return value; }
validate.callable = function(value) { if (!is.callable) throw new Error('Expected value to be callable'); return value; }
validate.date = function(value) { if (!is.date) throw new Error('Expected value to be a date'); return value; }
validate.defined = function(value) { if (!is.defined) throw new Error('Expected value to be a defined'); return value; }
validate.err = function(value) { if (!is.err) throw new Error('Expected value to be an error'); return value; }
validate.instance = function(value) { if (!is.instance) throw new Error('Expected value to be an instance'); return value; }
validate.number = function(value) { if (!is.number) throw new Error('Expected value to be a number'); return value; }
validate.obj = function(value) { if (!is.obj) throw new Error('Expected value to be an object'); return value; }
validate.regex = function(value) { if (!is.regex) throw new Error('Expected value to be a regex'); return value; }
validate.string = function(value) { if (!is.string) throw new Error('Expected value to be a string'); return value; }
validate.symbol = function(value) { if (!is.symbol) throw new Error('Expected value to be a symbol'); return value; }
