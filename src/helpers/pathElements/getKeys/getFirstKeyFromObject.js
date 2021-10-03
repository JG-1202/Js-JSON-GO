const checkForError = require('./src/checkForError');
const isObject = require('./src/isObject');

/**
 * Get first key of object, with string key
 * @param {Object} object - input object
 * @param {Object} settings - object with settings.
 * @returns {String} first key if input is indeed object
 */
const getFirstKeyFromObject = (object, settings) => {
  if (isObject(object)) {
    const element = Object.keys(object)[0];
    if (element !== undefined) {
      return element;
    }
  }
  checkForError(settings.fatalErrorOnCreate);
  return undefined;
};

module.exports = getFirstKeyFromObject;
