const parse = require('../basic/parse.js');

const isArray = (value) => (value && Array.isArray(value));

/**
 * Makes an array, parses input value if stringified, if no array is found
 * as input, it returns an empty array.
 * @param {any} value - any value
 * @returns {object} returns parsed value, initial input array, or empty array
 */
const makeArray = (value) => {
  const parsed = parse(value, true);
  return (isArray(parsed)) ? parsed : [];
};

module.exports = makeArray;
