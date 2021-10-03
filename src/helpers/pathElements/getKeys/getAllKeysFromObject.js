const checkForError = require('./src/checkForError');
const isObject = require('./src/isObject');

/**
 * Get all keys of object, with string key
 * @param {Object} object - input array
 * @param {Object} settings - object with settings.
 * @returns {Array} Array of keys
 */
const getAllKeysFromObject = (object, settings) => {
  const toReturn = [];
  if (isObject(object)) {
    Object.keys(object).forEach((element) => {
      toReturn.push({ string: element });
    });
  }
  checkForError(settings.fatalErrorOnCreate, toReturn);
  return toReturn;
};

module.exports = getAllKeysFromObject;
