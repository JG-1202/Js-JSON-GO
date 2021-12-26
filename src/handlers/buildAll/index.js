const Builder = require('../../services/builder');

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
 * Builds function output on every possible specified path
 * @param {(Object|Array)} object - object
 * @param {string} path - string or array representation of path to set.
 * @param {function} functionToCall - function to call from which output should be set
 * on provided path.
 * @param {SettingsObject=} settings - object with settings.
 * @returns {(Object|Array)} object with newly set path in case that multiple logical checks
 * satisfy the all elements will be set.
 */
const buildAll = (object, path, functionToCall, settings) => {
  const builder = new Builder({ settings: { ...settings, parse: false, limit: 0 } });
  return builder.build({ object, path, func: functionToCall });
};

module.exports = buildAll;
