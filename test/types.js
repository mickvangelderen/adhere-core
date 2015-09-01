module.exports = [
	{
		value: true,
		name: 'true'
	},{
		value: false,
		name: 'false'
	},{
		value: null,
		name: 'null'
	},{
		value: undefined,
		name: 'undefined'
	},{
		value: 1,
		name: '1'
	},{
		value: -1,
		name: '-1'
	},{
		value: 0,
		name: '0'
	},{
		value: -0,
		name: '-0'
	},{
		value: -Infinity,
		name: '-Infinity'
	},{
		value: +Infinity,
		name: '+Infinity'
	},{
		value: NaN,
		name: 'NaN'
	},{
		value: function() {},
		name: 'function() {}',
		isFunction: true
	},{
		value: {},
		name: '{}',
		isObject: true
	},{
		value: new Date(),
		name: 'new Date()',
		isDate: true
	},{
		value: /regexp/,
		name: '/regexp/',
		isRegExp: true
	},{
		value: [],
		name: '[]',
		isArray: true
	},{
		value: '',
		name: "''"
	},{
		value: 'string',
		name: "'string'"
	}
]
