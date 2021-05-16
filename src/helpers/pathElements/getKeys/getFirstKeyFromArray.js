const checkForError = require('./src/checkForError');

/**
 * Get first index of array, with number key
 * @param {Array} array - input array
 * @param {Object} settings - object with settings.
 * @returns {Number} first index if input is indeed array
 */
const getFirstKeyFromArray = (array, settings) => {
  if (Array.isArray(array)) {
    if (array[0] !== undefined) {
      return 0;
    }
  }
  checkForError(settings.fatalErrorOnCreate);
  return undefined;
};

module.exports = getFirstKeyFromArray;
