const resolveAll = require('../../handlers/resolve/resolveAll');
const validateResponseAndPassDefault = require('../../helpers/validators/validateResponseAndPassDefault');
const loadDefaultSettings = require('../../settings/loadDefaultSettings');

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
  const settingsToUse = loadDefaultSettings(settings);
  const resolved = resolveAll(object, path, functions, settingsToUse);
  return validateResponseAndPassDefault(
    resolved.map((resolvedElement) => resolvedElement.value),
    [],
    settingsToUse.defaultGetAllResponse,
  );
};

module.exports = getAll;
