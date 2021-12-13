const BasicProcessor = require('../../services/basicProcessor');

/**
 * Parses value if it is not yet an object
 * @param {any} value
 * @returns {(Object|Array)} Parsed value
 */
const parse = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.parse(value);
};

module.exports = parse;
