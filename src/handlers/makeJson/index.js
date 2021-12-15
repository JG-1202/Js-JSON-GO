const BasicProcessor = require('../../services/basicProcessor');

/**
 * Checks whether value is an Object or an Array, if so return value, otherwise return empty object
 * @param {any} value - any value
 * @returns {(Object|Array)}
 */
const makeJson = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.makeJson(value);
};

module.exports = makeJson;
