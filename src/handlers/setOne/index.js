const Builder = require('../../services/builder');

/**
 * Sets single value on specified path
 * @param {object} obj - object
 * @param {any} path - string or array representation of path to set.
 * @param {any} val - value to be set at specified path.
 * @param {Object} settings - object with settings.
 * @returns {object} object with newly set path in case that multiple logical checks
 * satisfy the first element will be set.
 */
const setOne = (object, path, value, settings) => {
  const builder = new Builder({ settings: { ...settings, limit: 1 } });
  return builder.build(object, path, value);
};

module.exports = setOne;
