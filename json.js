const makeJson = require('./src/handlers/make/makeJson');
const makeObject = require('./src/handlers/make/makeObject');
const unlink = require('./src/handlers/basic/unlink');

const getAllService = require('./src/services/getAll');
const getService = require('./src/services/get/index.js');
const setService = require('./src/services/set/index.js');
const setAllService = require('./src/services/setAll/index.js');
const chopService = require('./src/services/chop/index.js');

const loadDefaultSettings = require('./src/settings/loadDefaultSettings');

class Json {
  /**
   * Construct Json
   * @param {any} object - input bject/array
   * @param {Object} settings - object with settings
   * @param {Object} functions - object of functions that can be called within query.
   */
  constructor(object, settings, functions) {
    this.settings = loadDefaultSettings(settings);
    if (this.settings.unlinkInputObject) {
      this.object = unlink(makeJson(object, this.settings));
    } else {
      this.object = makeJson(object, this.settings);
    }
    this.functions = makeObject(functions);
  }

  /**
   * Retreives single value from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  get(path, functions) {
    return getService(this.object, path, functions, this);
  }

  /**
   * Retreives all values from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path, functions) {
    return getAllService(this.object, path, functions, this);
  }

  /**
   * Sets single value on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  set(path, val, functions) {
    return setService(this.object, path, val, functions, this);
  }

  /**
   * Sets all values on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  setAll(path, val, functions) {
    return setAllService(this.object, path, val, functions, this);
  }

  /**
   * Chops an array or object into smaller pieces
   * @param {object} value - object or array
   * @param {number} chopSize - size of pieces.
   * @returns {Array} array of chopped pieces.
   */
  chop(chopSize) {
    return chopService(this.object, chopSize);
  }

  /**
   * Exports the object
   * @returns {Object} object
   */
  export() {
    return this.object;
  }
}

module.exports = Json;
