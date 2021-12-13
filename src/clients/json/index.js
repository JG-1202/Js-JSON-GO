const setOne = require('../../handlers/setOne');
const set = require('../../handlers/set');
const setAll = require('../../handlers/setAll');
const findOne = require('../../handlers/findOne');
const find = require('../../handlers/find');
const findAll = require('../../handlers/findAll');
const getOne = require('../../handlers/getOne');
const get = require('../../handlers/get');
const getAll = require('../../handlers/getAll');
const getPath = require('../../handlers/getPath');
const getPaths = require('../../handlers/getPaths');
const getAllPaths = require('../../handlers/getAllPaths');
const chop = require('../../handlers/chop');
const mergeSettings = require('./src/mergeSettings');

const SettingsLoader = require('../../services/settingsLoader');

/**
 * ResolveObject.
 * @typedef {Object} ResolveObject
 * @property {any} value - value at specified path
 * @property {string} path - resolved path
 * @property {Object.<string, (number|string)>} references - resolved references
*/

/**
 * SettingsObject.
 * @typedef {Object} SettingsObject
 * @property {boolean=} unlinkInputObject - if set to true, the origin object will not be
 * altered by anyof the operations, default value is false.
 * @property {boolean=} mapIfNotFound - if set to true the query result will always be
 * mapped, even if the query did not return any matches, default value is false.
 * @property {Array=} ignoreOnTransform - array of responses from originObject that should
 * not be translated within Map constructors translate functions into destinationObject.
 * Default is [].
 * @property {number=} limit - maximum number of values that should be resolved.
 * Default is 0 (returning all values that match input path).
 * @property {function=} formatter this function is called before translating. Output of
 * the formatter function will be translated instead of the original value.
 * Default is: (value) => value.
 * @property {Object.<string, function>=} functions object with functions that can be called
 * from within query path. KeyName can be called with `$Function(`keyName`)` from query path.
 * Default is: `{}`.
 */

class Json {
  /**
   * Construct Json
   * @param {(Object|Array)} object - input object/array
   * @param {SettingsObject=} settings - object with settings
   */
  constructor(object, settings) {
    const settingsLoader = new SettingsLoader({ settings });
    this.settings = settingsLoader.settings;
    if (this.settings.unlinkInputObject) {
      this.object = settingsLoader.unlink(settingsLoader.makeJson(object));
    } else {
      this.object = settingsLoader.makeJson(object);
    }
  }

  /**
   * Retrieves single value from objects specified query path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {any} returns value found at specified path, in case that multiple logical checks
   * satisfy the first element will be returned
   */
  getOne(path, settings) {
    return getOne(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Finds single value and path from objects specified query path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {ResolveObject} returns value and resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  findOne(path, settings) {
    return findOne(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Retrieves resolved path from objects specified path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {string} returns resolved path found at specified path,
   * in case that multiple logical checks satisfy the first element will be returned
   */
  getPath(path, settings) {
    return getPath(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Retrieves values from objects specified query path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  get(path, settings) {
    return get(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Retrieves all values from objects specified query path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {Array} returns array of values that match the specified path with logical checks
   */
  getAll(path, settings) {
    return getAll(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Finds values and paths from objects specified query path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {ResolveObject[]} returns array of objects with value/path property
   * that match the specified path with logical checks
   */
  find(path, settings) {
    return find(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Finds all values and paths from objects specified query path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {ResolveObject[]} returns array of objects with value/path property
   * that match the specified path with logical checks
   */
  findAll(path, settings) {
    return findAll(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Retrieves resolved paths from objects specified path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {string[]} returns array of paths that match the specified path with logical checks
   */
  getPaths(path, settings) {
    return getPaths(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Retrieves all resolved paths from objects specified path
   * @param {string} path - string representation of path
   * @param {SettingsObject=} settings - object with settings
   * @returns {string[]} returns array of paths that match the specified path with logical checks
   */
  getAllPaths(path, settings) {
    return getAllPaths(
      this.object, path,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Sets single value on specified path
   * @param {string} path - string representation of path
   * @param {any} val - value to be set at specified path
   * @param {SettingsObject=} settings - object with settings
   * @returns {Object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  setOne(path, val, settings) {
    return setOne(
      this.object, path, val,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Sets values on specified path
   * @param {string} path - string representation of path
   * @param {any} val - value to be set at specified path
   * @param {SettingsObject=} settings - object with settings
   * @returns {Object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  set(path, val, settings) {
    return set(
      this.object, path, val,
      mergeSettings(this.settings, settings),
    );
  }

  /**
   * Sets all values on specified path
   * @param {string} path - string representation of path
   * @param {any} val - value to be set at specified path
   * @param {SettingsObject=} settings - object with settings
   * @returns {Object} object with newly set path in case that multiple logical checks
   * satisfy the first element will be set.
   */
  setAll(path, val, settings) {
    return setAll(
      this.object, path, val,
      mergeSettings(this.settings, settings),
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
