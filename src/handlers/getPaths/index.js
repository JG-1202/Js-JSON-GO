const Resolver = require('../../services/resolver');

/**
 * Retrieves resolved paths from objects specified path
 * @param {Object} object - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of paths
 * that match the specified path with logical checks
 */
const getPaths = (object, path, functions, settings) => {
  const resolver = new Resolver({ functions, settings });
  const resolved = resolver.resolve(object, path);
  const results = resolved.filter((resolvedElement) => resolvedElement.value !== undefined)
    .map((resolvedElement) => resolver.makePathString(resolvedElement.path));
  if (results.length > 0) {
    return results;
  }
  return resolver.settings.defaultGetAllResponse;
};

module.exports = getPaths;
