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
 * Check whether element is a valid reference. Is valid when last char is ) and none
 * of the following chars are present: []{}'"
 */
const isElementAValidReference = (element) => {
  const notAllowedChars = /[[\]{}'"]+/;
  return element.charAt(element.length - 1) === ')' && !notAllowedChars.test(element);
};

/**
 * Get elements reference if present and return cleaned element (without reference)
 * and the reference name
 */
const getReference = (element) => {
  const splittedElement = element.split(':(');
  if (splittedElement.length > 1) {
    const lastElement = splittedElement[splittedElement.length - 1];
    if (isElementAValidReference(lastElement)) {
      splittedElement.pop();
      return { cleanElement: splittedElement.join(':('), reference: lastElement.slice(0, -1) };
    }
  }
  return { cleanElement: element };
};

/**
 * Transforms each element of path into workable object representation
 * @param {String} element - string representation of path element
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Object} - object with keyName the type of element and keyValue the value of element
 */
const elementTransformer = (element, funcs) => {
  const { cleanElement, reference } = getReference(element);
  const checks = [
    transformWildcard,
    transformString,
    transformNumber,
    transformQuery,
  ];
  if (reference) {
    return {
      ...checkFunctionsUntilSuccess(
        checks, { element: cleanElement, funcs, reference }, { string: cleanElement },
      ),
      reference,
    };
  }
  return checkFunctionsUntilSuccess(
    checks, { element: cleanElement, funcs, reference }, { string: cleanElement },
  );
};

module.exports = elementTransformer;
