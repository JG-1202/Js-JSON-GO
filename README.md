# Js-JSON-Go

Retreives and constructs values from/into JSON objects. Js-JSON-Go is a lightweight library that offers the ability to query JSON objects to obtain data and use the same query format to build JSON objects. Moreover, the combined effort of getting and setting values on a conditional JSON path allows for translation from a value of one JSON object into another JSON object. Js-JSON-GO offers queries and nested queries with support for simple boolean logic, regular expressions and custom functions.

Try on [RunKit](https://npm.runkit.com/js-json-go) (Node)

## Installation

Use npm to install Js-JSON-Go.

```bash
npm install js-json-go
```

## Usage
All main functions of this library are exported and can be used according to its JSDocs definition.
Besided two constructors are made available: (1) Json and (2) Map.
Use the Json constructor for (multiple) operations on the same JSON Object/Array.
Use the Map constructor to translate one JSON Object/Array into another JSON Object/Array.

```javascript
const JG = require('js-json-go');
const json = JG.Json(object, settings, functions);
const map = JG.Map(origin, destination, settings, functions);
```


### new JG.Json(object, settings, functions) 
Construct a new JS-JSON-Go Json to query or update a single JSON `object`, customize it with `settings` and custom `functions` that are made available for all actions on that JSON `object`.

#### json.get(path, functions)
Retreives single value from objects specified `path`. Pass an object with custom `functions` to make these available for this query. Returns first element that matches the `path`.

#### json.getAll(path, functions)
Retreives all values from objects specified `path`. Pass an object with custom `functions` to make these available for this query. Returns all elemets that match the `path`.

#### json.set(path, value, functions)
Sets single `value` on specified `path`. Pass an object with custom `functions` to make these available for this query. Sets the first element that matches the `path`.

#### json.setAll(path, value, functions)
Sets `value` on specified `path`. Pass an object with custom `functions` to make these available for this query. Sets all elements that matches the `path`.

#### json.chop(chopSize)
Chops an array or object into smaller pieces with a maximum size of `chopSize`.

#### json.export
Returns the (modified) JSON `object`.

### new JG.Map(origin, destination, settings, functions)
Construct a new JS-JSON-Go Map to map the result of the `origin` object into the `destination` object. Customize it with `settings` and custom `functions` that are made available for all actions on the map.

#### map.translate(originPath, destinationPath, functions)
Translate a single value from `originPath` into destination object at `destinationPath`. Pass an object with custom `functions` to make these available for this query. Translation will stop after first match.

#### map.translateAll(originPath, destinationPath, functions)
Translate all values into destination object at `destinationPath`. Destination will be an array with all results from `originPath`. Pass an object with custom `functions` to make these available for this query.

#### map.translateOneToAll(originPath, destinationPath, functions)
Translate single value from `originPath` into destination at `destinationPath`. Pass an object with custom `functions` to make these available for this query. Destination will be the first query result from `originPath`, mapped into all results from `destinationPath` query.

#### map.translateAllToOne(originPath, destinationPath, functions)
Translate all results from `originPath` into first destination object result at `destinationPath`. The single destination will be filled with an array filled with all results from the `originPath` query. Pass an object with custom `functions` to make these available for this query.

#### map.export
Returns the (modified) JSON `destination` object.

### settings for Json and Map constructor
The following `settings` can be passed into the `settings` object:
`unlinkInputObject`: if set to `true`, the origin `object` will not be altered by any of the operations, default value is `false`.
`defaultGetResponse`: default response in case query did not return any matches, by default get returns `undefined` 
`defaultGetAllResponse`: default response in case query did not return any matches, by default getAll returns `[]`.
`fatalErrorOnCreate`: if set to `true` and error will be thrown on set and setAll in case query did not return any matches, default value is `false`.
`mapIfNotFound`: if set to `true` the query result will always be mapped, even if the query did not return any matches, default value is `false`.

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

| Custom Syntax                  | Description                                             |
| :----------------------------- | :------------------------------------------------------ |
| `[*]` or `[{*}]` or `[{$all}]` | Wildcard, relates to existing, but unkown element(s)    |
| `[{$end}]`                     | Refers to last element in array                         |
| `[{$append}]`                  | May be used on set to indicate a new element in array   |


A query is considered a logical test of two `path`s or `elements` seperated by an `operator`, or a single path / element which will then be tested as `!falsy`. `$Function()` Queries are considered special. Instead of defining a logical test within the query, a function refers to a `functionName`. The corresponding function (passed in the `functions` object of the Json/Map constructor or regarding query (get, set, translate)) is then expected to return a boolean response as result of a custom logical test.

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
| `$RegExp(`regular rexpression`)`| Element is considered to be a Regular Expression (be aware some chars need to be escaped using `\`).																		|
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
const result1 = JsonGo.get('stores[0].storeName'); //'Berlin' -> get storename from stores with element 0 
const result2 = JsonGo.get('stores["0"].storeName'); //undefined -> get storename from stores with element '0', undefined because stores is not an object wity key '0'
const result3 = JsonGo.get('stores[{$end}].storeName'); //'Rome' -> get storeName of last store from stores
const result4 = JsonGo.get('stores[{$.storeName = $mainStore}].expensive'); //6 -> get expensive field of store where storeName equals mainStore (derived from origin of object)
const result5 = JsonGo.get('stores[{$.storeName = $..mainStore}].expensive'); //6 -> get expensive field of store where storeName equals mainStore (derived from relative location)
const result6 = JsonGo.get('stores[{$.items[{$.name = "Pink Lady large bag"}]}].storeName'); //'Amsterdam' -> get storeName of store that has an item with name Pink Lady large bag
const result7 = JsonGo.get('stores[{$.items[{$.expensive = true}]}].storeName'); //'Amsterdam' -> get storeName of store that has items where expensive = true (boolean)
const result8 = JsonGo.get('stores[{$.items[{$.expensive = "true"}]}].storeName'); //undefined -> get storeName of store that has items where expensive = 'true' (string)


/*
-- use of getAll will return all things that comply to the query
*/
const JsonGo = new JG.Json(inputFixture);
const result1 = JsonGo.getAll('stores[0].storeName'); //['Berlin'] -> get storename from stores with element 0 
const result2 = JsonGo.getAll('stores["0"].storeName'); //[] -> get storename from stores with element '0', undefined because stores is not an object wity key '0'
const result3 = JsonGo.getAll('stores[{$.items[{$.name = "Pink Lady large bag"}]}].storeName'); //['Amsterdam'] -> get storeName of store that has an item with name Pink Lady large bag
const result4 = JsonGo.getAll('stores[{$.items[{Pink ∈ $.name}]}].storeName'); //['Berlin', 'Amsterdam'] -> get storeName of store that has an item with Pink in its name
const result5 = JsonGo.getAll('stores[{$.items[{Fuji ∈ $.name}]}].items[{medium ∉ $.name}].name'); //["Granny Smith small bag", "Granny Smith large bag", "Fuji small bag", "Pink Lady small bag"] -> get al item names that do not have 'medium' in its name from stores that have items with 'Fuji' in its name.
const result6 = JsonGo.getAll(`stores[{$.storeName ∈ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`); //['Berlin'] -> get storeNames of store that has storename in ['Berlin', 'Barcelona']
const result7 = JsonGo.getAll('stores[{$.storeName ? $RegExp(/.*AMS.*/i)}].storeName'); //['Amsterdam'] -> get storeNames containing case insensitive AMS in its storeName using a regular expression
const functions = {
    customFunction: (element) => {
        if(['Amsterdam', 'Rome'].indexOf(element.storeName) > -1){
            return true;
        }
        return false;
    }
};
const result8 = JsonGo.getAll('stores[{$Function(customFunction)}].storeName', functions); //['Amsterdam', 'Rome'] -> get storeNames for all elements where customFunction(element) returns true


/*
-- set and setAll will set values on the specified path, using these functions the inputFixture can be generated with the code below
*/
const JsonGo = new JG.Json({});
JsonGo.set('holding', 'appleCompany');
JsonGo.set('mainStore', 'Amsterdam');
JsonGo.set('stores[{$append}].storeName', 'Berlin');
JsonGo.set('stores[{$end}].expensive', 5);
JsonGo.set('stores[{$end}].items[{$append}].name', 'Granny Smith small bag');
JsonGo.set('stores[{$end}].items[{$end}].price', 3);
JsonGo.set('stores[{$end}].items[{$append}].name', 'Granny Smith medium bag');
JsonGo.set('stores[{$end}].items[{$end}].price', 5);
JsonGo.set('stores[{$end}].items[{$append}].name', 'Granny Smith large bag');
JsonGo.set('stores[{$end}].items[{$end}].price', 6);
JsonGo.set('stores[{$end}].items[{$append}].name', 'Fuji small bag');
JsonGo.set('stores[{$end}].items[{$end}].price', 3.50);
JsonGo.set('stores[{$end}].items[{$append}].name', 'Pink Lady small bag');
JsonGo.set('stores[{$end}].items[{$append}].name', 'Pink Lady medium bag');
JsonGo.set('stores[{$append}].storeName', 'Amsterdam');
JsonGo.set('stores[{$end}].expensive', 6);
JsonGo.set('stores[{$end}].items[{$append}].name', 'Pink Lady medium bag');
JsonGo.set('stores[{$end}].items[{$append}].name', 'Pink Lady large bag');
JsonGo.set('stores[{$end}].items[{$end}].price', 10);
JsonGo.set('stores[{$append}].storeName', 'Rome');
JsonGo.set('stores[{$end}].expensive', null);
JsonGo.set('stores[{$end}].items', []);
JsonGo.setAll(`stores[{1 = 1}].items[{$.name ∈ $JSON(${JSON.stringify(['Pink Lady medium bag', 'Pink Lady small bag'])})}].price`, 8); //sets price = 8 for all items in all stores where items name is in ['Pink Lady medium bag', 'Pink Lady small bag']
JsonGo.setAll('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].expensive', true); // sets expensive key/value where price >= expensive field of mainstore
const result = JsonGo.export();


/*
-- translate from one object into another one
*/
const JsonGo = new JG.Map(inputFixture, {});
JsonGo.translateAll('stores[{$.storeName = Berlin}].items[{$.price >= $stores[{$.storeName = Berlin}].expensive}].name', 'stores[{$append}].expensiveItems'); //get expensive items from Berlin and place into expensiveItems
JsonGo.translateAll('stores[{$.storeName = Berlin}].items[{$.price < $stores[{$.storeName = Berlin}].expensive}].name', 'stores[{$end}].nonExpensiveItems'); //get non-expensive items from Berlin and place into nonExpensiveItems
const result = JsonGo.export(); //result is: {"stores":[{"expensiveItems":["Granny Smith medium bag","Granny Smith large bag","Pink Lady small bag","Pink Lady medium bag"],"nonExpensiveItems":["Granny Smith small bag","Fuji small bag"]}]}
```

## Performance
The querying performance of this library is tested with some simple queries on 3 datasets of different sizes using the "json-querying-performance-testing" library of andykais (https://github.com/andykais/json-querying-performance-testing) and compared to different libraries that also facilitate JSON querying.
Shallow: `features[*].properties`
Deep: `features[*].properties.BLOCK_NUM`
Conditional: `features[{$.properties.STREET = UNKNOWN}].properties.BLOCK_NUM`

Summary (tested with Js-JSON-Go version 0.2.0 on 2,9 GHz Dual-Core Intel Core i5):


smallCityLots

|      (index)      |      shallow      |       deep        |    conditional    |
| :---------------- | :---------------- | :---------------- | :---------------- |
|    json-query     |      0.1387       |      0.0156       |      0.0192       |
|   jsonpath-plus   |      0.4361       |      0.4222       |       0.34        |
|     jsonpath      |      1.1121       |      9.4446       |      0.0254       |
|    JSONStream     |      3.0592       |      3.1946       |  'not possible'   |
|       oboe        |      3.9998       |      4.0888       |  'not possible'   |
| map-filter-reduce | 'not implemented' | 'not implemented' | 'not implemented' |
|                   |                   |                   |                   |
|      Js-JSON-Go   |      0.0355       |      0.0295       |      0.1348       |

mediumCityLots
|      (index)      |      shallow      |       deep        |    conditional    |
| :---------------- | :---------------- | :---------------- | :---------------- |
|    json-query     |      0.0153       |      0.0277       |      0.0234       |
|   jsonpath-plus   |      0.8707       |       0.927       |      0.7166       |
|     jsonpath      |      2.3789       |      38.9381      |      0.0429       |
|    JSONStream     |      5.8548       |      5.7983       |  'not possible'   |
|       oboe        |      7.3801       |       9.511       |  'not possible'   |
| map-filter-reduce | 'not implemented' | 'not implemented' | 'not implemented' |
|                   |                   |                   |                   |
|      Js-JSON-Go   |      0.0419       |      0.0428       |       0.1806       |

largeCityLots

|      (index)      |      shallow      |       deep        |    conditional    |
| :---------------- | :---------------- | :---------------- | :---------------- |
|    json-query     |     'failed'      |     'failed'      |     'failed'      |
|   jsonpath-plus   |      2.6469       |      2.8833       |      1.4851       |
|     jsonpath      |      6.5647       |     170.5683      |      0.1361       |
|    JSONStream     |      16.5264      |      17.3589      |  'not possible'   |
|       oboe        |      25.7974      |      26.1859      |  'not possible'   |
| map-filter-reduce | 'not implemented' | 'not implemented' | 'not implemented' |
|                   |                   |                   |                   |
|      Js-JSON-Go   |      0.0626       |      0.0707       |      0.4204       |


## Testing
Tests can be ran using the following command:
```bash
npm run test
```
Current code coverage (15 suites, 171 tests) is about 99%.

## Contributing
Pull requests are welcome.
Please make sure to update tests as appropriate.

## License
[MIT](https://opensource.org/licenses/MIT)
