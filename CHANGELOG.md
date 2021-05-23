# Changelog
All notable changes to this project will be documented here.

## [0.3.2] - 2021-05-23
### changed
- compatability fix: chop functionality is now also supported for Node 10.x (prior version supported 12.x and above)
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
- fatalErrorOnCreate as direct input for set/setAll will be deprecated on further versions (added backward compatability until version 1.0.0), using settings object instead
- not creating a new Json instance for every query, but rather use get/getAll directly
- settings architecture passing settings throughout all relevant functions
- functions architecture passing functions object throughout all relevant functions
- Json and Map architecture, added get, set, chop and translate services
- logical validator architecture, seperate files per check.

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
- Get: Retreives single value from objects specified path
- GetAll: Retreives all values from objects specified path
- Set: Sets single value on specified path
- SetAll: Sets all values on specified path
- MakeArray: Makes an array, parses input value if stringified, if no array is found as input, it returns an empty array.
- MakeJson: Makes an object/array, parses input value if stringified, if no object/array is found as input, it returns an empty object.
- MakeObject: Makes an object, parses input value if stringified, if no object is found as input, it returns an empty object.
- Json constructor: allowing to: (1) set, (2) setAll, (3) get, (4) getAll, (5) export into/from object
- Map constructor:  allowing to: (1) translate, (2) translateAll, (3) translateOneToAll, (4) translateAllToOne, (5) export into/from object