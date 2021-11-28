const getAll = require('../getAll');
const get = require('../get');
const getPath = require('../getPath');
const getPaths = require('../getPaths');
const findAll = require('../findAll');
const find = require('../find');
const set = require('../set');
const setAll = require('../setAll');
const chop = require('../chop');
const BasicProcessor = require('../../services/basicProcessor');

/**
 * Call set/setAll
 */
const callSetService = (handler, val, constructor, functions, path, settings) => handler(
  constructor.object,
  path,
  val,
  { ...constructor.functions, ...functions },
  { ...constructor.settings, ...settings },
);

/**
 * Call get/getAll/getPath/getPaths/find/findAll
 */
const callResolveService = (handler, constructor, functions, path, settings) => handler(
  constructor.object,
  path,
  { ...constructor.functions, ...functions },
  { ...constructor.settings, ...settings },
);

class Json extends BasicProcessor {
  /**
   * Construct Json
   * @param {any} object - input object/array
   * @param {Object} settings - object with settings
   * @param {Object} functions - object of functions that can be called within query.
   */
  constructor(object, settings, functions) {
    super({ settings });
    if (this.settings.unlinkInputObject) {
      this.object = this.clone(this.makeJson(object, this.settings));
    } else {
      this.object = this.makeJson(object, this.settings);
    }
    this.functions = this.makeObject(functions);
  }

  /**
   * Retrieves single value from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  get(path, functions, settings) {
    return callResolveService(get, this, functions, path, this.makeObject(settings));
  }

  /**
   * Finds single value and resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value and resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  find(path, functions, settings) {
    return callResolveService(find, this, functions, path, this.makeObject(settings));
  }

  /**
   * Retrieves resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  getPath(path, functions, settings) {
    return callResolveService(getPath, this, functions, path, this.makeObject(settings));
  }

  /**
   * Retrieves all values from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path, functions, settings) {
    return callResolveService(getAll, this, functions, path, this.makeObject(settings));
  }

  /**
   * Finds all values and resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of objects with value/path property
   * that match the specified path with logical checks
   */
  findAll(path, functions, settings) {
    return callResolveService(findAll, this, functions, path, this.makeObject(settings));
  }

  /**
   * Retrieves resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of paths that match the specified path with logical checks
   */
  getPaths(path, functions, settings) {
    return callResolveService(getPaths, this, functions, path, this.makeObject(settings));
  }

  /**
   * Sets single value on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  set(path, val, functions, settings) {
    return callSetService(set, val, this, functions, path, this.makeObject(settings));
  }

  /**
   * Sets all values on specified path
   * @param {any} path - string or array representation of path to set.
   * @param {any} val - value to be set at specified path.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  setAll(path, val, functions, settings) {
    return callSetService(setAll, val, this, functions, path, this.makeObject(settings));
  }

  /**
   * Chops an array or object into smaller pieces
   * @param {object} value - object or array
   * @param {number} chopSize - size of pieces.
   * @returns {Array} array of chopped pieces.
   */
  chop(chopSize) {
    return chop(this.object, chopSize);
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
