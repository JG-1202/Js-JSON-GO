const parse = require('../basic/parse.js');

/**
 * Check whether value exists and is of type object
 */
const isJson = (value) => (value && typeof value === 'object');

/**
 * Makes an object/array, parses input value if stringified, if no object/array is found
 * as input, it returns an empty object.
 * @param {any} value - any value
 * @returns {object} returns parsed value, initial input object/arry, or empty object
 */
const makeJson = (value) => {
  const parsed = parse(value, true);
  return (isJson(parsed)) ? parsed : {};
};

module.exports = makeJson;
