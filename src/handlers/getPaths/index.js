const Resolver = require('../../services/resolver');

/**
 * Retrieves resolved paths from objects specified path
 * @param {Object} object - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of paths
 * that match the specified path with logical checks
 */
const getPaths = (object, path, settings) => {
  const resolver = new Resolver({ settings });
  return resolver.getPaths(object, path);
};

module.exports = getPaths;
