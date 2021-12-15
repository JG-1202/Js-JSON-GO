const BasicProcessor = require('../../services/basicProcessor');

/**
 * Merge all arrays inside array
 * @param {Array[]} value - Array with arrays to merge
 * @returns {Array}
 */
const mergeArrays = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.mergeArrays(value);
};

module.exports = mergeArrays;
