const Resolver = require('../../services/resolver');

/**
 * Retrieves all resolved paths from objects specified path
 * @param {Object} object - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of paths
 * that match the specified path with logical checks
 */
const getAllPaths = (object, path, settings) => {
  const resolver = new Resolver({ settings: { ...settings, limit: 0 } });
  return resolver.getPaths(object, path);
};

module.exports = getAllPaths;
