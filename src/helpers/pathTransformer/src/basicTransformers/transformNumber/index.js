const successfulCheckResponse = require('../../../../checkFunctionsUntilSuccess/successfulCheckResponse');

/**
 * Transform if it entails a Number
 * @param {String} element - element to check whether it is a number
 * @param {String} keyName - keyName of the result withing returning element
 * @returns {Object} Empty object if no number, otherwise object with default
 * checkFunctionsUntilSuccess response and provided keyName
 */
const transformString = (element, keyName) => {
  if (!Number.isNaN(Number(element))) {
    const result = {};
    result[keyName] = Number(element);
    return successfulCheckResponse(result);
  }
  return {};
};

module.exports = transformString;
