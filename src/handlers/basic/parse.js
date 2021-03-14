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
 * Parses input value if it is stringified
 * @param {any} value - (stringified) object/array
 * @param {boolean} safeParse - boolean, if true no error is thrown if value is not parsable
 * @returns {any} parsed value, or in case of safeParse input value if value is not parsable
 */
const parse = (value, safeParse) => {
  if (value && typeof value === 'string') {
    return goParse(value, safeParse);
  }
  return value;
};

module.exports = parse;
