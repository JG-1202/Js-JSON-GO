const Resolver = require('../../services/resolver');

/**
 * SettingsObject.
 * @typedef {Object} SettingsObject
 * @property {boolean=} unlinkInputObject - if set to true, the origin object will not be
 * altered by anyof the operations, default value is false.
 * @property {boolean=} mapIfNotFound - if set to true the query result will always be
 * mapped, even if the query did not return any matches, default value is false.
 * @property {Array=} ignoreOnTransform - array of responses from originObject that should
 * not be translated within Map constructors translate functions into destinationObject.
 * Default is [].
 * @property {number=} limit - maximum number of values that should be resolved.
 * Default is 0 (returning all values that match input path).
 * @property {function=} formatter this function is called before translating. Output of
 * the formatter function will be translated instead of the original value.
 * Default is: (value) => value.
 * @property {Object.<string, function>=} functions object with functions that can be called
 * from within query path. KeyName can be called with `$Function(`keyName`)` from query path.
 * Default is: `{}`.
 */

/**
 * ResolveObject.
 * @typedef {Object} ResolveObject
 * @property {any} value - value at specified path
 * @property {string} path - resolved path
 * @property {Object.<string, (number|string)>} references - resolved references
*/

/**
 * Finds values and paths from objects specified query path
 * @param {(Object|Array)} object - object/array from which value should be retrieved.
 * @param {string} path - string representation of path.
 * @param {SettingsObject=} settings - object with settings.
 * @returns {ResolveObject[]} returns array of objects with value/path property
 * that match the specified path with logical checks
 */
const find = (object, path, settings) => {
  const resolver = new Resolver({ settings });
  return resolver.find(object, path);
};

module.exports = find;
