const checkForError = require('./src/checkForError');

/**
 * Get all keys of object, with string key
 * @param {Object} object - input array
 * @param {Boolean} fatalError - should error be thrown in case no keys are found?
 * @returns {Array} Array of keys
 */
const getAllKeysFromObject = (object, fatalError) => {
  const toReturn = [];
  if (typeof object === 'object') {
    Object.keys(object).forEach((element) => {
      toReturn.push({ string: element });
    });
  }
  checkForError(fatalError, toReturn);
  return toReturn;
};

module.exports = getAllKeysFromObject;
