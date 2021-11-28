/**
 * Stringifies input value if it is an object
 * @param {any} value - any value
 * @returns {string} returns stringified input value for object,
 * or input value if input was not an onbject
 */
const stringify = (value) => {
  if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value;
};

module.exports = stringify;
