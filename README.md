# json-validator

This is a npm package to make validation of jsons more easy.

## Motivation

For developers who use jsons as request body or query it can become cumbersome
to check every field. This package exists for you, the developr, to create a
json template and leave to the program to identify any problems with it.

## Installation

This is a npm package to be used with node.

To install use:

``` bash
npm i json-validator
```

## How to use

To use this package you'll need to create a new validator using a template as
follows:

``` javascript
const jsonVal=require('json-validator')

//create a template with data types

let data={
    Name:"string",
    zip:"any",
    address:{
        street:'string',
        number:'number'
    }
}

let chk=new jsonVal(data);
```

Any datatype currently supported by JS is supported here, if you are not
sure what data type to use just create a template as following:

````javascript
let data={
    Name:typeof "hello",
    zip:"any",
    address:{
        street:'string',
        number:typeof 42
    }
}
````

You can use ''any'' to skip the type validation for the field.


### Methods included

#### validateJSON

To validade a single JSON

````javascript
jsonValidator.validateJSON(object: object, options?: {
    throwError: boolean;
}): [string]
````

#### validateJSONArray

To validade an array of JSONs

```` javascript
jsonValidator.validateJSONArray(array: [object], options?: {
    throwError: boolean;
}): [string]
````

Both methods will validade one json and return an array containing all errors
found as strings, if the throwError in the options is set to true the package
will raise an error with all errors found.

obs: for the array method the object position will also be included in the error

#### Output examples

#### Single object

All single objects examples were made using the following object:

````javascript
let data2={
    Name:"string",
    //zip:400,
    address:{
        street:'string',
        number:400
    }
}
````

##### Single object fail - error thrown

```` javascript
let errors=chk.validateJSON(data2,{throwError:true})

console.log(JSON.stringify(errors));
````

Will output to:

![image](https://user-images.githubusercontent.com/40868024/84578162-1872ce00-ad99-11ea-964d-1a31beafcb54.png)

##### Single object fail - no error thrown

```` javascript
let errors=chk.validateJSON(data2)

console.log(JSON.stringify(errors));
````

Will output to:

![image](https://user-images.githubusercontent.com/40868024/84578233-e2821980-ad99-11ea-9301-d5d1d0436403.png)

---

#### Array of objects

All array objects examples were made using the following array:

```` javascript
let data2={
    Name:"string",
    zip:400,
    address:{
        street:'string',
        number:"400"
    }
}
let data3={
    Name:"string",
    zip:"440",
    address:{
        number:45
    }
}
let data4={
    Name:"string",
    zip:400,
    address:{
    }
}
let datas=[
    data2,
    data3,
    data4
]

````

##### Array object fail - error thrown

```` javascript
let errors=chk.validateJSONArray(datas,{throwError:true})

console.log(JSON.stringify(errors));
````

Will output to:

![image](https://user-images.githubusercontent.com/40868024/84578361-d34f9b80-ad9a-11ea-8ba6-e69437aeea5d.png)

##### Array object fail - no error thrown

```` javascript
let errors=chk.validateJSONArray(datas)

console.log(JSON.stringify(errors));
````

Will output to:

![image](https://user-images.githubusercontent.com/40868024/84578451-b23b7a80-ad9b-11ea-8cb1-93cc10ffa8c9.png)

## Contribute

If you find this package useful and found a bug or have some ideia for it just
head over to the repo and let me know!

## Credits

[Renato fernandes (Me!)](https://github.com/RenatoFernandesTotti)