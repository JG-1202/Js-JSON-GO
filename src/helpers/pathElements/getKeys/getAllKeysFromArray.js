const checkForError = require('./src/checkForError');

/**
 * Get all indexes of array, with number key
 * @param {Array} array - input array
 * @param {Object} settings - object with settings.
 * @returns {Array} Array of indexes
 */
const getAllKeysFromArray = (array, settings) => {
  const toReturn = [];
  if (Array.isArray(array)) {
    array.forEach((element, index) => {
      toReturn.push({ number: index });
    });
  }
  checkForError(settings.fatalErrorOnCreate, toReturn);
  return toReturn;
};

module.exports = getAllKeysFromArray;
