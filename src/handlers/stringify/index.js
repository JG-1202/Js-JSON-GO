const BasicProcessor = require('../../services/basicProcessor');

/**
 * Stringifies value if it is an object
 * @param {any} value
 * @returns {string} Stringified value
 */
const stringify = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.stringify(value);
};

module.exports = stringify;
