# Adhere

```js
var post = {
    title: 'My Summer Adventures',
    tags: [ 'summer', 'warm', 'luxury' ]
};

// Create a contract.
var validator = adhere({
    // The title will be coerced into a string.
    title: coerceString,
    // The tags property is expected to be an array. Each item is coerced into a string and expected to be a tag. 
    tags: adhere.compose.each([coerceString, expectTag])
});

// A function that tests if a given string is considered a tag. 
function expectTag(string) {
    if (!/[a-z]+/.test(string)) throw Exception('Invalid tag.')
    return string
}

// A function that will always output a string. 
function coerceString(value) {
    return '' + value
}
```

Can be used in browser. Useful for when you are creating an API.  