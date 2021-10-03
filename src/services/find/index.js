const makePathString = require('../../helpers/makePathString');
const resolve = require('../../handlers/get/resolve');
const loadDefaultSettings = require('../../settings/loadDefaultSettings');

/**
 * Finds single value and resolved path from objects specified path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {any} returns value and resolved path found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const find = (obj, path, functions, settings) => {
  const settingsToUse = loadDefaultSettings(settings);
  const resolved = resolve(obj, path, functions, settingsToUse);
  return {
    path: makePathString(resolved.path),
    value: resolved.value,
  };
};

module.exports = find;
