const BasicProcessor = require('../../services/basicProcessor');

/**
 * Checks whether value is an Array, if so return value, otherwise return empty array
 * @param {Any} value - any value
 * @returns {Array}
 */
const makeArray = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.makeArray(value);
};

module.exports = makeArray;
