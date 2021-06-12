const queryTransformer = require('../queryTransformer');

const basicTransformString = require('../basicTransformers/transformString');
const basicTransformNumber = require('../basicTransformers/transformNumber');

const successfulCheckResponse = require('../../../checkFunctionsUntilSuccess/successfulCheckResponse');
const checkFunctionsUntilSuccess = require('../../../checkFunctionsUntilSuccess/checkFunctions');

/**
 * Removes opening and closing characters from string
 */
const removeOpeningClosingChars = (element) => element.substr(1, element.length - 2);

/**
 * Transform if it entails a wildcard
 */
const transformWildcard = ({ element }) => {
  if (['*', '{$all}', '{*}'].indexOf(element) > -1) {
    return successfulCheckResponse({ wildcard: true });
  }
  return {};
};

/**
 * Transform if it entails a string
 */
const transformString = ({ element }) => basicTransformString(element, 'string');

/**
  * Transform if it enatails a number
  */
const transformNumber = ({ element }) => basicTransformNumber(element, 'number');

/**
 * Transform if it entails a query
 */
const transformQuery = ({ element, funcs }) => {
  const firstChar = element.charAt(0);
  const lastChar = element.charAt(element.length - 1);
  if (firstChar === '{' && lastChar === '}') {
    return successfulCheckResponse(
      { query: queryTransformer(removeOpeningClosingChars(element), funcs) },
    );
  }
  return {};
};

/**
 * Transforms each element of path into workable object representation
 * @param {String} element - string representation of path element
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Object} - object with keyName the type of element and keyValue the value of element
 */
const elementTransformer = (element, funcs) => {
  const checks = [
    transformWildcard,
    transformString,
    transformNumber,
    transformQuery,
  ];
  return checkFunctionsUntilSuccess(checks, { element, funcs }, { string: element });
};

module.exports = elementTransformer;
