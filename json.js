const set = require('./src/handlers/set/set.js');
const setAll = require('./src/handlers/set/setAll.js');
const get = require('./src/handlers/get/get.js');
const chop = require('./src/handlers/basic/chop.js');
const getAll = require('./src/handlers/get/getAll.js');
const makeJson = require('./src/handlers/make/makeJson.js');
const makeObject = require('./src/handlers/make/makeObject.js');
const mergeFunctions = require('./src/helpers/mergeFunctions');
const loadDefaultSettings = require('./src/helpers/loadDefaultSettings');
const validateReponseAndPassDefault = require('./src/helpers/validateReponseAndPassDefault');
const unlink = require('./src/handlers/basic/unlink');

class Json {
  /**
   * Construct Json
   * @param {any} object - input bject/array
   * @param {Object} settings object, currently only support for fatalErrorOnCreate,
   * if true, an arror will be thrown on set if query is not met.
   * @param {Object} functions object of functions that can be called within query.
   */
  constructor(object, settings, functions) {
    this.settings = loadDefaultSettings(makeObject(settings));
    this.object = this.settings.unlinkInputObject ? unlink(makeJson(object)) : makeJson(object);
    this.functions = makeObject(functions);
  }

  /**
   * Retreives single value from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions object of functions that can be called within query.
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  get(path, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    return validateReponseAndPassDefault(
      get(this.object, path, funcs), undefined, this.settings.defaultGetResponse,
    );
  }

  /**
   * Retreives all values from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions object of functions that can be called within query.
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    return validateReponseAndPassDefault(
      getAll(this.object, path, funcs), [], this.settings.defaultGetAllResponse,
    );
  }

  /**
   * Sets single value on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @param {Object} functions object of functions that can be called within query.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  set(path, val, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    return set(this.object, path, val, this.settings.fatalErrorOnCreate, funcs);
  }

  /**
   * Sets all values on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @param {Object} functions object of functions that can be called within query.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  setAll(path, val, functions) {
    const funcs = mergeFunctions(functions, this.functions);
    return setAll(this.object, path, val, this.settings.fatalErrorOnCreate, funcs);
  }

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
