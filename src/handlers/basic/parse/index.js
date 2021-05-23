const returnObject = require('../../../helpers/returnObject');
const backWardCompatability = require('./src/backwardCompatability');

/**
 * attempt to parse
 */
const attemptToParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

/**
 * attempt to parse, or parse depending on safeParse variable
 */
const goParse = (value, safeParse) => (safeParse ? attemptToParse(value) : JSON.parse(value));

/**
 * check whether there is possible parsable input
 */
// eslint-disable-next-line no-restricted-globals
const isThereSomethingToParse = (value) => value && typeof value === 'string' && isNaN(value);

/**
 * Parses input value if it is stringified
 * @param {any} value - (stringified) object/array
 * @param {Object} settings - object with settings.
 * @returns {any} parsed value, or in case of safeParse input value if value is not parsable
 */
const parse = (value, settings) => {
  const settingsObject = returnObject(backWardCompatability(settings));

  if (isThereSomethingToParse(value)) {
    return goParse(value, settingsObject.safeParse);
  }
  return value;
};

module.exports = parse;
