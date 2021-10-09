const makeJson = require('../../handlers/make/makeJson');
const makeObject = require('../../handlers/make/makeObject');
const unlink = require('../../handlers/basic/unlink');

const callService = require('./src/callService');

const loadDefaultSettings = require('../../settings/loadDefaultSettings');

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
   * Retrieves single value from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  get(path, functions) {
    return callService({
      service: 'get',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
    });
  }

  /**
   * Finds single value and resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value and resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  find(path, functions) {
    return callService({
      service: 'find',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
    });
  }

  /**
   * Retrieves resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  getPath(path, functions) {
    return callService({
      service: 'getPath',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
    });
  }

  /**
   * Retrieves all values from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path, functions) {
    return callService({
      service: 'getAll',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
    });
  }

  /**
   * Finds all values and resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of objects with value/path property
   * that match the specified path with logical checks
   */
  findAll(path, functions) {
    return callService({
      service: 'findAll',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
    });
  }

  /**
   * Retrieves resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of paths that match the specified path with logical checks
   */
  getPaths(path, functions) {
    return callService({
      service: 'getPaths',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
    });
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
    return callService({
      service: 'set',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
      value: val,
    });
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
    return callService({
      service: 'setAll',
      object: this.object,
      constructorsFunctions: this.functions,
      settings: this.settings,
      functions,
      path,
      value: val,
    });
  }

  /**
   * Chops an array or object into smaller pieces
   * @param {object} value - object or array
   * @param {number} chopSize - size of pieces.
   * @returns {Array} array of chopped pieces.
   */
  chop(chopSize) {
    return callService({
      object: this.object,
      service: 'chop',
      chopSize,
    });
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
