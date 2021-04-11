/**
 * Check whether element with index 1 exists in array
 */
const checkForExistenceOfArrayElementOne = (array) => (array && array[1]);

/**
 * Create a regular expression from string using JS new RegExp
 * @param {String} string - string representation of regex
 * @returns {Regexp} - Regular expression derived from string
 */
const createRegExpFromString = (string) => {
  const matchedFlags = string.match(/.*\/([gimy]*)$/);
  let flags = '';
  if (checkForExistenceOfArrayElementOne(matchedFlags)) {
    // eslint-disable-next-line prefer-destructuring
    flags = matchedFlags[1];
  }
  const matchedPattern = string.match(new RegExp(`^/(.*?)/${flags}$`));
  if (checkForExistenceOfArrayElementOne(matchedPattern)) {
    return new RegExp(matchedPattern[1], flags);
  }
  throw new Error('Invalid regular expression, missing / at beginning and beteen pattern and flags, or flags are invalid. (Don\'t forget to escape special chars.)');
};

module.exports = createRegExpFromString;
