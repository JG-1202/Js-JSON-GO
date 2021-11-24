const Resolver = require('../../handlers/resolver');
const validateResponseAndPassDefault = require('../../helpers/validators/validateResponseAndPassDefault');

/**
 * Retrieves all values from objects specified path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of values
 * that match the specified path with logical checks
 */
const getAll = (object, path, functions, settings) => {
  const resolver = new Resolver({ functions, settings });
  const resolved = resolver.resolve(object, path);
  return validateResponseAndPassDefault(
    resolved.filter((resolvedElement) => resolvedElement.value !== undefined)
      .map((resolvedElement) => (resolvedElement.value)),
    [],
    resolver.settings.defaultGetAllResponse,
  );
};

module.exports = getAll;
