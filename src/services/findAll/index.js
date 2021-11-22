const validateResponseAndPassDefault = require('../../helpers/validators/validateResponseAndPassDefault');
const loadDefaultSettings = require('../../settings/loadDefaultSettings');
const makePathString = require('../../helpers/makePathString');
const Resolver = require('../../handlers/resolver');

/**
 * Finds all values and resolved paths from objects specified path
 * @param {Object} object - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of objects with value/path property
 * that match the specified path with logical checks
 */
const findAll = (object, path, functions, settings) => {
  const settingsToUse = loadDefaultSettings(settings);
  const resolver = new Resolver({ functions, settings: settingsToUse });
  const resolved = resolver.resolve(object, path);
  return validateResponseAndPassDefault(
    resolved.filter((resolvedElement) => resolvedElement.value !== undefined)
      .map((resolvedElement) => ({
        path: makePathString(resolvedElement.path),
        value: resolvedElement.value,
        references: resolvedElement.references,
      })),
    [],
    settingsToUse.defaultGetAllResponse,
  );
};

module.exports = findAll;
