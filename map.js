const Json = require('./json.js');
const makeObject = require('./src/handlers/make/makeObject');

const translateService = require('./src/services/translate');
const translateAllService = require('./src/services/translateAll');
const translateOneToAllService = require('./src/services/translateOneToAll');
const translateAllToOneService = require('./src/services/translateAllToOne');

const loadDefaultSettings = require('./src/settings/loadDefaultSettings');

class Map {
  /**
   * Construct a map containing origin object, destination object and settings
   * @param {Object} originObject - origin object, from where data should be obtained
   * @param {Object} destinationObject - destination object, to where data should be mapped
   * @param {Object} settings - object with settings
   * @param {Object} functions - object of functions that can be called within query.

   */
  constructor(originObject, destinationObject, settings, functions) {
    this.settings = loadDefaultSettings(settings);
    this.originObject = new Json(originObject, settings, functions);
    this.destinationObject = new Json(destinationObject, settings, functions);
    this.functions = makeObject(functions);
  }

  /**
   * Translate a single value into destination object. Query will stop after first match.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translate(originPath, destinationPath, functions) {
    return translateService(originPath, destinationPath, functions, this);
  }

  /**
   * Translate all values into destination object. Destination will be an array with all results
   * from origin query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translateAll(originPath, destinationPath, functions) {
    return translateAllService(originPath, destinationPath, functions, this);
  }

  /**
   * Translate single value into destination object. Destination will be the first matching value
   * from origin path, mapped into all qualified destinations.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translateOneToAll(originPath, destinationPath, functions) {
    return translateOneToAllService(originPath, destinationPath, functions, this);
  }

  /**
   * Translate all values into destination object. The single destination will be filled with an
   * array filled with all results from the originPath query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translateAllToOne(originPath, destinationPath, functions) {
    return translateAllToOneService(originPath, destinationPath, functions, this);
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
