![Js-JSON-Go banner](https://raw.githubusercontent.com/JG-1202/Js-JSON-GO/main/img/banner.png)

[![codefactor](https://img.shields.io/codefactor/grade/github/JG-1202/Js-Json-Go?color=2e7dcc&logo=codefactor&logoColor=ffffff&style=for-the-badge)](https://www.codefactor.io/repository/github/jg-1202/js-json-go)
[![npmSize](https://img.shields.io/bundlephobia/min/js-json-go?color=2e7dcc&style=for-the-badge)](https://bundlephobia.com/result?p=js-json-go)
[![codecov](https://img.shields.io/codecov/c/github/JG-1202/Js-JSON-GO?color=2e7dcc&logo=codecov&logoColor=ffffff&style=for-the-badge&token=OFQFOTBOZY)](https://codecov.io/gh/JG-1202/Js-JSON-GO)
[![downloads](https://img.shields.io/npm/dw/js-json-go?color=2e7dcc&style=for-the-badge)](https://www.npmjs.com/package/js-json-go)
[![maintainability](https://img.shields.io/codeclimate/maintainability/JG-1202/Js-JSON-GO?color=2e7dcc&logo=code-climate&logoColor=ffffff&style=for-the-badge)](https://codeclimate.com/github/JG-1202/Js-JSON-GO)


Retrieves and constructs values from/into JSON objects. Js-JSON-Go is a lightweight library that offers the ability to query JSON objects to obtain data and use the same query format to build JSON objects. Moreover, the combined effort of getting and setting values on a conditional JSON path allows for translation from a value of one JSON object into another JSON object. Js-JSON-GO offers queries and nested queries with support for simple boolean logic, regular expressions and custom functions.

Try on [RunKit](https://npm.runkit.com/js-json-go) (Node)

## Installation

Use npm to install Js-JSON-Go.

```bash
npm install js-json-go
```

## Usage
All main functions of this library are exported and can be used according to its JSDocs definition.
Besides, two constructors are made available: (1) Json and (2) Map.
Use the Json constructor for (multiple) operations on the same JSON Object/Array.
Use the Map constructor to translate one JSON Object/Array into another JSON Object/Array.

```javascript
const JG = require('js-json-go');
const json = JG.Json(object, settings);
const map = JG.Map(origin, destination, settings);
```

### new JG.Map(origin, destination, settings)
Construct a new JS-JSON-Go Map to map the result of the `origin` object into the `destination` object. Customize it with `settings` that are used for all actions on the map.

#### map.transform(originPath, destinationPath, settings)
Transforms a single value from `originPath` into destination object at `destinationPath`. Use custom `settings` when desired. 

Example:
```javascript
const inputObject = {
    timestamp: '2011-10-05T14:48:00.000Z',
    scans: [
    { barcode: 'abc123', success: true, identifier: 'A' },
    { barcode: 'def456', success: false, identifier: 'B' },
    { barcode: 'ghi789', success: true, identifier: 'C' },
    ],
};
const JsonGo = new JG.Map(inputObject, []);
// transform barcode to serialNumber
JsonGo.transform('scans[*:(scan)].barcode', '[:(scan)].serialNumber');
// only add identifier if success = true
JsonGo.transform('scans[{$.success = true}:(scan)].identifier', '[:(scan)].identifier'); 
// add time from timestamp as new Date().getTime() to every record
JsonGo.transform('timestamp', '[*].time', { formatter(value) { return new Date(value).getTime(); } }); 
const result = JsonGo.export();
/**
[
    { serialNumber: 'abc123', identifier: 'A', time: 1317826080000 },
    { serialNumber: 'def456', time: 1317826080000 },
    { serialNumber: 'ghi789', identifier: 'C', time: 1317826080000 },
]
 */
```

#### map.export
Returns the (modified) JSON `destination` object.


### new JG.Json(object, settings) 
Construct a new JS-JSON-Go Json to query or update a single JSON `object`, customize it with `settings` that are made available for all actions on that JSON `object`.

#### json.getOne(path, settings)
Retrieves single value from objects specified `path`. Use custom `settings` when desired. Returns first element that matches the `path`.

#### json.get(path, settings)
Retrieves values from objects specified `path`. Use custom `settings` when desired. Returns all elements that match the `path`.

#### json.getPath(path, settings)
Similar to `json.get`, but returns the resolved path, rather than the value on that path. Retrieves resolved path from objects specified input `path`. Use custom `settings` when desired. Returns first element that matches the input `path`.

#### json.getPaths(path, settings)
Similar to `json.get`, but returns the resolved paths, rather than the values on these paths. Retrieves all resolved paths from objects specified input `path`. Use custom `settings` when desired. Returns all elements that match the input `path`.

#### json.resolveOne(path, settings)
Combining `json.getOne` and `json.getPath`. Retrieves resolved `path` and `value` from objects specified input `path`. Use custom `settings` when desired. Returns first element that matches the input `path`. Returns an object with resolved `path` and `value` properties.

#### json.resolve(path, settings)
Combining `json.get` and `json.getPaths`. Retrieves all resolved `path` and `value` from objects specified input `path`. Use custom `settings` when desired. Returns all elements that match the input `path`. Output is an array with objects containing resolved `path` and `value` properties.

#### json.setOne(path, value, settings)
Sets single `value` on specified `path`. Use custom `settings` when desired. Sets the first element that matches the `path`.

#### json.set(path, value, settings)
Sets `value` on specified `path`. Use custom `settings` when desired. Sets all elements that matches the `path`.

#### json.chop(chopSize)
Chops an array or object into smaller pieces with a maximum size of `chopSize`.

#### json.export
Returns the (modified) JSON `object`.

### settings for Json and Map constructor
The following `settings` can be passed into the `settings` object:
* `unlinkInputObject`: if set to `true`, the origin `object` will not be altered by any of the operations, default value is `false`.
* `mapIfNotFound`: if set to `true` the query result will always be mapped, even if the query did not return any matches, default value is `false`.
* `ignoreOnTransform`: array of responses from originObject that should not be translated within Map constructors translate functions into destinationObject. Default is `[]`.
* `limit`: maximum number of values that should be resolved. Default is `0` (returning all values that match input path).
* `formatter`: this function is called before returning `get`/`find` result. Input of the function is the resulting value of `get`/`find`. Output of the formatter function will be returned instead of the original value. Formatter will also be called on `transform`. Default is: `(value) => value`.
* `functions`: object with functions that can be called from within query path. KeyName can be called with `$Function(`keyName`)` from query path. Default is: `{}`.

### Js-JSON-Go Path Syntax
Js-JSON-Go refers to a JSON-structure in a similar manner as the bracket and/or dot notation in JavaScript. In principle applies that a dot-notated child refers to a child within an object, and a bracket-notated child to either an object or an array. Moreover, with bracket notation Js-JSON-Go allows to query over all children/elements at the regarding depth. Querying is not limited to its regarding depth, meaning it is allowed to query both parents and children, but also parents and children that contain their own query.

The following syntax can be used (note that this table is reflecting priority, meaning that the upper syntax is dominant over lower syntax):

| Element Syntax                 | Description                                             |
| :----------------------------- | :------------------------------------------------------ |
| `[`element`]`                  | Bracket-notated child                                   |
| `.`element                     | Dot-notated child                                       |
| `["`element`"]`                | Element is considered a single string                   |
| `['`element`']`                | Element is considered a single string                   |
| `[{`element`}]`                | Element is considered a query                           |
| `[xxx:(ref)]`                  | `ref` is considered a reference that can be reused      |

| Custom Syntax                  | Description                                             |
| :----------------------------- | :------------------------------------------------------ |
| `[*]` or `[{*}]` or `[{$all}]` | Wildcard, relates to existing, but unknown element(s)   |
| `[{$end}]`                     | Refers to last element in array                         |
| `[{$append}]`                  | May be used on set to indicate a new element in array   |


A query is considered a logical test of two `path`s or `elements` separated by an `operator`, or a single path / element which will then be tested as `!falsy`. `$Function()` Queries are considered special. Instead of defining a logical test within the query, a function refers to a `functionName`. The corresponding function (passed in the `functions` object of the Json/Map constructor or regarding query (get, set, translate)) is then expected to return a boolean response as result of a custom logical test.

| Query Element Syntax            | Description                                                                                      	 																	|
| :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 	|
| `null`                          | null not surrounded by quotes is considered `null`                                                																		|
| `undefined`                     | undefined not surrounded by quotes is considered `undefined`                                     																	 	|
| `true`                          | true not surrounded by quotes is considered `true`                                                																		|
| `false`                         | false not surrounded by quotes is considered `false`                                              																		|
| `number`                        | a number not surrounded by quotes is considered to be of type number                              																		|
| `"`string`"`                    | Element is considered a to be a string                                                            																		|
| `'`string`'`                    | Element is considered a to be a string                                                            																		|
| `$`path                         | Element relates to JSON location. `$` followed by a path is considered to have its origin at the root of the object                                                                            				|
| `$.`path                        | Element relates to JSON location. `$.` followed by a path is considered to have its origin at the current depth within object                                                                   				|
| `$..`path                       | Element relates to JSON location. `$..` followed by a path is considered to have its origin at the parent of the current depth within object (each additional dot relates to the parent of the corresponding element) 	|
| `$JSON(`stringified JSON`)`     | Element is considered to be a JSON.                                                               																		|
| `$RegExp(`regular expression`)` | Element is considered to be a Regular Expression (be aware some chars need to be escaped using `\`).																		|
| `$Function(`functionName`)`.    | Element is considered to be a function (function name needs to match key of input function object).																		|


| Query Operators | Description                                                             |
| :-------------- | :---------------------------------------------------------------------- |
| `=`             | validates whether first element strict equals second element            |
| `!=`            | validates whether first element does not strict equal second element    |
| `>=`            | validates whether first element greater than or equal to second element |
| `>`             | validates whether first element greater than second element             |
| `<=`            | validates whether first element smaller than or equal to second element |
| `<`             | validates whether first element smaller than second element             |
| `∈` or `@`      | validates whether first element is in subset of second element          |
| `∉` or `!@`     | validates whether first element is in subset of second element          |
| `?`             | test element against regular expression                                 |

#### Use of custom functions
Functions can be passed as additional input in the Json or Map constructor, and/or as input for the specific query on get/set/translate. The input is expected to be an object with functions. The keyName of the function can be called from the query by `$Function(`keyName`)`. The function is called for each element at the corresponding depth. Input for the function is the element that is found, the output is expected to be a boolean, return `true` if the query should be considered a match, or `false` otherwise.


### Examples
Usage will be demonstrated with an example "inputFixture" json file:
```json
{
    "holding": "appleCompany",
    "mainStore": "Amsterdam",
    "stores": [
        {
            "storeName": "Berlin",
            "expensive": 5,
            "items": [
                {
                    "name": "Granny Smith small bag",
                    "price": 3
                },
                {
                    "name": "Granny Smith medium bag",
                    "price": 5
                },
                {
                    "name": "Granny Smith large bag",
                    "price": 6
                },
                {
                    "name": "Fuji small bag",
                    "price": 3.50
                },
                {
                    "name": "Pink Lady small bag",
                    "price": 8
                },
                {
                    "name": "Pink Lady medium bag",
                    "price": 8
                }
            ]
        },
        {
            "storeName": "Amsterdam",
            "expensive": 6,
            "items": [
                {
                    "name": "Pink Lady medium bag",
                    "price": 8,
                    "expensive": true
                },
                {
                    "name": "Pink Lady large bag",
                    "price": 10,
                    "expensive": true
                }
            ]
        },
        {
            "storeName": "Rome",
            "expensive": null,
            "items": []
        }
    ]
}
```


```javascript
const JG = require('js-json-go');
const inputFixture = require('./fixtures/inputFixture.json');

/*
-- use of get will return a single output (first result that complies with input query)
*/
const JsonGo = new JG.Json(inputFixture);
const result1 = JsonGo.getOne('stores[0].storeName'); //'Berlin' -> get storeName from stores with element 0 
const result2 = JsonGo.getOne('stores["0"].storeName'); //undefined -> get storeName from stores with element '0', undefined because stores is not an object wity key '0'
const result3 = JsonGo.getOne('stores[{$end}].storeName'); //'Rome' -> get storeName of last store from stores
const result4 = JsonGo.getOne('stores[{$.storeName = $mainStore}].expensive'); //6 -> get expensive field of store where storeName equals mainStore (derived from origin of object)
const result5 = JsonGo.getOne('stores[{$.storeName = $..mainStore}].expensive'); //6 -> get expensive field of store where storeName equals mainStore (derived from relative location)
const result6 = JsonGo.getOne('stores[{$.items[{$.name = "Pink Lady large bag"}]}].storeName'); //'Amsterdam' -> get storeName of store that has an item with name Pink Lady large bag
const result7 = JsonGo.getOne('stores[{$.items[{$.expensive = true}]}].storeName'); //'Amsterdam' -> get storeName of store that has items where expensive = true (boolean)
const result8 = JsonGo.getOne('stores[{$.items[{$.expensive = "true"}]}].storeName'); //undefined -> get storeName of store that has items where expensive = 'true' (string)


/*
-- use of get will return all things that comply to the query
*/
const JsonGo = new JG.Json(inputFixture);
const result1 = JsonGo.get('stores[0].storeName'); //['Berlin'] -> get storeName from stores with element 0 
const result2 = JsonGo.get('stores["0"].storeName'); //[] -> get storeName from stores with element '0', undefined because stores is not an object wity key '0'
const result3 = JsonGo.get('stores[{$.items[{$.name = "Pink Lady large bag"}]}].storeName'); //['Amsterdam'] -> get storeName of store that has an item with name Pink Lady large bag
const result4 = JsonGo.get('stores[{$.items[{Pink ∈ $.name}]}].storeName'); //['Berlin', 'Amsterdam'] -> get storeName of store that has an item with Pink in its name
const result5 = JsonGo.get('stores[{$.items[{Fuji ∈ $.name}]}].items[{medium ∉ $.name}].name'); //["Granny Smith small bag", "Granny Smith large bag", "Fuji small bag", "Pink Lady small bag"] -> get al item names that do not have 'medium' in its name from stores that have items with 'Fuji' in its name.
const result6 = JsonGo.get(`stores[{$.storeName ∈ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`); //['Berlin'] -> get storeNames of store that has storename in ['Berlin', 'Barcelona']
const result7 = JsonGo.get('stores[{$.storeName ? $RegExp(/.*AMS.*/i)}].storeName'); //['Amsterdam'] -> get storeNames containing case insensitive AMS in its storeName using a regular expression
const functions = {
    customFunction: (element) => {
        if(['Amsterdam', 'Rome'].indexOf(element.storeName) > -1){
            return true;
        }
        return false;
    }
};
const result8 = JsonGo.get('stores[{$Function(customFunction)}].storeName', functions); //['Amsterdam', 'Rome'] -> get storeNames for all elements where customFunction(element) returns true


/*
-- set and setAll will set values on the specified path, using these functions the inputFixture can be generated with the code below
*/
const JsonGo = new JG.Json({});
JsonGo.setOne('holding', 'appleCompany');
JsonGo.setOne('mainStore', 'Amsterdam');
JsonGo.setOne('stores[{$append}].storeName', 'Berlin');
JsonGo.setOne('stores[{$end}].expensive', 5);
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Granny Smith small bag');
JsonGo.setOne('stores[{$end}].items[{$end}].price', 3);
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Granny Smith medium bag');
JsonGo.setOne('stores[{$end}].items[{$end}].price', 5);
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Granny Smith large bag');
JsonGo.setOne('stores[{$end}].items[{$end}].price', 6);
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Fuji small bag');
JsonGo.setOne('stores[{$end}].items[{$end}].price', 3.50);
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Pink Lady small bag');
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Pink Lady medium bag');
JsonGo.setOne('stores[{$append}].storeName', 'Amsterdam');
JsonGo.setOne('stores[{$end}].expensive', 6);
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Pink Lady medium bag');
JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Pink Lady large bag');
JsonGo.setOne('stores[{$end}].items[{$end}].price', 10);
JsonGo.setOne('stores[{$append}].storeName', 'Rome');
JsonGo.setOne('stores[{$end}].expensive', null);
JsonGo.setOne('stores[{$end}].items', []);
JsonGo.set(`stores[{1 = 1}].items[{$.name ∈ $JSON(${JSON.stringify(['Pink Lady medium bag', 'Pink Lady small bag'])})}].price`, 8); //sets price = 8 for all items in all stores where items name is in ['Pink Lady medium bag', 'Pink Lady small bag']
JsonGo.set('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].expensive', true); // sets expensive key/value where price >= expensive field of mainStore
const result = JsonGo.export();


/*
-- translate from one object into another one
*/
const JsonGo = new JG.Map(inputFixture, {});
JsonGo.transform('stores[{$.storeName = Berlin}].items[{$.price >= $stores[{$.storeName = Berlin}].expensive}].name', 'stores[{$append}].expensiveItems'); //get expensive items from Berlin and place into expensiveItems
JsonGo.transform('stores[{$.storeName = Berlin}].items[{$.price < $stores[{$.storeName = Berlin}].expensive}].name', 'stores[{$end}].nonExpensiveItems'); //get non-expensive items from Berlin and place into nonExpensiveItems
const result = JsonGo.export(); //result is: {"stores":[{"expensiveItems":["Granny Smith medium bag","Granny Smith large bag","Pink Lady small bag","Pink Lady medium bag"],"nonExpensiveItems":["Granny Smith small bag","Fuji small bag"]}]}
```

## Performance
The querying performance of this library is tested with some simple queries on 3 datasets of different sizes using the "json-querying-performance-testing" library of andykais (https://github.com/andykais/json-querying-performance-testing) and compared to different libraries that also facilitate JSON querying.
Shallow: `features[*].properties`
Deep: `features[*].properties.BLOCK_NUM`
Conditional: `features[{$.properties.STREET = UNKNOWN}].properties.BLOCK_NUM`

Summary (tested with Js-JSON-Go version 1.0.0 on 2,9 GHz Dual-Core Intel Core i5):


smallCityLots

|      (index)      |      shallow      |       deep        |    conditional    |
| :---------------- | :---------------- | :---------------- | :---------------- |
│    json-query     │      0.0112       │      0.0162       │      0.0205       │
│   jsonpath-plus   │      0.8449       │      0.4725       │       0.311       │
│     jsonpath      │      1.0833       │      7.9322       │      0.0239       │
│    JSONStream     │      2.5622       │      2.9156       │  'not possible'   │
│       oboe        │      4.2289       │       4.819       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
|                   |                   |                   |                   |
│    js-json-go     │      0.2307       │      0.3229       │      0.5133       │

mediumCityLots
|      (index)      |      shallow      |       deep        |    conditional    |
| :---------------- | :---------------- | :---------------- | :---------------- |
│    json-query     │      0.0169       │      0.0287       │      0.0268       │
│   jsonpath-plus   │      1.2109       │      1.1099       │      0.6319       │
│     jsonpath      │      2.4078       │      38.6892      │      0.0502       │
│    JSONStream     │      6.2154       │      6.0155       │  'not possible'   │
│       oboe        │      9.5313       │      9.9939       │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
|                   |                   |                   |                   |
│    js-json-go     │      0.1888       │      0.1681       │      0.4447       │

largeCityLots

|      (index)      |      shallow      |       deep        |    conditional    |
| :---------------- | :---------------- | :---------------- | :---------------- |
│    json-query     │     'failed'      │     'failed'      │     'failed'      │
│   jsonpath-plus   │      3.5187       │      3.4389       │      1.4037       │
│     jsonpath      │      7.0401       │     166.0362      │      0.1226       │
│    JSONStream     │      16.6928      │      17.3235      │  'not possible'   │
│       oboe        │      26.2005      │      31.8993      │  'not possible'   │
│ map-filter-reduce │ 'not implemented' │ 'not implemented' │ 'not implemented' │
|                   |                   |                   |                   |
│    js-json-go     │      1.0888       │      0.8577       │      1.1567       │


## Testing
Tests can be ran using the following command:
```bash
npm run test
```
Current code coverage (20 suites, 183 tests) is about 95-100%.

## Contributing
Pull requests are welcome.
Please make sure to update tests as appropriate.

## License
[MIT](https://opensource.org/licenses/MIT)
