Note: This is the core version of adhere. It contains only the essentials making it easy to understand what adhere does. 

Check out the [common version](https://www.npmjs.com/package/adhere-common) of adhere. It contains functions your are likely to need in your projects. 

```js
var post = {
    id: '1234abcd',
    title: 'My Summer Adventures',
    tag: 1
};

// Create a contract.
var validator = adhere({
    // The title will be coerced into a string.
    title: coerceString,
    // The tags property is expected to be an array. Each item is coerced into a string and expected to be a tag. 
    tag: [coerceString, expectTag]
});

// Apply the contract to the post object.
validator(post);
// post.id = '1234abcd'
// post.title = 'My Summer Adventures'
// post.tag = '1'

// A function that tests if a given string is considered a tag. 
function expectTag(string) {
    if (!/[a-z0-1]+/.test(string)) throw Exception('Invalid tag.')
    return string
}

// A function that will always output a string. 
function coerceString(value) {
    return '' + value
}
```

Adhere accepts transforms which are just functions of the form:

```js
function identity(value, key, obj) {
    return value
}
```

This means you can normalize your data by returning a different value. To filter erroneous data I recommend to throw exceptions from your transforms. For example:

```js
function expectObject(value, key, obj) {
    if (Object.prototype.toString.call(value) !== '[object Object'])
        throw new Error('Expected an object')
    return value
}
```

