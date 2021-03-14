const Json = require('./json.js');
const makeObject = require('./src/handlers/make/makeObject.js');

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
   */
  constructor(origin, destination, settings) {
    const setting = makeObject(settings);
    this.originObject = new Json(origin);
    this.destinationObject = new Json(destination);
    this.fatalErrorOnCreate = setting.fatalErrorOnCreate;
    this.mapIfNotFound = setting.mapIfNotFound;
  }

  /**
   * Translate a single value into destination object. Query will stop after first match.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   */
  translate(originPath, destinationPath) {
    const value = this.originObject.get(originPath);
    if (this.mapIfNotFound || value !== undefined) {
      this.destinationObject.set(destinationPath, value, this.fatalErrorOnSet);
    }
  }

  /**
   * Translate all values into destination object. Destination will be an array with all results
   * from origin query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   */
  translateAll(originPath, destinationPath) {
    const values = this.originObject.getAll(originPath);
    if (this.mapIfNotFound || validateValue(values)) {
      this.destinationObject.setAll(destinationPath, values, this.fatalErrorOnSet);
    }
  }

  /**
   * Translate single value into destination object. Destination will be the first matching value
   * from origin path, mapped into all qualified destinations.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   */
  translateOneToAll(originPath, destinationPath) {
    const value = this.originObject.get(originPath);
    if (this.mapIfNotFound || value !== undefined) {
      this.destinationObject.setAll(destinationPath, value, this.fatalErrorOnSet);
    }
  }

  /**
   * Translate all values into destination object. The single destination will be filled with an
   * array filled with all results from the originPath query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   */
  translateAllToOne(originPath, destinationPath) {
    const values = this.originObject.getAll(originPath);
    if (this.mapIfNotFound || validateValue(values)) {
      this.destinationObject.set(destinationPath, values, this.fatalErrorOnSet);
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
