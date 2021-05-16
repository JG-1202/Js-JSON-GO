/**
 * Returns value or if value is not defined, return empty object
 * @param {Any} value input value
 * @returns input value if it is an object, or an empty object otherwise
 */
const returnObject = (value) => {
  if (value && typeof value === 'object') {
    return value;
  }
  return {};
};

module.exports = returnObject;
