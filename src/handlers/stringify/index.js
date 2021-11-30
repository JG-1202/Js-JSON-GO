const BasicProcessor = require('../../services/basicProcessor');

/**
 * Stringifies value if it is an object
 * @param {Any} value
 * @returns {String} Stringified value
 */
const stringify = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.stringify(value);
};

module.exports = stringify;
