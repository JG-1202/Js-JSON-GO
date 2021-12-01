const BasicProcessor = require('../../services/basicProcessor');

/**
 * Tries to parse value if it is not yet an object
 * @param {Any} value value to parse
 * @param {Any} defaultValue value to return when parsing fails
 * @returns Parsed value, or default value
 */
const safeParse = (value, defaultValue) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.safeParse(value, defaultValue);
};

module.exports = safeParse;
