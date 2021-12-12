const Json = require('../json');
const JsonTransformer = require('../../services/jsonTransformer');
const makeObject = require('../../handlers/makeObject');
const mergeSettings = require('../json/src/mergeSettings');

class Map {
  /**
   * Construct a map containing origin object, destination object and settings
   * @param {Object} originObject - origin object, from where data should be obtained
   * @param {Object} destinationObject - destination object, to where data should be mapped
   * @param {Object} settings - object with settings
   * @param {Object} functions - object of functions that can be called within query.

   */
  constructor(originObject, destinationObject, settings, functions) {
    this.originObject = new Json(originObject, settings, functions);
    this.destinationObject = new Json(destinationObject, settings, functions);
  }

  /**
   * Transform values from origin object into destination object.
   * @param {String} originPath - path from where data should be obtained from origin object
   * @param {originPath} destinationPath - path to where data should be mapped into destination
   * object
   * @param {Object} functions - object of functions that can be called within query.
   */
  transform(originPath, destinationPath, settings) {
    const jsonTransformer = new JsonTransformer({
      settings: mergeSettings(this.originObject.settings, makeObject(settings)),
    });
    return jsonTransformer.transform(originPath, destinationPath,
      this.originObject.object, this.destinationObject.object);
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
