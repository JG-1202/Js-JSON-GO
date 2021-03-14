const checkForError = require('./src/checkForError');

/**
 * Get first index of array, with number key
 * @param {Array} array - input array
 * @param {Boolean} fatalError - should error be thrown in case no keys are found?
 * @returns {Number} first index if input is indeed array
 */
const getFirstKeyFromArray = (array, fatalError) => {
  if (Array.isArray(array)) {
    if (array[0] !== undefined) {
      return 0;
    }
  }
  checkForError(fatalError);
  return undefined;
};

module.exports = getFirstKeyFromArray;
