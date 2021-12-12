const Resolver = require('../../services/resolver');

/**
 * Resolves single value and path from objects specified query path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} settings - object with settings.
 * @returns {any} returns value and resolved path found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const findOne = (obj, path, settings) => {
  const resolver = new Resolver({ settings: { ...settings, limit: 1 } });
  const resolved = resolver.find(obj, path)[0];
  if (!resolved || resolved.value === undefined) {
    return {};
  }
  return resolved;
};

module.exports = findOne;
