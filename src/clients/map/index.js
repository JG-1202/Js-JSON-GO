const Json = require('../json');
const JsonTransformer = require('../../services/jsonTransformer');
const makeObject = require('../../handlers/makeObject');
const mergeSettings = require('../json/src/mergeSettings');
const MapBuilder = require('../../services/mapBuilder');

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

class Map {
  /**
   * Construct a map containing origin object, destination object and settings
   * @param {any?} originObject - origin object,
   * from where data should be obtained
   * @param {any?} destinationObject - destination object,
   * to where data should be mapped
   * @param {SettingsObject=} settings - object with settings
   */
  constructor(originObject, destinationObject, settings) {
    this.originObject = new Json(originObject, settings);
    this.destinationObject = new Json(destinationObject, settings);
  }

  /**
   * Transform values from origin object into destination object.
   * @param {string} originPath - path from where data should be obtained from origin object
   * @param {string} destinationPath - path to where data should be mapped into destination
   * object
   * @param {SettingsObject=} settings - object with settings
   */
  transform(originPath, destinationPath, settings) {
    const jsonTransformer = new JsonTransformer({
      settings: mergeSettings(this.originObject.settings, makeObject(settings)),
    });
    this.destinationObject.object = jsonTransformer.transform(
      originPath,
      destinationPath,
      this.originObject.object,
      this.destinationObject.object,
    );
  }

  /**
   * Sets values on specified path on destination object
   * @param {string} path - string representation of path
   * @param {any} val - value to be set at specified path
   * @param {SettingsObject=} settings - object with settings
   * @returns {Object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  set(path, val, settings) {
    const mapBuilder = new MapBuilder({
      settings: { ...mergeSettings(this.originObject.settings, settings), parse: false },
    });
    this.destinationObject.object = mapBuilder.buildWithPlaceholders({
      object: this.destinationObject.object,
      path,
      value: val,
      originObject: this.originObject.object,
    });
    return this.destinationObject.object;
  }

  /**
   * Builds function output on specified path on destination object
   * @param {string} path - string or array representation of path to set.
   * @param {function} functionToCall - function to call from which output should be set
   * on provided path.
   * @param {SettingsObject=} settings - object with settings.
   * @returns {(Object|Array)} object with newly set path in case that multiple logical checks.
   */
  build(path, functionToCall, settings) {
    const mapBuilder = new MapBuilder({
      settings: { ...mergeSettings(this.originObject.settings, settings), parse: false },
    });
    this.destinationObject.object = mapBuilder.buildWithPlaceholders({
      object: this.destinationObject.object,
      path,
      func: functionToCall,
      originObject: this.originObject.object,
    });
    return this.destinationObject.object;
  }

  /**
   * Exports the destination object
   * @returns {(Object.<string, any>|Array)} destination object
   */
  export() {
    return this.destinationObject.object;
  }
}

module.exports = Map;
