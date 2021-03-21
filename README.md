# Js-JSON-Go

Js-JSON-Go is a Javascript library intending to make it easier to handle (and query) JSON messages, especially to grap (get) and update (set) parts of a larger JSON message, and translate (map) these to another path. Moreover, it is designed to make commonly performed operations, especially for event-based/internet-of-things applications (when the incomming the event is not complying to a fixed contract), easier.

## Installation

Use npm to install Js-JSON-Go.

```bash
npm install js-json-go
```

## Purpose
The development aim of this library is to make it easier to read, build and transform JSON structures with single lines of codes. The library was in particular designed for event-based use cases where the application receives a payload, applies some logic, and returns a new payload, even when the incomming event is not following a complete or known contract. Besides, the library allows to query JSON and get a single, or all matching elements and simply return these elements or set a new value at the described path (even when the path is non-exitent). This library also supports query in query, allowing for more complex JSON queries.

## Usage
All main functions of this library are exported and can be used according to its JSDocs definition.
Besided two constructors are made available: (1) Json and (2) Map.
Use the Json constructor for (multiple) operations on the same JSON Object/Array.
Use the Map constructor to translate one JSON Object/Array into another JSON Object/Array.

### Get vs Set
Get may be used to retreive an element from a defined path, whereas set may be used to place an element on the specified path. This can be from a fully defined path, from a path that meets given conditions, or a tree of paths. Set/get refer to a single element while setAll/getAll refers to all elements that match the specified path. 

### Path notation
Js-JSON-Go refers to a JSON-structure in a similar manner as the bracket and/or dot notation in JavaScript. In principle applies that a dot-notated child refers to a child within an object, and a bracket-notated child to either an object or an array. Moreover, within bracket notated childs Js-JSON-Go allows to query over all childs/elements at the regarding depth. Querying is not limited to its regarding depth, meaning it is allowed to query parents and childs, but also parents and childs that contain their own query.

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


Each query may exist out of either one, or two elements seperated by an operator. In case only one element is provided a !falsy check will be performed.

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

Summary (tested with Js-JSON-Go version 0.1.1 on 2,9 GHz Dual-Core Intel Core i5):


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
|      Js-JSON-Go   |      0.0258       |      0.0344       |      0.2548       |

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
|      Js-JSON-Go   |      0.0436       |      0.0439       |       0.485       |

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
|      Js-JSON-Go   |      0.0835       |      0.0932       |      1.1237       |


## Testing
Tests can be ran using the following command:
```bash
npm run test
```
Current code coverage (14 suites, 154 tests) is about 99%.

## Contributing
Pull requests are welcome.
Please make sure to update tests as appropriate.

## License
[MIT](https://opensource.org/licenses/MIT)
