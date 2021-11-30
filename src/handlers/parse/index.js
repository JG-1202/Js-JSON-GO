const BasicProcessor = require('../../services/basicProcessor');

/**
 * Parses value if it is not yet an object
 * @param {Any} value
 * @returns Parsed value
 */
const parse = (value) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.parse(value);
};

module.exports = parse;
