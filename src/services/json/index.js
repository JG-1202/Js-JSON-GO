const _ = require('lodash');

const makeJson = require('../../handlers/make/makeJson');
const makeObject = require('../../handlers/make/makeObject');

const getAllService = require('../getAll');
const getService = require('../get');
const getPathService = require('../getPath');
const getPathsService = require('../getPaths');
const findAllService = require('../findAll');
const findService = require('../find');
const setService = require('../set');
const setAllService = require('../setAll');
const chopService = require('../chop');

/**
 * Call set/setAll
 */
const callSetService = (service, val, constructor, functions, path, settings) => service(
  constructor.object,
  path,
  val,
  { ...constructor.functions, ...functions },
  { ...constructor.settings, ...settings },
);

/**
 * Call get/getAll/getPath/getPaths/find/findAll
 */
const callResolveService = (service, constructor, functions, path, settings) => service(
  constructor.object,
  path,
  { ...constructor.functions, ...functions },
  { ...constructor.settings, ...settings },
);

class Json {
  /**
   * Construct Json
   * @param {any} object - input object/array
   * @param {Object} settings - object with settings
   * @param {Object} functions - object of functions that can be called within query.
   */
  constructor(object, settings, functions) {
    this.settings = makeObject(settings);
    if (this.settings.unlinkInputObject) {
      this.object = _.cloneDeep(makeJson(object, this.settings));
    } else {
      this.object = makeJson(object, this.settings);
    }
    this.functions = makeObject(functions);
  }

  /**
   * Retrieves single value from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  get(path, functions, settings) {
    return callResolveService(getService, this, functions, path, makeObject(settings));
  }

  /**
   * Finds single value and resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value and resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  find(path, functions, settings) {
    return callResolveService(findService, this, functions, path, makeObject(settings));
  }

  /**
   * Retrieves resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  getPath(path, functions, settings) {
    return callResolveService(getPathService, this, functions, path, makeObject(settings));
  }

  /**
   * Retrieves all values from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path, functions, settings) {
    return callResolveService(getAllService, this, functions, path, makeObject(settings));
  }

  /**
   * Finds all values and resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of objects with value/path property
   * that match the specified path with logical checks
   */
  findAll(path, functions, settings) {
    return callResolveService(findAllService, this, functions, path, makeObject(settings));
  }

  /**
   * Retrieves resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of paths that match the specified path with logical checks
   */
  getPaths(path, functions, settings) {
    return callResolveService(getPathsService, this, functions, path, makeObject(settings));
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
    return callSetService(setService, val, this, functions, path, makeObject(settings));
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
    return callSetService(setAllService, val, this, functions, path, makeObject(settings));
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
