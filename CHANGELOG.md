# Changelog
All notable changes to this project will be documented here.

## [0.5.0] - 2021-10-31
### Added
- generic transform function rather than translate, translateAll, translateAllToOne, translateOneToAll
- reference object will be output of pathToArrayTransformer
- resolve/resolveAll will return reference object with resolved references
- find/findAll will return reference object with resolved references
- pathElements will now pass refObject to querier
- query will pass refObject to resolve-handler
- lodash as dependency

### Changed
- translate, translateAll, translateAllToOne, translateOneToAll, unlink are considered deprecated and will be removed from version 1.0.0 onwards
- ignoreOnTranslate is deprecated and renamed to ignoreOnTransform
- ignoreOnTransform setting will now also be tested against equality of objects
- using lodash.cloneDeep for unlinkInputObject
- using lodash.isEqual to test equality

## [0.4.1] - 2021-11-07
### Changed
- fix where falsy results did not show up on resolveAll

## [0.4.0] - 2021-10-09
### Added
- getPath, returns first resolved path from input path
- getPaths, returns all resolved paths from input path
- find, returns first elements resolved path and value that matches input path
- findAll, returns all resolved elements paths and values that match input path
- exported helpers, these helpers are called from within query and resolveAll to facilitate querying
- full code coverage on unit tests

### Changed
- load default settings once when one of the exported modules is called
- name of test folder to ___tests___
- use babel (default) for codeCoverage instead of v8
- fix typo to validateResponseAndPassDefault
- using resolve & resolveAll to facilitate get/getPath/find and getAll/getPaths/findAll
- removing redundant code in queryElementTransformer, queryTransformer
- validateElement check on type is string
- typos from changeLog
- use function defineConstants on set / setAll to re-use functionality

## [0.3.5] - 2021-07-18
### changed
- ingnoreOnTranslate settings property is changed to ignoreOnTranslate property
- use of ingnoreOnTranslate setting property will log deprecation warning onto console, but will still function until release of v1.0.0


## [0.3.4] - 2021-06-19
### added
- added ingnoreOnTranslate setting

### changed
- settings are tested for expected type, if setting is not as expected, set default
- single translate service instead of separate services for translate, translateAll, translateAllToOne, translateOneToAll

## [0.3.3] - 2021-06-16
### changed
- links to shields in readme.md
- folder structure of helper pathTransformer
- queryElementTransformer code improvements to reduce complexity
- elementTransformer code improvements to reduce complexity
- logicalValidator code improvements to reduce complexity
- checkEquality code improvements to reduce complexity
- get and getAll code improvements
- pathToArrayTransformer code improvements remove duplication


## [0.3.2] - 2021-05-23
### changed
- compatibility fix: chop functionality is now also supported for Node 10.x (prior version supported 12.x and above)
- removed unnecessary files from repository

## [0.3.1] - 2021-05-16
### Changed
- bugfix: testing equality of JSON objects

## [0.3.0] - 2021-05-16
### Added
- settings property on set
- settings property on parse

### Changed
- fix: parse, not parsing stringified numbers
- fix: loading default settings
- fix: testing equality of JSON objects
- README.md, documentation
- fatalErrorOnCreate as direct input for set/setAll will be deprecated on further versions (added backward compatibility until version 1.0.0), using settings object instead
- not creating a new Json instance for every query, but rather use get/getAll directly
- settings architecture passing settings throughout all relevant functions
- functions architecture passing functions object throughout all relevant functions
- Json and Map architecture, added get, set, chop and translate services
- logical validator architecture, separate files per check.

## [0.2.1] - 2021-04-23
### Changed
- npmignore, not publishing unnecessary files
- README.md, documentation

## [0.2.0] - 2021-04-11
### Added
- support for custom functions on get/set/translate
- unlinkInputObject setting
- defaultGetResponse setting
- defaultGetAllResponse setting

### Changed
- removed unnecessary caching to improve predictability and performance of library


## [0.1.3] - 2021-03-21
### Added
- support for regular expressions with RegExp() on set/get/translate
- missing JSDoc in get/set functions


## [0.1.2] - 2021-03-14
### Changed
- README.md documentation

## [0.1.1] - 2021-03-14
### Added
- support for wildcards on set/get/translate
- performance improvement

## [0.1.0] - 2021-03-07
### Added
- Chop: Chops an array or object into smaller pieces
- Parse: Parses input value if it is stringified
- Stringify: Stringifies input value if it is an object
- Unlink: Unlinks object, removes reference to other object
- Get: Retrieves single value from objects specified path
- GetAll: Retrieves all values from objects specified path
- Set: Sets single value on specified path
- SetAll: Sets all values on specified path
- MakeArray: Makes an array, parses input value if stringified, if no array is found as input, it returns an empty array.
- MakeJson: Makes an object/array, parses input value if stringified, if no object/array is found as input, it returns an empty object.
- MakeObject: Makes an object, parses input value if stringified, if no object is found as input, it returns an empty object.
- Json constructor: allowing to: (1) set, (2) setAll, (3) get, (4) getAll, (5) export into/from object
- Map constructor:  allowing to: (1) translate, (2) translateAll, (3) translateOneToAll, (4) translateAllToOne, (5) export into/from object
