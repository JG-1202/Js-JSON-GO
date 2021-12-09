const Resolver = require('../../services/resolver');

/**
 * Retrieves single value from objects specified query path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {any} returns value found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const getOne = (object, path, functions, settings) => {
  const resolver = new Resolver({ functions, settings: { ...settings, limit: 1 } });
  return resolver.get(object, path)[0];
};

module.exports = getOne;
