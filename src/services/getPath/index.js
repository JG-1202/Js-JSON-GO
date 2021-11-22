const Resolver = require('../../handlers/resolver');
const loadDefaultSettings = require('../../settings/loadDefaultSettings');
const makePathString = require('../../helpers/makePathString');

/**
 * Retrieves resolved path from objects specified path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {any} returns resolved path found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const getPath = (object, path, functions, settings) => {
  const settingsToUse = loadDefaultSettings(settings);
  const resolver = new Resolver({ functions, settings: { ...settingsToUse, limit: 1 } });
  const resolved = resolver.resolve(object, path)[0];
  if (!resolved || resolved.value === undefined) {
    return settingsToUse.defaultGetResponse;
  }
  return makePathString(resolved.path);
};

module.exports = getPath;
