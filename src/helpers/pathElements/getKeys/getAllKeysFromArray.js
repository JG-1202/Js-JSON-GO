const checkForError = require('./src/checkForError');

/**
 * Get all indexes of array, with number key
 * @param {Array} array - input array
 * @param {Boolean} fatalError - should error be thrown in case no keys are found?
 * @returns {Array} Array of indexes
 */
const getAllKeysFromArray = (array, fatalError) => {
  const toReturn = [];
  if (Array.isArray(array)) {
    array.forEach((element, index) => {
      toReturn.push({ number: index });
    });
  }
  checkForError(fatalError, toReturn);
  return toReturn;
};

module.exports = getAllKeysFromArray;
