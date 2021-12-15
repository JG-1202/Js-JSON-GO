const BasicProcessor = require('../../services/basicProcessor');

/**
 * Unlinks object, removes reference to other object
 * @param {(Object|Array)} obj - object/array or any other input
 * @returns {Object|Array} unlinked object/array or initial input
 */
const unlink = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.unlink(value);
};

module.exports = unlink;
