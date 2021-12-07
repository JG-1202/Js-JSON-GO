const Resolver = require('../../services/resolver');

/**
 * Resolves values and paths from objects specified query path
 * @param {Object} object - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of objects with value/path property
 * that match the specified path with logical checks
 */
const resolve = (object, path, functions, settings) => {
  const resolver = new Resolver({ functions, settings });
  const resolved = resolver.resolve(object, path);
  const results = resolved.filter((resolvedElement) => resolvedElement.value !== undefined)
    .map((resolvedElement) => ({
      path: resolver.makePathString(resolvedElement.path),
      value: resolvedElement.value,
      references: resolvedElement.references,
    }));
  if (results.length > 0) {
    return results;
  }
  return resolver.settings.defaultGetResponse;
};

module.exports = resolve;
