const queryTransformer = require('./queryTransformer');

/**
 * Checks whether element is a wildcard
 */
const isElementWildcard = (element) => ['*', '{$all}', '{*}'].indexOf(element) > -1;

/**
 * Checks whether element is a number
 */
const isNumberNumber = (element) => !Number.isNaN(Number(element));

/**
 * Checks whether element is of type string
 */
const isElementString = (element) => element && typeof element === 'string';

/**
 * Checks whether element is a query (surrounded by quotes)
 */
const isStringString = (element) => {
  const firstChar = element.charAt(0);
  const lastChar = element.charAt(element.length - 1);
  return (firstChar === lastChar && (firstChar === '"' || firstChar === "'"));
};

/**
 * Checks whether element is a query (surrounded by curly brackets)
 */
const isQueryQuery = (element) => {
  const firstChar = element.charAt(0);
  const lastChar = element.charAt(element.length - 1);
  return (firstChar === '{' && lastChar === '}');
};

/**
 * Removes opening and closing characters from string
 */
const removeOpeningClosingChars = (element) => element.substr(1, element.length - 2);

/**
 * Transforms each element of path into workable object representation
 * @param {String} element - string representation of path element
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Object} - object with keyName the type of element and keyValue the value of element
 */
// eslint-disable-next-line complexity
const elementTransformer = (element, funcs) => {
  if (isElementWildcard(element)) {
    return { wildcard: true };
  }
  if (isElementString(element) && isStringString(element)) {
    return { string: removeOpeningClosingChars(element) };
  }
  if (isNumberNumber(element)) {
    return { number: Number(element) };
  }
  if (isElementString(element) && isQueryQuery(element)) {
    return { query: queryTransformer(removeOpeningClosingChars(element), funcs) };
  }

  return { string: element };
};

module.exports = elementTransformer;
