const successfulCheckResponse = require('../../../../checkFunctionsUntilSuccess/successfulCheckResponse');

/**
 * Transform if it entails a string
 * @param {String} element - element to check whether it is a string
 * @param {String} keyName - keyName of the result withing returning element
 * @returns {Object} Empty object if no string, otherwise object with default
 * checkFunctionsUntilSuccess response and provided keyName
 */
const transformString = (element, keyName) => {
  const firstChar = element.charAt(0);
  const lastChar = element.charAt(element.length - 1);
  if (firstChar === lastChar && ['"', "'"].indexOf(firstChar) > -1) {
    const result = {};
    result[keyName] = element.substr(1, element.length - 2);
    return successfulCheckResponse(result);
  }
  return {};
};

module.exports = transformString;
