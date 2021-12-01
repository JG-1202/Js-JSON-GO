const BasicProcessor = require('../../services/basicProcessor');

/**
 * Merge all objects inside array
 * @param {Array} value - Array with objects to merge
 * @returns {Object}
 */
const mergeObjects = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.mergeObjects(value);
};

module.exports = mergeObjects;
