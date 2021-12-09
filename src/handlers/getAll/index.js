const Resolver = require('../../services/resolver');

/**
 * Retrieves all values from objects specified query path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of values
 * that match the specified path with logical checks
 */
const getAll = (object, path, functions, settings) => {
  const resolver = new Resolver({ functions, settings: { ...settings, limit: 0 } });
  return resolver.get(object, path);
};

module.exports = getAll;
