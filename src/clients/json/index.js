const set = require('../../handlers/set');
const setAll = require('../../handlers/setAll');
const find = require('../../handlers/find');
const findAll = require('../../handlers/findAll');
const get = require('../../handlers/get');
const getAll = require('../../handlers/getAll');
const getPath = require('../../handlers/getPath');
const getPaths = require('../../handlers/getPaths');
const chop = require('../../handlers/chop');
const mergeObjects = require('../../handlers/mergeObjects');

const SettingsLoader = require('../../services/settingsLoader');

class Json {
  /**
   * Construct Json
   * @param {any} object - input object/array
   * @param {Object} settings - object with settings
   * @param {Object} functions - object of functions that can be called within query.
   */
  constructor(object, settings, functions) {
    const settingsLoader = new SettingsLoader({ settings });
    this.settings = settingsLoader.settings;
    if (this.settings.unlinkInputObject) {
      this.object = settingsLoader.clone(settingsLoader.makeJson(object));
    } else {
      this.object = settingsLoader.makeJson(object);
    }
    this.functions = settingsLoader.makeObject(functions);
  }

  /**
   * Retrieves single value from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  get(path, functions, settings) {
    return get(
      this.object, path, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
  }

  /**
   * Finds single value and resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns value and resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  find(path, functions, settings) {
    return find(
      this.object, path, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
  }

  /**
   * Retrieves resolved path from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {any} returns resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  getPath(path, functions, settings) {
    return getPath(
      this.object, path, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
  }

  /**
   * Retrieves all values from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path, functions, settings) {
    return getAll(
      this.object, path, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
  }

  /**
   * Finds all values and resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of objects with value/path property
   * that match the specified path with logical checks
   */
  findAll(path, functions, settings) {
    return findAll(
      this.object, path, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
  }

  /**
   * Retrieves resolved paths from objects specified path
   * @param {any} path - string or array representation of path to set.
   * @param {Object} functions - object of functions that can be called within query.
   * @returns {Array} returns array of paths that match the specified path with logical checks
   */
  getPaths(path, functions, settings) {
    return getPaths(
      this.object, path, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
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
    return set(
      this.object, path, val, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
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
    return setAll(
      this.object, path, val, mergeObjects([this.functions, functions]),
      mergeObjects([this.settings, settings]),
    );
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
