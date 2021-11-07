const resolveAll = require('../../handlers/resolve/resolveAll');
const validateResponseAndPassDefault = require('../../helpers/validators/validateResponseAndPassDefault');
const loadDefaultSettings = require('../../settings/loadDefaultSettings');
const makePathString = require('../../helpers/makePathString');

/**
 * Finds all values and resolved paths from objects specified path
 * @param {Object} object - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of objects with value/path property
 * that match the specified path with logical checks
 */
const getPaths = (object, path, functions, settings) => {
  const settingsToUse = loadDefaultSettings(settings);
  const resolved = resolveAll(object, path, functions, settingsToUse);
  return validateResponseAndPassDefault(
    resolved.map((resolvedElement) => ({
      path: makePathString(resolvedElement.path),
      value: resolvedElement.value,
      references: resolvedElement.references,
    })),
    [],
    settingsToUse.defaultGetAllResponse,
  );
};

module.exports = getPaths;
