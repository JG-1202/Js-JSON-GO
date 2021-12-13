const BasicProcessor = require('../../services/basicProcessor');

/**
 * Chops an array or object into smaller pieces
 * @param {(Object|Array)} value - object or array
 * @param {number} chopSize - size of pieces.
 * @returns {(Array[]|Object[])} array of chopped pieces.
 */
const chop = (object, chopSize) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.chop(object, chopSize);
};

module.exports = chop;
