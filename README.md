[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/BeAnMo/check-mate)

# checkest

##### Simple, composable, dependency free data validator.

The goal of checkest is to provide a uniform way of validating data across JavaScript environments. The basic API was inspired by Meteor's [check](https://docs.meteor.com/api/check.html) package, along with a few ideas pulled from [prop-types](https://github.com/facebook/prop-types).


### Installation

PENDING

### API

`any, any => { passed: boolean, error?: string }`
- check(<data>, <shape>)


##### Basic predicates

`any => boolean`
- isNull
- isUndefined
- isBoolean
    - Strict check for true/false
- isNumber
    - Returns true for integers/floats/BigInts/MAX & MIN_VALUES/Math values (PI, etc...)
- isString
- isArray (alias for Array.isArray)
- isObject
    - Returns true if input is not and Array/null and is typeof 'object'
- isFunction

##### Additional

`RegExp => string => boolean`
- regexpMatch

`...(any => boolean) => any => boolean`
- isOneOf
    - `isOneOf(isString, isNumber)('hi') // true`
    - `isOneOf(isString, isNumber)(BigInt('343434636537573683565635')) // true`
    - `isOneOf(isString, isNumber)(true) // false`

`...any => any => boolean`
- isOneOfValues
    - `isOneOfValues('a', 1, null)(4) // false`
    - `isOneOfValues('a', 1, null)(1) // true`

`(any => boolean) => any => boolean`
- isNonEmpty
    - `isNonEmpty(arr => arr[1] === 2)([1,2,3]) // true`
    - `isNonEmpty(arr => arr[2] === 2)([]) // false`

`(any => boolean) => any => boolean`
- maybe
    - `maybe(isString)('hello') // true`
    - `maybe(isString)() // true`
    - `maybe(isString)(1010) // false`

### Examples

*As Express middleware*
```js
import { check, isString, isNumber, isNonEmpty, regexpMatch } from 'checkest';

const USER_FORM = {
    email: regexpMatch(EMAIL_RX),
    password: isNonEmpty(isString),
    optional: maybe({
        age: isNumber,
        city: isString,
        serialNumber: isNumber
    })
};

const userValidation = (req, res, next)=> {
    const { passed, error } = check(req.body, USER_FORM);

    if(!passed){
        res.json({ error });
    } else {
        next();
    }
}

router.post('/signup', userValidation, (req, res) => {
    // ...
});
```