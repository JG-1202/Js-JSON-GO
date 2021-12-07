const Resolver = require('../../services/resolver');

/**
 * Resolves single value and path from objects specified query path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {any} returns value and resolved path found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const resolveOne = (obj, path, functions, settings) => {
  const resolver = new Resolver({ functions, settings: { ...settings, limit: 1 } });
  const resolved = resolver.resolve(obj, path)[0];
  if (!resolved || resolved.value === undefined) {
    return {
      path: resolver.settings.defaultGetOneResponse,
      value: resolver.settings.defaultGetOneResponse,
      references: {},
    };
  }
  return {
    path: resolver.makePathString(resolved.path),
    value: resolved.value,
    references: resolved.references,
  };
};

module.exports = resolveOne;
