const checkForError = require('./src/checkForError');

/**
 * Get first key of object, with string key
 * @param {Object} object - input object
 * @param {Boolean} fatalError - should error be thrown in case no keys are found?
 * @returns {String} first key if input is indeed object
 */
const getFirstKeyFromObject = (object, fatalError) => {
  if (typeof object === 'object') {
    const element = Object.keys(object)[0];
    if (element !== undefined) {
      return element;
    }
  }
  checkForError(fatalError);
  return undefined;
};

module.exports = getFirstKeyFromObject;
