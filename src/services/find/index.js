const makePathString = require('../../helpers/makePathString');
const loadDefaultSettings = require('../../settings/loadDefaultSettings');
const Resolver = require('../../handlers/resolver');

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
  const resolver = new Resolver({ functions, settings: { ...settingsToUse, limit: 1 } });
  const resolved = resolver.resolve(obj, path)[0];
  if (!resolved || resolved.value === undefined) {
    return {
      path: settingsToUse.defaultGetResponse,
      value: settingsToUse.defaultGetResponse,
      references: {},
    };
  }
  return {
    path: makePathString(resolved.path),
    value: resolved.value,
    references: resolved.references,
  };
};

module.exports = find;
