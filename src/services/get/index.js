const resolve = require('../../handlers/resolve/resolve');
const validateResponseAndPassDefault = require('../../helpers/validators/validateResponseAndPassDefault');
const loadDefaultSettings = require('../../settings/loadDefaultSettings');

/**
 * Retrieves single value from objects specified path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {any} returns value found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const get = (object, path, functions, settings) => {
  const settingsToUse = loadDefaultSettings(settings);
  const resolved = resolve(object, path, functions, settingsToUse);
  return validateResponseAndPassDefault(
    resolved.value,
    undefined,
    settingsToUse.defaultGetResponse,
  );
};

module.exports = get;
