const parse = require('./parse.js');

/**
 * Chops array into smaller arrays
 */
const chopArray = (toChop, chopSize) => {
  const result = [];
  for (let i = 0; i < toChop.length; i += chopSize) {
    result.push(toChop.slice(i, i + chopSize));
  }
  return result;
};

/**
 * Chops object into smaller objects
 */
const chopObject = (toChop, chopSize) => {
  const result = [];
  for (let i = 0; i < Object.entries(toChop).length; i += chopSize) {
    result.push(Object.fromEntries(Object.entries(toChop).slice(i, i + chopSize)));
  }
  return result;
};

/**
 * Chops an array or object into smaller pieces
 * @param {object} value - object or array
 * @param {number} chopSize - size of pieces.
 * @returns {Array} array of chopped pieces.
 */
const chop = (value, chopSize) => {
  const toChop = parse(value);
  if (Array.isArray(toChop)) {
    return chopArray(toChop, chopSize);
  }
  return chopObject(toChop, chopSize);
};

module.exports = chop;
