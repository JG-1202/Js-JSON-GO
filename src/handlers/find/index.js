const Resolver = require('../../services/resolver');

/**
 * Finds values and paths from objects specified query path
 * @param {Object} object - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of objects with value/path property
 * that match the specified path with logical checks
 */
const find = (object, path, settings) => {
  const resolver = new Resolver({ settings });
  return resolver.find(object, path);
};

module.exports = find;
