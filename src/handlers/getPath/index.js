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
 * @property {boolean=} parse - if set to true each queried element that is not yet of type object
 * will be attempted to parse.
 * By doing so there is no need to deep parse the input object before querying. This setting has no
 * effect while building JSON paths. Default is: false
 */

/**
 * Retrieves resolved path from objects specified path
 * @param {(Object|Array)} object - object/array from which value should be retrieved.
 * @param {string} path - string representation of path.
 * @param {SettingsObject=} settings - object with settings.
 * @returns {string} returns resolved path found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const getPath = (object, path, settings) => {
  const resolver = new Resolver({ settings: { ...settings, limit: 1 } });
  return resolver.getPaths(object, path)[0];
};

module.exports = getPath;
