const Json = require('../json');
const makeObject = require('../../services/make/makeObject');

const transformService = require('./transform');
const SettingsLoader = require('../../services/settingsLoader');

class Map extends SettingsLoader {
  /**
   * Construct a map containing origin object, destination object and settings
   * @param {Object} originObject - origin object, from where data should be obtained
   * @param {Object} destinationObject - destination object, to where data should be mapped
   * @param {Object} settings - object with settings
   * @param {Object} functions - object of functions that can be called within query.

   */
  constructor(originObject, destinationObject, settings, functions) {
    super({ settings });
    this.originObject = new Json(originObject, settings, functions);
    this.destinationObject = new Json(destinationObject, settings, functions);
    this.functions = makeObject(functions);
  }

  /**
   * Deprecated:
   * Translate a single value into destination object. Query will stop after first match.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translate(originPath, destinationPath, functions) {
    console.warn('Deprecation warning: The use of translate is deprecated and will be removed from version 1.0.0 onwards. Use transform with { resolveOne: true, buildOne: true } settings instead.');
    return transformService(originPath, destinationPath, functions,
      { ...this, settings: { ...this.settings, resolveOne: true, buildOne: true } });
  }

  /**
   * Deprecated:
   * Translate all values into destination object. Destination will be an array with all results
   * from origin query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translateAll(originPath, destinationPath, functions) {
    console.warn('Deprecation warning: The use of translateAll is deprecated and will be removed from version 1.0.0 onwards. Use transform instead.');
    return transformService(originPath, destinationPath, functions, this);
  }

  /**
   * Deprecated:
   * Translate single value into destination object. Destination will be the first matching value
   * from origin path, mapped into all qualified destinations.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translateOneToAll(originPath, destinationPath, functions) {
    console.warn('Deprecation warning: The use of translateOneToAll is deprecated and will be removed from version 1.0.0 onwards. Use transform with { resolveOne: true } setting instead.');
    return transformService(originPath, destinationPath, functions,
      { ...this, settings: { ...this.settings, resolveOne: true } });
  }

  /**
   * Deprecated:
   * Translate all values into destination object. The single destination will be filled with an
   * array filled with all results from the originPath query.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  translateAllToOne(originPath, destinationPath, functions) {
    console.warn('Deprecation warning: The use of translateAllToOne is deprecated and will be removed from version 1.0.0 onwards. Use transform with { buildOne: true } setting instead.');
    return transformService(originPath, destinationPath, functions,
      { ...this, settings: { ...this.settings, buildOne: true } });
  }

  /**
   * Transform values from origin object into destination object.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  transform(originPath, destinationPath, functions) {
    return transformService(originPath, destinationPath, functions, this);
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
