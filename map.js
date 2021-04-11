const Json = require('./json.js');
const makeObject = require('./src/handlers/make/makeObject.js');
const mergeFunctions = require('./src/helpers/mergeFunctions');
const loadDefaultSettings = require('./src/helpers/loadDefaultSettings');
const validateReponseAndPassDefault = require('./src/helpers/validateReponseAndPassDefault');

const isArrayNotEmpty = (value) => (Array.isArray(value) && value.length > 0);
const isNoArray = (value) => (value !== undefined && !Array.isArray(value));
const validateValue = (value) => (isNoArray(value) || isArrayNotEmpty(value));

class Map {
  /**
   * Construct a map containing origin object, destination object and settings
   * @param {Object} origin - origin object, from where data should be obtained
   * @param {Object} destination - destination object, to where data should be mapped
   * @param {Object} settings object, currently only support for fatalErrorOnCreate,
   * if true, an arror will be thrown on translation if query is not met.
   * @param {Object} functions object of functions that can be called within query.

   */
  constructor(origin, destination, settings, functions) {
    this.settings = loadDefaultSettings(makeObject(settings));
    this.originObject = new Json(origin, settings);
    this.destinationObject = new Json(destination, settings);
    this.functions = makeObject(functions);
  }

  /**
   * Translate a single value into destination object. Query will stop after first match.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions object of functions that can be called within query.
   */
  translate(originPath, destinationPath, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    const value = this.originObject.get(originPath, funcs);
    if (this.settings.mapIfNotFound || value !== undefined) {
      this.destinationObject.set(
        destinationPath,
        validateReponseAndPassDefault(value, undefined, this.settings.defaultGetResponse),
        this.settings.fatalErrorOnCreate, funcs,
      );
    }
  }

  /**
   * Translate all values into destination object. Destination will be an array with all results
   * from origin query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions object of functions that can be called within query.
   */
  translateAll(originPath, destinationPath, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    const values = this.originObject.getAll(originPath, funcs);
    if (this.settings.mapIfNotFound || validateValue(values)) {
      this.destinationObject.setAll(
        destinationPath,
        validateReponseAndPassDefault(values, [], this.settings.defaultGetAllResponse),
        this.settings.fatalErrorOnCreate,
        funcs,
      );
    }
  }

  /**
   * Translate single value into destination object. Destination will be the first matching value
   * from origin path, mapped into all qualified destinations.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions object of functions that can be called within query.
   */
  translateOneToAll(originPath, destinationPath, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    const value = this.originObject.get(originPath, funcs);
    if (this.settings.mapIfNotFound || value !== undefined) {
      this.destinationObject.setAll(
        destinationPath,
        validateReponseAndPassDefault(value, undefined, this.settings.defaultGetResponse),
        this.settings.fatalErrorOnCreate,
        funcs,
      );
    }
  }

  /**
   * Translate all values into destination object. The single destination will be filled with an
   * array filled with all results from the originPath query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions object of functions that can be called within query.
   */
  translateAllToOne(originPath, destinationPath, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    const values = this.originObject.getAll(originPath, funcs);
    if (this.settings.mapIfNotFound || validateValue(values)) {
      this.destinationObject.set(
        destinationPath,
        validateReponseAndPassDefault(values, [], this.settings.defaultGetAllResponse),
        this.settings.fatalErrorOnCreate,
        funcs,
      );
    }
  }

  /**
   * Exports the destination object
   * @returns {Object} destination object
   */
  export() {
    return this.destinationObject.object;
  }
}

module.exports = Map;
