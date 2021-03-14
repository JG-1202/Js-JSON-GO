const parse = require('../basic/parse.js');

const isObject = (value) => (value && typeof value === 'object' && !Array.isArray(value));

/**
 * Makes an object, parses input value if stringified, if no object is found
 * as input, it returns an empty object.
 * @param {any} value - any value
 * @returns {object} returns parsed value, initial input object, or empty object
 */
const makeObject = (value) => {
  const parsed = parse(value, true);
  return (isObject(parsed))
    ? parsed
    : {};
};

module.exports = makeObject;
