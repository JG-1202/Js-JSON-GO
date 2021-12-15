const BasicProcessor = require('../../services/basicProcessor');

/**
 * Checks whether value is an Object, if so return value, otherwise return empty object
 * @param {any} value - any value
 * @returns {Object}
 */
const makeObject = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.makeObject(value);
};

module.exports = makeObject;
