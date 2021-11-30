const Resolver = require('../../services/resolver');

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
  const resolver = new Resolver({ functions, settings: { ...settings, limit: 1 } });
  const resolved = resolver.resolve(object, path)[0];
  if (!resolved || resolved.value === undefined) {
    return resolver.settings.defaultGetResponse;
  }
  return resolver.makePathString(resolved.path);
};

module.exports = getPath;
