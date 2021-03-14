const set = require('./src/handlers/set/set.js');
const setAll = require('./src/handlers/set/setAll.js');
const get = require('./src/handlers/get/get.js');
const chop = require('./src/handlers/basic/chop.js');
const getAll = require('./src/handlers/get/getAll.js');
const makeJson = require('./src/handlers/make/makeJson.js');
const makeObject = require('./src/handlers/make/makeObject.js');

class Json {
  /**
   * Construct Json
   * @param {any} object - input bject/array
   * @param {Object} settings object, currently only support for fatalErrorOnCreate,
   * if true, an arror will be thrown on set if query is not met.
   */
  constructor(object, settings) {
    const setting = makeObject(settings);
    this.object = makeJson(object);
    this.fatalErrorOnCreate = setting.fatalErrorOnCreate;
  }

  /**
   * Retreives single value from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  get(path) { return get(this.object, path); }

  /**
   * Retreives all values from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path) { return getAll(this.object, path); }

  /**
   * Sets single value on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  set(path, val) { return set(this.object, path, val, this.fatalErrorOnCreate); }

  /**
   * Sets all values on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  setAll(path, val) { return setAll(this.object, path, val, this.fatalErrorOnCreate); }

  /**
   * Chops an array or object into smaller pieces
   * @param {object} value - object or array
   * @param {number} chopSize - size of pieces.
   * @returns {Array} array of chopped pieces.
   */
  chop(chopSize) { return chop(this.object, chopSize); }

  /**
   * Exports the object
   * @returns {Object} object
   */
  export() {
    return this.object;
  }
}

module.exports = Json;
