const BasicProcessor = require('../../services/basicProcessor');

/**
 * Unlinks object, removes reference to other object
 * @param {any} obj - object/array or any other input
 * @returns {object} unlinked object/array or initial input
 */
const unlink = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.unlink(value);
};

module.exports = unlink;
