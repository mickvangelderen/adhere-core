Note: This is the core version of adhere. It contains only the essentials making it easy to understand what adhere does. 

Check out the [common version](https://www.npmjs.com/package/adhere-common) of adhere. It contains functions your are likely to need in your projects. 

## What?

Adhere in essence allows you to compose filters. As you will see in the examples, this can be very powerful. Adhere also allows you to provide [default values](#defaults) or [coerce objects](#coercion). 

## Basics

Lets say we have a data object that looks like this:

```js
var person = {
    name: 'Mick',
    tags: [ 'energetic', 'gamer' ],
    address: {
        street: 'Christiaan Huygenslaan',
        number: 5916
    }
}
```

We would like to validate this object. So we would normally write a function:

```js
function validatePerson(person) {
    if (person.hasOwnProperty('name') === false) {
        throw new Error('Expected person to have property name')
    }
    if (typeof person.name !== 'string') {
        throw new Error('Expected person.name to be a string')
    }
    if (person.hasOwnProperty('tags') === false) {
        throw new Error('Expected person to have property tags')
    }
    if (is.array(person.tags) === false) {
        throw new Error('Expected person.tags to be an array')
    }
    person.tags.forEach(function(tag) {
        if (typeof tag !== string) {
            throw new Error('Expected tag to be a string')
        }
    })
    // and so on ...
}
```

You can already see that there will be a lot of duplicate code which creates a nice environment for copy-paste and other bugs. How would we solve this with adhere? We write small [transforms](#transforms) that do a small portion of validation for us, similarly to many assertion libraries. 

```js
var adhere = require('adhere-core')

// A transform that throws an error when it does not receive a string. 
function string(value) {
    if (typeof value === 'string') return value
    throw new Error('Expected a string')
}

// A transform that throws an error when it does not receive a number. 
function number(value) {
    if (typeof value === 'number') return value
    throw new Error('Expected a number')
}

// Create person transform using adhere's functions. 
var validatePerson = adhere.object({
    name: string,
    tags: adhere.array(string),
    address: adhere.object({
        street: string,
        number: number
    })
})

// Execute the new validation function. 
console.log(validatePerson({
    name: 'Mick',
    tags: [ 'energetic', 'gamer' ],
    address: {
        street: 'Christiaan Huygenslaan',
        number: 5916
    }
})) // Will log the object after having passed through all the transforms. 
```

We have now used both `adhere.object` and `adhere.array`. 

The function `adhere.object` allows you to create a filter for an object. In this case we create a [transform](#transforms) that expects an object with three properties: 'name', 'tags' and 'address'. These properties are validated using the basic `string` and `number` [transforms](#transforms) and the composed [transforms](#transforms) (using `adhere.array` and `adhere.object` in this case). 

The function `adhere.array` returns a [transform](#transforms) that maps each item in the to-be-validated-array using the passed [transform](#transforms). 

The core version of adhere supports a third composition function called `pipe`. As you might expect, `pipe` creates a new [transform](#transforms) from a sequence of [transforms](#transforms). The return value of the first [transform](#transforms) is passed second [transform](#transforms). The return value of the second [transform](#transforms) is passed to the third and so on. 

We can use it like so:

```js
var adhere = require('adhere-core')

function string(value) {
    if (typeof value === 'string') return value
    throw new Error('Expected ' + JSON.stringify(value) + ' to be a string')
}

function number(value) {
    if (typeof value === 'number') return value
    throw new Error('Expected ' + JSON.stringify(value) + ' to be a number')
}

function own(value, key, object) {
    if (object.hasOwnProperty(key)) return value
    throw new Error('Expected ' + JSON.stringify(object) + ' to have own property ' + key + '.')
}

adhere.object({
    name: adhere.pipe([ own, string ]),
    tags: adhere.pipe([ own, adhere.array(string) ]),
    address: adhere.pipe([ own, adhere.object({
        street: adhere.pipe([ own, string ]),
        number: adhere.pipe([ own, number ]),
    })])
})
```

## Improving readability

To improve readability, `adhere.object` and `adhere.pipe` can be called implicitly. The last example can be written as:

```js
adhere.object({
    name: [ own, string ],
    tags: [ own, adhere.array(string) ],
    address: [ own, {
        street: [ own, string ],
        number: [ own, number ]
    }]
})
```

There is less fuss around the things that matter but you need to know what is going on to really understand it. 

## Transforms

By now you might have asked yourself: 'Why don't we use boolean functions as validators?' You mean like this?

```js
function string(value) {
    return typeof value === 'string'
}
```

While it would have been possible for adhere to accept these kinds of functions, it limits the possibilities. Adhere accepts exception based validators of which the return value replaces the passed value. I like to call these functions [transforms](#transforms). With [transforms](#transforms) we can:

1. We can throw informative errors. 
2. We can change the value. 

See the following [transform](#transforms) for example:

```js
function own(value, key, object) {
    if (object.hasOwnProperty(key)) return value
    throw new Error('Expected ' + JSON.stringify(object) + ' to have own property ' + key + '.')
}
```

## Defaults

You could implement default values using a simple [transform](#transforms): 

```js
function def(defaultValue) {
    return function(value, key, object) {
        return typeof value === 'undefined' ? defaultValue : value
    }
}
```

## Coercion

To force a value into an array, you could use the following [transform](#transforms):

```js
function arr(value, key, object) {
    return is.array(value) ? value : [ value ]
}
```
