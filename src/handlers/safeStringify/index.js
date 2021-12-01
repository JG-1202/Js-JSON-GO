const BasicProcessor = require('../../services/basicProcessor');

/**
 * Tries to stringify value if it is an object
 * @param {Any} value value to stringify
 * @param {Any} defaultValue value to return when failed to stringify
 * @returns Stringified value, or default value
 */
const safeStringify = (value, defaultValue) => {
  const basicProcessor = new BasicProcessor();
  return basicProcessor.safeStringify(value, defaultValue);
};

module.exports = safeStringify;
